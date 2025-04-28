import React from 'react';

const CreditCard = ({ card, taxAmount, isHighlighted }) => {
  // 从credit card数据中确定分期期数
  const getInstallmentPeriod = () => {
    // 直接从card对象获取期数信息
    if (card.installmentPeriods) {
      return card.installmentPeriods;
    }
    
    // 从installmentOptions数据中查找对应银行的分期期数
    try {
      // 这里必须使用import动态导入，确保installmentOptions可用
      const { installmentOptions } = require('../data/creditcards');
      if (installmentOptions) {
        // 找出该银行的最高分期期数选项
        const bankOptions = installmentOptions.filter(opt => opt.bank === card.bank);
        if (bankOptions.length > 0) {
          // 找出最高期数
          const maxPeriod = Math.max(...bankOptions.flatMap(opt => opt.periods));
          return maxPeriod;
        }
      }
    } catch (error) {
      console.log('无法导入installmentOptions数据', error);
    }
    
    // 默认返回6期（常见的分期期数）
    return 6;
  };
  
  // 设置分期期数
  const installmentPeriod = card.installmentAvailable ? getInstallmentPeriod() : 0;
  
  // 计算回饋金额，不超过最高回饋上限
  const calculateCashback = () => {
    // 如果卡片支援超商繳稅，以超商单筆上限计算回饋
    if (card.convenienceStore) {
      const convenienceAmount = Math.min(taxAmount, 30000);
      return Math.min(card.cashbackLimit, convenienceAmount * card.cashbackRate);
    }
    
    // 一般信用卡回饋计算
    return Math.min(card.cashbackLimit, taxAmount * card.cashbackRate);
  };
  
  const cashbackAmount = card.cashbackRate ? calculateCashback() : 0;
  
  // 计算分期回饋 (使用1.5% APR)
  const calculateInstallmentSavings = () => {
    if (!card.installmentAvailable) return 0;
    
    // 确保tax额符合最低要求
    if (taxAmount < card.minTaxAmount) return 0;
    
    const annualRate = 0.015; // 1.5% 年利率
    const monthlyRate = annualRate / 12; // 月利率
    
    // 使用现金流现值公式
    const presentValueFactor = 1 / Math.pow(1 + monthlyRate, installmentPeriod);
    const savingsAmount = taxAmount * (1 - presentValueFactor);
    
    return Math.round(savingsAmount);
  };
  
  const installmentSavings = calculateInstallmentSavings();
  
  // 卡片標籤:分期/超商/行動支付
  const renderTags = () => {
    const tags = [];
    
    if (card.installmentAvailable) {
      tags.push(
        <span key="installment" className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mr-1 mb-1">
          分期0利率
        </span>
      );
    }
    
    if (card.convenienceStore) {
      tags.push(
        <span key="convenience" className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded mr-1 mb-1">
          超商繳稅
        </span>
      );
    }
    
    if (card.mobilePay) {
      tags.push(
        <span key="mobile" className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mr-1 mb-1">
          行動支付
        </span>
      );
    }
    
    if (card.requireRegistration) {
      tags.push(
        <span key="registration" className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded mr-1 mb-1">
          需登錄
        </span>
      );
    }
    
    return tags;
  };
  
  // 渲染卡片特色
  const renderFeatures = () => {
    const features = [];
    
    if (card.cashbackRate > 0) {
      features.push(
        <div key="cashback" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">回饋率</div>
          <div className="font-semibold">{(card.cashbackRate * 100).toFixed(2)}%</div>
        </div>
      );
      
      features.push(
        <div key="estimatedCashback" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">預估回饋</div>
          <div className="font-semibold">NT$ {cashbackAmount.toLocaleString()}</div>
        </div>
      );
      
      features.push(
        <div key="cashbackLimit" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">回饋上限</div>
          <div className="font-semibold">NT$ {card.cashbackLimit.toLocaleString()}</div>
        </div>
      );
    }
    
    if (card.installmentAvailable) {
      features.push(
        <div key="installmentPeriod" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">分期期數</div>
          <div className="font-semibold">{installmentPeriod}期</div>
        </div>
      );
      
      features.push(
        <div key="installmentSavings" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">分期收益 (1.5% APR)</div>
          <div className="font-semibold">NT$ {installmentSavings.toLocaleString()}</div>
        </div>
      );
      
      features.push(
        <div key="minTaxAmount" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">最低稅額</div>
          <div className="font-semibold">NT$ {card.minTaxAmount.toLocaleString()}</div>
        </div>
      );
    }
    
    if (card.convenienceStore) {
      features.push(
        <div key="maxConvenienceAmount" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">超商上限</div>
          <div className="font-semibold">NT$ 30,000</div>
        </div>
      );
    }
    
    return features;
  };
  
  // 拆單策略說明
  const renderSplitAdvice = () => {
    if (card.convenienceStore) {
      const maxSplitTimes = Math.min(Math.ceil(taxAmount / 30000), 5);
      const maxSplitAmount = Math.min(maxSplitTimes * 30000, taxAmount);
      const totalCashback = Math.min(card.cashbackLimit, card.cashbackRate * maxSplitAmount);
      
      return (
        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600 dark:text-gray-400">
          <div className="font-medium">拆單策略效益:</div>
          <div>最多拆{maxSplitTimes}次，總金額NT${maxSplitAmount.toLocaleString()}</div>
          <div>預估回饋NT${totalCashback.toLocaleString()}</div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${isHighlighted ? 'border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900' : 'bg-white dark:bg-gray-800'}`}>
      {isHighlighted && (
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-500 text-white rounded-full">
            推薦選擇
          </span>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{card.bank} {card.name}</h3>
        <div className="flex flex-wrap">{renderTags()}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {renderFeatures()}
      </div>
      
      {renderSplitAdvice()}
      
      {card.notes && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600 dark:text-gray-400">
          <div className="font-medium">注意事項:</div>
          <div>{card.notes}</div>
        </div>
      )}
      
      {card.requireRegistration && card.registrationLink && (
        <div className="mt-3">
          <a 
            href={card.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            前往登錄活動 →
          </a>
        </div>
      )}
    </div>
  );
};

export default CreditCard; 