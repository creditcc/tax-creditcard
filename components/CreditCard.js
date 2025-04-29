import React from 'react';

const CreditCard = ({ card, taxAmount, isHighlighted, viewMode }) => {
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
      return Math.round(Math.min(
        card.cashbackLimit || Infinity,
        convenienceAmount * card.cashbackRate
      ));
    }
    
    // 一般信用卡回饋计算
    return Math.round(Math.min(
      card.cashbackLimit || Infinity,
      taxAmount * card.cashbackRate
    ));
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
    
    // 最低稅額
    if (card.minTaxAmount !== undefined) {
      features.push(
        <div key="minTaxAmount" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">最低稅額</div>
          <div className="font-semibold">NT$ {card.minTaxAmount.toLocaleString()}</div>
        </div>
      );
    }

    // 最高稅額
    if (card.maxTaxAmount !== undefined) {
      features.push(
        <div key="maxTaxAmount" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">最高稅額</div>
          <div className="font-semibold">NT$ {card.maxTaxAmount.toLocaleString()}</div>
        </div>
      );
    }

    // 現金回饋
    if (card.cashbackRate !== undefined) {
      const cashback = Math.round(Math.min(
        taxAmount * card.cashbackRate,
        card.cashbackLimit || Infinity
      ));
      features.push(
        <div key="cashback" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">預估回饋</div>
          <div className="font-semibold">
            NT$ {cashback.toLocaleString()} ({(card.cashbackRate * 100).toFixed(2)}%)
          </div>
        </div>
      );
    }

    // 分期資訊
    if (card.installmentAvailable) {
      features.push(
        <div key="installment" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">分期資訊</div>
          <div className="font-semibold">
            {card.installmentPeriods}期
            {card.handlingFee !== undefined && 
              ` (手續費 ${(card.handlingFee * 100).toFixed(2)}%)`
            }
          </div>
          {card.monthlyPayment !== undefined && (
            <div className="text-sm text-gray-500">
              每月還款 NT$ {Math.round(card.monthlyPayment).toLocaleString()}
            </div>
          )}
        </div>
      );
    }

    // 超商繳費
    if (card.convenienceStore) {
      features.push(
        <div key="convenience" className="mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">超商繳費</div>
          <div className="font-semibold">可用</div>
          <div className="text-sm text-gray-500">單筆上限 NT$ 30,000</div>
        </div>
      );
    }

    // APR 收益（僅在分期視圖中顯示）
    // if (viewMode === 'installment' && card.aprSavings !== undefined) {
    //   features.push(
    //     <div key="aprSavings" className="mb-2">
    //       <div className="text-sm text-gray-600 dark:text-gray-400">APR 1.5% 收益</div>
    //       <div className="font-semibold">NT$ {card.aprSavings.toLocaleString()}</div>
    //     </div>
    //   );
    // }

    return features;
  };
  
  // 拆單策略說明
  const renderSplitAdvice = () => {
    if (card.convenienceStore) {
      // 每張卡只能拆一次，金額為回饋上限或30000中較小值
      const maxAmount = Math.min(30000, 
        card.cashbackLimit ? card.cashbackLimit / card.cashbackRate : 30000
      );
      const totalCashback = Math.round(Math.min(
        maxAmount * card.cashbackRate,
        card.cashbackLimit || Infinity
      ));
      
      return (
        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600 dark:text-gray-400">
          <div className="font-medium">拆單策略效益:</div>
          <div>建議刷卡金額 NT${maxAmount.toLocaleString()}</div>
          <div>預估回饋 NT${totalCashback.toLocaleString()}</div>
        </div>
      );
    }
    
    return null;
  };

  // Add URL parsing function
  const parseTextWithUrls = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 break-words"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${
      isHighlighted ? 'border-2 bg-white/50' : 'bg-white'
    } ${
      viewMode === 'split' ? 'border-purple-500 bg-purple-50/50' :
      viewMode === 'convenience' ? 'border-green-500 bg-green-50/50' :
      viewMode === 'installment' ? 'border-orange-500 bg-orange-50/50' :
      viewMode === 'cashback' ? 'border-yellow-500 bg-yellow-50/50' :
      'border-gray-200'
    }`}>
      {isHighlighted && (
        <div className="text-center mb-2">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            viewMode === 'split' ? 'bg-purple-500 text-white' :
            viewMode === 'convenience' ? 'bg-green-500 text-white' :
            viewMode === 'installment' ? 'bg-orange-500 text-white' :
            viewMode === 'cashback' ? 'bg-yellow-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            推薦選擇
          </span>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1 text-gray-900">{card.bank} {card.name}</h3>
        <div className="flex flex-wrap">{renderTags()}</div>
      </div>
      
      <div className="space-y-2">
        {renderFeatures()}
      </div>
      
      {renderSplitAdvice()}
      
      <div className="mt-2 text-sm">
        {card.specialRequirements && (
          <div className="text-gray-600 mb-1">{card.specialRequirements}</div>
        )}
        {card.notes && (
          <div className="text-gray-600 break-words whitespace-pre-wrap text-xs">
            {parseTextWithUrls(card.notes)}
          </div>
        )}
      </div>
      
      {card.requireRegistration && card.registrationLink && (
        <div className="mt-3">
          <a 
            href={card.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-sm text-indigo-600 hover:text-indigo-800"
          >
            前往官網 →
          </a>
        </div>
      )}
    </div>
  );
};

export default CreditCard; 