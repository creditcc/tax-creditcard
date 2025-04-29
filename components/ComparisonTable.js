import React, { useState, useEffect } from 'react';
import { creditCards, installmentOptions, convenienceStoreOptions } from '../data/creditcards';
import CardResults from './CardResults';

const ComparisonTable = ({ taxAmount = 0 }) => {
  const [viewMode, setViewMode] = useState(() => getDefaultViewMode(taxAmount));
  const [optimalCombination, setOptimalCombination] = useState([]);
  const [installmentSavings, setInstallmentSavings] = useState([]);
  const [splitStrategy, setSplitStrategy] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('12'); // 設置默認為12期
  const [annualRate, setAnnualRate] = useState(0.015);
  const [annualRateInput, setAnnualRateInput] = useState('1.5');

  // 根据税额确定默认视图模式
  function getDefaultViewMode(amount) {
    // Default to split view for most cases
    if (amount > 0) return 'split';
    // Only fallback to convenience store if amount is 0
    return 'convenience';
  }

  // 监听 taxAmount 变化
  useEffect(() => {
    // 更新视图模式
    setViewMode(getDefaultViewMode(taxAmount));

    // 计算最佳组合
    const combination = calculateOptimalCombination(Math.min(taxAmount, 150000));
    setOptimalCombination(combination);

    // 计算分期方案节省
    const savings = calculateInstallmentSavings(taxAmount);
    setInstallmentSavings(savings);

    // 计算拆分策略
    const splitResult = calculateSplitStrategy(taxAmount);
    setSplitStrategy(splitResult);
  }, [taxAmount]);

  // 监听 annualRate 变化，重新计算分期方案
  useEffect(() => {
    const savings = calculateInstallmentSavings(taxAmount);
    setInstallmentSavings(savings);
  }, [annualRate, taxAmount]);

  // 當 annualRate 變動時，同步 input 顯示
  useEffect(() => {
    setAnnualRateInput((annualRate * 100).toString());
  }, [annualRate]);

  // 计算最佳便利商店卡组合
  const calculateOptimalCombination = (amount) => {
    // 筛选有便利商店选项的卡片
    const eligibleCards = creditCards.filter(card => 
      card.convenienceStore
    );
    
    if (eligibleCards.length === 0) return [];
    
    // 创建可用卡片的工作副本，按照回馈率从高到低排序
    const workingCards = eligibleCards.map(card => {
      // Find the convenience store option for this card
      const convOption = convenienceStoreOptions.find(opt => 
        opt.cards.some(cardName => card.name.includes(cardName))
      );
      
      if (!convOption) return null;
      
      // 计算单次交易上限（考虑便利商店单笔限额30000和卡片最大额度）
      const singleTransactionLimit = Math.min(30000, convOption.maxAmount || 30000);
      
      // 计算实际可用金额和回馈
      const actualMaxAmount = Math.min(singleTransactionLimit, amount);
      const estimatedCashback = Math.round(Math.min(
        actualMaxAmount * convOption.cashbackRate,
        convOption.cashbackLimit
      ));
      
      return {
        ...card,
        bestOption: convOption,
        singleTransactionLimit,
        actualMaxAmount,
        potentialCashback: estimatedCashback,
        effectiveRate: estimatedCashback / actualMaxAmount
      };
    }).filter(Boolean); // Remove any null items
    
    // 按照有效回馈率从高到低排序
    workingCards.sort((a, b) => b.effectiveRate - a.effectiveRate);
    
    let remainingAmount = amount;
    const result = [];
    
    // 贪心算法：使用不同的卡片，每张卡只使用一次
    // 最多使用5张不同的卡，每张卡不超过30000元
    for (const card of workingCards) {
      if (remainingAmount <= 0 || result.length >= 5) break;
      
      // 每张卡只使用一次，计算这张卡实际可用的金额
      const amountToUse = Math.min(card.singleTransactionLimit, remainingAmount);
      
      if (amountToUse > 0) {
        const cashback = Math.round(Math.min(
          amountToUse * card.bestOption.cashbackRate,
          card.bestOption.cashbackLimit
        ));
        
        result.push({
          id: card.id,
          name: card.name,
          amountToUse,
          bestOption: card.bestOption,
          cashback: cashback,
          cardNumber: result.length + 1, // 用于显示这是第几张卡
          totalCards: Math.min(5, workingCards.length) // 总共使用的卡数
        });
        
        remainingAmount -= amountToUse;
      }
    }
    
    return result;
  };

  // 计算分期方案节省
  const calculateInstallmentSavings = (amount) => {
    // 筛选符合最低金额要求的分期卡
    const eligibleCards = creditCards.filter(card => 
      card.installmentAvailable
    );
    
    if (eligibleCards.length === 0) return [];
    
    // 创建所有可用的分期选项列表
    const allOptions = [];
    let optionId = 1; // 用于生成唯一的选项ID
    
    eligibleCards.forEach(card => {
      const cardInstOptions = installmentOptions.filter(opt => 
        opt.bank === card.bank && opt.minAmount <= amount
      );
      
      cardInstOptions.forEach(option => {
        option.periods.forEach(months => {
          // 使用用户设定的 annualRate
          const monthlyRate = annualRate / 12; // 月利率
          
          // 计算递减余额所产生的总利息 (等额本金)
          const aprSavings = Math.round((monthlyRate * amount * (months + 1)) / 2);
          
          // 生成唯一的选项ID
          const uniqueOptionId = `${optionId++}`;
          
          allOptions.push({
            id: uniqueOptionId, // 使用唯一的ID
            cardId: card.id,
            cardName: card.name,
            bank: card.bank,
            months: months,
            handlingFee: option.handlingFee,
            interestRate: option.interestRate,
            minAmount: option.minAmount,
            aprSavings: aprSavings,
            specialRequirements: option.specialRequirements,
            monthlySaving: Math.round(calculateMonthlySaving(amount, { ...option, months }, annualRate))
          });
        });
      });
    });
    
    // 首先按手续费从低到高排序，然后按APR收益从高到低排序
    allOptions.sort((a, b) => {
      if (a.handlingFee !== b.handlingFee) {
        return a.handlingFee - b.handlingFee;
      }
      return b.aprSavings - a.aprSavings;
    });
    
    return allOptions;
  };
  
  // 计算分期每月节省金额（与一般分期相比）
  const calculateMonthlySaving = (amount, option, currentAnnualRate) => {
    // 计算零利率分期的月供
    const zeroInterestMonthly = amount / option.months;
    
    // 计算一般分期的月供（使用用户设定的年化利率）
    const normalInterestRate = currentAnnualRate / 12; // 月利率
    const normalMonthly = (amount * normalInterestRate * Math.pow(1 + normalInterestRate, option.months)) / 
      (Math.pow(1 + normalInterestRate, option.months) - 1);
    
    // 计算手续费
    const handlingFeeAmount = amount * option.handlingFee;
    
    // 每月节省金额 = 一般分期月供 - 零利率分期月供 - 手续费分摊
    return normalMonthly - zeroInterestMonthly - (handlingFeeAmount / option.months);
  };

  // 计算拆分策略
  const calculateSplitStrategy = (amount) => {
    // 任何金额都考虑拆分，只有太小的金额才直接返回null
    if (amount <= 3000) return null;
    
    // 计算便利商店部分 - 最多可拆分5次，每次上限30000，总计上限150000
    const maxConvenienceTotal = Math.min(amount, 150000);
    const conveniencePortion = calculateOptimalCombination(maxConvenienceTotal);
    const convenienceTotal = conveniencePortion.reduce((sum, card) => sum + card.amountToUse, 0);
    const convenienceCashback = conveniencePortion.reduce((sum, card) => sum + card.cashback, 0);
    
    // 剩余部分
    const remainingAmount = amount - convenienceTotal;
    
    // 处理剩余金额
    let remainingStrategy = null;
    
    // 查找符合最低金额要求的分期方案
    const eligibleInstallmentOptions = installmentOptions.filter(option => 
      option.minAmount <= remainingAmount
    ).sort((a, b) => {
      // 优先选择手续费低的
      if (a.handlingFee !== b.handlingFee) return a.handlingFee - b.handlingFee;
      // 手续费相同时，选择期数长的
      return Math.max(...b.periods) - Math.max(...a.periods);
    });
    
    // 如果有符合条件的分期方案，优先使用分期
    if (eligibleInstallmentOptions.length > 0) {
      const bestOption = eligibleInstallmentOptions[0];
      const maxPeriod = Math.max(...bestOption.periods);
      
      // 創建分期策略
      remainingStrategy = {
        type: 'installment',
        amount: remainingAmount,
        bestOption: {
          cardName: `${bestOption.bank}信用卡`,
          months: maxPeriod,
          handlingFee: bestOption.handlingFee,
          interestRate: bestOption.interestRate,
          minAmount: bestOption.minAmount,
          bank: bestOption.bank,
          specialRequirements: bestOption.specialRequirements
        }
      };
    } 
    // 没有分期方案时，使用一般现金回馈
    else if (remainingAmount > 0) {
      const eligibleCards = creditCards.filter(card => 
        card.cashbackRate > 0 &&
        (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount) &&
        (card.maxTaxAmount === undefined || card.maxTaxAmount >= taxAmount)
      );
      
      if (eligibleCards.length > 0) {
        const bestCashbackCard = eligibleCards.sort((a, b) => b.cashbackRate - a.cashbackRate)[0];
        
        if (bestCashbackCard) {
          // 确保考虑回馈上限
          const cashbackAmount = Math.min(
            taxAmount * bestCashbackCard.cashbackRate,
            bestCashbackCard.cashbackLimit
          );
          
          remainingStrategy = {
            type: 'cashback',
            amount: remainingAmount,
            cashbackRate: bestCashbackCard.cashbackRate,
            cashback: cashbackAmount,
            cardName: bestCashbackCard.name
          };
        }
      }
    }
    
    // 如果只有一张便利商店卡并且没有剩余金额，不需要显示拆分策略
    // 修改: 税额≤30000但拆分成2张以上卡的话，仍然显示拆分策略
    if (conveniencePortion.length <= 1 && remainingAmount === 0 && amount <= 30000) {
      return null;
    }
    
    return {
      conveniencePortion,
      convenienceTotal,
      convenienceCashback,
      remainingAmount,
      remainingStrategy,
      totalCashback: convenienceCashback + (
        remainingStrategy?.type === 'cashback' ? remainingStrategy.cashback : 0
      )
    };
  };

  // 计算实际回馈金额的通用函数
  const calculateActualCashback = (card) => {
    if (!card.cashbackRate) return 0;
    // 考虑税额上限
    const applicableTaxAmount = Math.min(
      taxAmount,
      card.maxTaxAmount || Infinity
    );
    
    // 计算回馈（考虑回馈上限）
    return Math.min(
      applicableTaxAmount * card.cashbackRate,
      card.cashbackLimit || Infinity
    );
  };

  // 获取当前视图的卡片列表
  const getCurrentViewCards = () => {
    // 建立信用卡查找快取
    const creditCardMap = new Map(creditCards.map(card => [card.name, card]));
    
    switch (viewMode) {
      case 'convenience':
        if (!optimalCombination.length) return [];
        return optimalCombination
          .map(card => {
            const creditCard = creditCardMap.get(card.name);
            return creditCard ? {
              ...creditCard,
              ...card,
              viewType: 'convenience',
              amountToUse: card.amountToUse,
              cashback: card.cashback,
              bestOption: card.bestOption
            } : null;
          })
          .filter(Boolean)
          .slice(0, 8);

      case 'installment':
        if (!installmentSavings.length) return [];
        return installmentSavings
          .slice(0, 8)
          .map(option => {
            const creditCard = creditCardMap.get(option.cardName);
            return creditCard ? {
              ...creditCard,
              id: `${option.cardId}-${option.months}`,
              name: option.cardName,
              installmentAvailable: true,
              installmentPeriods: option.months,
              minTaxAmount: option.minAmount,
              handlingFee: option.handlingFee,
              aprSavings: option.aprSavings,
              monthlyPayment: Math.round(taxAmount / option.months),
              viewType: 'installment'
            } : null;
          })
          .filter(Boolean);

      case 'cashback':
        return creditCards
          .filter(card => 
            card.cashbackRate > 0 &&
            (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount)
          )
          .map(card => ({
            ...card,
            estimatedCashback: Math.round(calculateActualCashback(card)),
            viewType: 'cashback'
          }))
          .sort((a, b) => b.estimatedCashback - a.estimatedCashback)
          .slice(0, 8);

      case 'split':
        if (!splitStrategy) return [];
        const convenienceCards = splitStrategy.conveniencePortion.map(card => {
          const creditCard = creditCardMap.get(card.name);
          return creditCard ? {
            ...creditCard,
            ...card,
            viewType: 'split_convenience'
          } : null;
        }).filter(Boolean);
        
        const remainingCards = splitStrategy.remainingStrategy?.type === 'installment' 
          ? (() => {
              const card = creditCardMap.get(splitStrategy.remainingStrategy.bestOption.cardName);
              return card ? [{
                ...card,
                id: 'remaining-installment',
                name: splitStrategy.remainingStrategy.bestOption.cardName,
                installmentAvailable: true,
                installmentPeriods: splitStrategy.remainingStrategy.bestOption.months,
                amount: splitStrategy.remainingStrategy.amount,
                viewType: 'split_installment',
                specialRequirements: splitStrategy.remainingStrategy.bestOption.specialRequirements
              }] : [];
            })()
          : [];
        
        return [...convenienceCards, ...remainingCards].slice(0, 8);

      default:
        return [];
    }
  };

  // 获取所有可用的分期期数选项
  const getAvailablePeriods = () => {
    const periods = new Set();
    installmentOptions.forEach(option => {
      option.periods.forEach(period => periods.add(period));
    });
    return Array.from(periods).sort((a, b) => a - b);
  };

  // 渲染普通现金回馈表格
  const renderCashbackTable = () => {
    // 使用通用的计算回馈函数
    const eligibleCards = creditCards.filter(card => 
      card.cashbackRate > 0 &&
      (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount)
    ).sort((a, b) => {
      // 按实际回馈金额从高到低排序
      return calculateActualCashback(b) - calculateActualCashback(a);
    });

    if (eligibleCards.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">沒有符合條件的簡單刷一張信用卡。建議您查看「最佳組合」標籤以獲得更好的方案。</p>
          <button 
            onClick={() => setViewMode('split')}
            className="mt-2 text-purple-600 hover:text-purple-800 font-medium"
          >
            查看最佳組合 →
          </button>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-center border whitespace-nowrap">信用卡</th>
              <th className="p-3 text-center border whitespace-nowrap">回饋率</th>
              <th className="p-3 text-center border whitespace-nowrap">可獲回饋</th>
              <th className="p-3 text-center border whitespace-nowrap">額外條件</th>
              <th className="p-3 text-center border whitespace-nowrap">最低稅額</th>
              <th className="p-3 text-center border whitespace-nowrap">最高稅額</th>
            </tr>
          </thead>
          <tbody>
            {eligibleCards.map((card, index) => (
              <tr key={card.id} className={index === 0 ? "bg-yellow-50" : ""}>
                <td className="p-3 border whitespace-nowrap truncate">
                  {index === 0 && <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mr-2">推薦</span>}
                  {card.name}
                </td>
                <td className="p-3 border whitespace-nowrap">{(card.cashbackRate * 100).toFixed(2)}%</td>
                <td className="p-3 border whitespace-nowrap">
                  NT$ {calculateActualCashback(card).toLocaleString()}
                  {card.cashbackLimit && (
                    <span className="text-xs text-gray-500 ml-2">
                      (上限: NT$ {card.cashbackLimit.toLocaleString()})
                    </span>
                  )}
                </td>
                <td className="p-3 border whitespace-nowrap truncate">{card.specialRequirements || '-'}</td>
                <td className="p-3 border whitespace-nowrap">NT$ {card.minTaxAmount.toLocaleString()}</td>
                <td className="p-3 border whitespace-nowrap">NT$ {card.maxTaxAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 渲染分期表格
  const renderInstallmentTable = () => {
    // 确保所有选项都满足最低金额要求
    let filteredSavings = installmentSavings.filter(option => option.minAmount <= taxAmount);
    
    // 根据选择的期数筛选
    if (selectedPeriod !== 'all') {
      filteredSavings = filteredSavings.filter(option => option.months === parseInt(selectedPeriod));
    }
    
    if (filteredSavings.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">沒有符合條件的零利率分期方案，或稅額未達分期最低門檻。</p>
        </div>
      );
    }

    const availablePeriods = getAvailablePeriods();

    return (
      <div>
        <div className="mb-4 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-base font-medium text-gray-700 mb-1">
              分期期數
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-10"
            >
              <option value="all">全部期數</option>
              {availablePeriods.map(period => (
                <option key={period} value={period}>{period}期</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-base font-medium text-gray-700 mb-1">
              活存年利率 (APR)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                min="0"
                max="10"
                value={annualRateInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnnualRateInput(val);
                  // 允許空值和正在輸入的小數點
                  if (val === '' || val === '.') {
                    setAnnualRate(0);
                    return;
                  }
                  // 檢查是否為有效數字
                  const num = parseFloat(val);
                  if (!isNaN(num) && num >= 0 && num <= 10) {
                    setAnnualRate(num / 100);
                  }
                }}
                className="w-24 rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-10"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-max px-4 md:px-0">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">信用卡</th>
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">期數</th>
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">每月還款</th>
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">最低稅額</th>
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">
                    年利率 {(annualRate * 100).toFixed(1)}% 收益
                    <span 
                      className="ml-1 inline-flex items-center justify-center text-gray-500 cursor-help rounded-full border border-gray-400 w-4 h-4"
                      title={`以活存年利率：${(annualRate * 100).toFixed(1)}% 計算，此計算僅為存款端的利息「收益」，並未考慮政府對所得稅分期付款本身是否可能收取額外費用或利息`}
                    >
                      ?
                    </span>
                  </th>
                  <th className="p-2 md:p-3 text-center border whitespace-nowrap">注意事項</th>
                </tr>
              </thead>
              <tbody>
                {filteredSavings.map((option, index) => {
                  const monthlyPayment = taxAmount / option.months;
                  const totalFee = taxAmount * option.handlingFee;
                  
                  // 查找对应的信用卡信息，获取 specialRequirements
                  const creditCard = creditCards.find(card => 
                    card.id === option.cardId
                  );
                  
                  // 使用 cardId、months 和 bank 的組合來生成唯一 key
                  const uniqueKey = `${option.cardId}-${option.months}-${option.bank}`;
                  return (
                    <tr key={option.id} className={index === 0 ? "bg-orange-50" : ""}>
                      <td className="p-2 md:p-3 border whitespace-nowrap truncate">
                        {index === 0 && <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">推薦</span>}
                        {option.cardName}{creditCard?.specialRequirements ? ` (${creditCard.specialRequirements})` : ''}
                      </td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">{option.months}期</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">NT$ {monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">NT$ {option.minAmount.toLocaleString()}</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">
                        NT$ {option.aprSavings.toLocaleString()}
                      </td>
                      <td className="p-2 md:p-3 border whitespace-nowrap truncate">
                        {option.specialRequirements || '無特殊要求'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 渲染便利商店表格
  const renderConvenienceTable = () => {
    if (optimalCombination.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">沒有符合條件的超商回饋信用卡。</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-max px-4 md:px-0">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 md:p-3 text-center border whitespace-nowrap">信用卡</th>
                <th className="p-2 md:p-3 text-center border whitespace-nowrap">回饋率</th>
                <th className="p-2 md:p-3 text-center border whitespace-nowrap">可獲回饋</th>
                <th className="p-2 md:p-3 text-center border whitespace-nowrap">建議刷卡金額</th>
                <th className="p-2 md:p-3 text-center border whitespace-nowrap">繳費順序</th>
              </tr>
            </thead>
            <tbody>
              {optimalCombination.map((card, index) => (
                <tr key={card.id} className={index === 0 ? "bg-green-50" : ""}>
                  <td className="p-2 md:p-3 border whitespace-nowrap truncate">
                    {index === 0 && 
                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">最高回饋</span>
                    }
                    {card.name}
                  </td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">{(card.bestOption.cashbackRate * 100).toFixed(2)}%</td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">
                    NT$ {card.cashback.toLocaleString()}
                    {card.bestOption.cashbackLimit && (
                      <span className="text-xs text-gray-500 ml-2">
                        (上限: NT$ {card.bestOption.cashbackLimit.toLocaleString()})
                      </span>
                    )}
                  </td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">NT$ {card.amountToUse.toLocaleString()}</td>
                  <td className="p-2 md:p-3 border whitespace-nowrap">第{card.cardNumber}筆</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 渲染最佳组合策略表格
  const renderOptimalCombination = () => {
    if (!splitStrategy) {
      return (
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-slate-600">對於您的稅額 NT$ {taxAmount.toLocaleString()}，建議使用單一張信用卡繳納，無需拆單。請參考其他方案。</p>
        </div>
      );
    }

    // 计算总回馈（包括超商和剩余金额的回馈）
    const totalCashback = splitStrategy.convenienceCashback + 
      (splitStrategy.remainingStrategy?.type === 'cashback' ? splitStrategy.remainingStrategy.cashback : 0);

    // 计算APR 1.5%的收益
    let aprSavings = 0;
    if (splitStrategy.remainingStrategy?.type === 'installment') {
      const option = splitStrategy.remainingStrategy.bestOption;
      const amount = splitStrategy.remainingStrategy.amount;
      const months = option.months;
      
      const annualRate = 0.015; // 1.5% 年利率
      const monthlyRate = annualRate / 12; // 月利率
      
      // 计算递减余额所产生的总利息 (等额本金还款)
      aprSavings = (monthlyRate * amount * (months + 1)) / 2;
    }

    return (
      <div>
        <h4 className="font-medium mb-2">最佳組合策略 - 
          {splitStrategy.remainingStrategy?.type === 'installment' 
            ? `現金回饋 NT$ ${splitStrategy.convenienceCashback.toLocaleString()} + 分期節省 NT$ ${Math.round(aprSavings).toLocaleString()}`
            : `回饋總額: NT$ ${totalCashback.toLocaleString()}`
          }
        </h4>
        
        <div className="mb-4">
          <h5 className="font-medium mb-1">第一步: 超商繳費 - 使用不同信用卡，列印15G於超商拆單繳納（最多5張卡，每筆上限NT$ 30,000）</h5>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-max px-4 md:px-0">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 md:p-3 text-center border whitespace-nowrap">信用卡</th>
                    <th className="p-2 md:p-3 text-center border whitespace-nowrap">回饋率</th>
                    <th className="p-2 md:p-3 text-center border whitespace-nowrap">可獲回饋</th>
                    <th className="p-2 md:p-3 text-center border whitespace-nowrap">建議刷卡金額</th>
                    <th className="p-2 md:p-3 text-center border whitespace-nowrap">繳費順序</th>
                  </tr>
                </thead>
                <tbody>
                  {splitStrategy.conveniencePortion.map((card, index) => (
                    <tr key={card.id}>
                      <td className="p-2 md:p-3 border whitespace-nowrap truncate">{card.name}</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">{(card.bestOption.cashbackRate * 100).toFixed(2)}%</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">
                        NT$ {card.cashback.toLocaleString()}
                        {card.bestOption.cashbackLimit && (
                          <span className="text-xs text-gray-500 ml-2">
                            (上限: NT$ {card.bestOption.cashbackLimit.toLocaleString()})
                          </span>
                        )}
                      </td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">NT$ {card.amountToUse.toLocaleString()}</td>
                      <td className="p-2 md:p-3 border whitespace-nowrap">第{card.cardNumber}筆</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-600">
            <p>超商繳納金額: NT$ {splitStrategy.convenienceTotal.toLocaleString()} | 回饋: NT$ {splitStrategy.convenienceCashback.toLocaleString()}</p>
          </div>
        </div>

        {splitStrategy.remainingAmount > 0 && (
          <div>
            <h5 className="font-medium mb-1">第二步: 剩餘金額 NT$ {splitStrategy.remainingAmount.toLocaleString()}</h5>
            {splitStrategy.remainingStrategy ? (
              splitStrategy.remainingStrategy.type === 'cashback' ? (
                <div className="p-3 border rounded">
                  <p className="mb-1">使用 <strong>{splitStrategy.remainingStrategy.cardName}</strong> 繳納剩餘金額</p>
                  <p className="text-sm text-gray-600">
                    回饋率: {(splitStrategy.remainingStrategy.cashbackRate * 100).toFixed(2)}% | 可獲回饋: NT$ {splitStrategy.remainingStrategy.cashback.toLocaleString()}
                    {splitStrategy.remainingStrategy.cashbackLimit && (
                      <span className="text-xs text-gray-500 ml-2">
                        (上限: NT$ {splitStrategy.remainingStrategy.cashbackLimit.toLocaleString()})
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="p-3 border rounded bg-orange-50">
                  <p className="mb-1 font-medium">零利率分期方案: <strong>{splitStrategy.remainingStrategy.bestOption.cardName}</strong> {splitStrategy.remainingStrategy.bestOption.months}期</p>
                  <div className="text-sm space-y-1 text-gray-700">
                    <p>金額: NT$ {splitStrategy.remainingStrategy.amount.toLocaleString()}</p>
                    <p>
                      手續費: {splitStrategy.remainingStrategy.bestOption.handlingFee > 0 
                        ? `${(splitStrategy.remainingStrategy.bestOption.handlingFee * 100).toFixed(2)}%` 
                        : '免手續費'}
                    </p>
                    <p>每月還款: NT$ {(splitStrategy.remainingStrategy.amount / splitStrategy.remainingStrategy.bestOption.months).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    <p className="text-orange-600">
                      活存收益: NT$ {Math.round(aprSavings).toLocaleString()}
                      <span 
                        className="ml-1 inline-block text-gray-500 cursor-help rounded-full border border-gray-400 w-3 h-3 text-xs text-center"
                        title="以活存年利率：1.5% 計算，此計算僅為存款端的利息「收益」，並未考慮政府對所得稅分期付款本身是否可能收取額外費用或利息"
                      >
                        ?
                      </span>
                    </p>
                    {splitStrategy.remainingStrategy.bestOption.specialRequirements && (
                      <p className="mt-1 italic">備註: {splitStrategy.remainingStrategy.bestOption.specialRequirements}</p>
                    )}
                  </div>
                </div>
              )
            ) : (
              <p className="text-sm text-gray-500">剩餘金額不足，無需額外繳納方式</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-6 -mx-4 md:mx-0">
      <div className="px-0 md:px-4">
        <h3 className="text-2xl font-bold mb-6 text-slate-800 px-4 md:px-0">信用卡繳稅方案比較</h3>
        
        <div className="flex flex-wrap gap-2 md:border-b mb-6 px-4 md:px-0">
          <button
            className={`flex-1 min-w-[140px] py-3 px-4 font-medium rounded-lg md:rounded-b-none transition-all ${
              viewMode === 'split' 
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-200 md:border-b-0' 
                : 'text-slate-600 hover:bg-slate-50 border-transparent border-2'
            }`}
            onClick={() => setViewMode('split')}
          >
            <div>最佳組合</div>
            {splitStrategy && (
              <div className="mt-1 text-sm font-normal">
                {(() => {
                  const totalCashback = splitStrategy.convenienceCashback +
                    (splitStrategy.remainingStrategy?.type === 'cashback' ? splitStrategy.remainingStrategy.cashback : 0);
                  
                  if (splitStrategy.remainingStrategy?.type === 'installment') {
                    const aprSavings = Math.round(
                      (0.015 * splitStrategy.remainingStrategy.amount * (splitStrategy.remainingStrategy.bestOption.months + 1)) / 24
                    );
                    return `回饋 NT$ ${(totalCashback + aprSavings).toLocaleString()}`;
                  }
                  
                  return `回饋 NT$ ${totalCashback.toLocaleString()}`;
                })()}
              </div>
            )}
          </button>

          <button
            className={`flex-1 min-w-[140px] py-3 px-4 font-medium rounded-lg md:rounded-b-none transition-all ${
              viewMode === 'convenience'
                ? 'bg-green-100 text-green-700 border-2 border-green-200 md:border-b-0'
                : 'text-slate-600 hover:bg-slate-50 border-transparent border-2'
            }`}
            onClick={() => setViewMode('convenience')}
          >
            <div>超商繳費</div>
            {optimalCombination.length > 0 && (
              <div className="mt-1 text-sm font-normal">
                回饋 NT$ {optimalCombination.reduce((sum, card) => sum + card.cashback, 0).toLocaleString()}
              </div>
            )}
          </button>

          <button
            className={`flex-1 min-w-[140px] py-3 px-4 font-medium rounded-lg md:rounded-b-none transition-all ${
              viewMode === 'installment'
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-200 md:border-b-0'
                : 'text-slate-600 hover:bg-slate-50 border-transparent border-2'
            }`}
            onClick={() => setViewMode('installment')}
          >
            <div>分期零利率</div>
            {installmentSavings.length > 0 && (
              <div className="mt-1 text-sm font-normal">
                節省 NT$ {Math.max(...installmentSavings.map(s => s.aprSavings)).toLocaleString()}
              </div>
            )}
          </button>

          <button
            className={`flex-1 min-w-[140px] py-3 px-4 font-medium rounded-lg md:rounded-b-none transition-all ${
              viewMode === 'cashback'
                ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200 md:border-b-0'
                : 'text-slate-600 hover:bg-slate-50 border-transparent border-2'
            }`}
            onClick={() => setViewMode('cashback')}
          >
            <div>簡單刷一張</div>
            {creditCards.length > 0 && taxAmount > 0 && (
              <div className="mt-1 text-sm font-normal">
                {(() => {
                  const eligibleCards = creditCards.filter(card => 
                    card.cashbackRate > 0 &&
                    (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount)
                  ).sort((a, b) => {
                    const aCashback = Math.min(
                      taxAmount * a.cashbackRate,
                      a.cashbackLimit || Infinity
                    );
                    const bCashback = Math.min(
                      taxAmount * b.cashbackRate,
                      b.cashbackLimit || Infinity
                    );
                    return bCashback - aCashback;
                  });

                  if (eligibleCards.length > 0) {
                    const bestCard = eligibleCards[0];
                    const cashback = Math.min(
                      taxAmount * bestCard.cashbackRate,
                      bestCard.cashbackLimit || Infinity
                    );
                    return `回饋 NT$ ${cashback.toLocaleString()}`;
                  }
                  return null;
                })()}
              </div>
            )}
          </button>
        </div>
        
        <div className={`bg-white/50 backdrop-blur-sm rounded-2xl md:rounded-t-none shadow-sm border border-slate-200/60 p-4 md:p-6 overflow-hidden ${
          viewMode === 'split' ? 'md:border-t-purple-200' :
          viewMode === 'convenience' ? 'md:border-t-green-200' :
          viewMode === 'installment' ? 'md:border-t-orange-200' :
          'md:border-t-yellow-200'
        }`}>
          {viewMode === 'convenience' && (
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="text-xl font-bold text-green-700">超商繳費最佳選擇</h4>
                {optimalCombination.length > 0 && (
                  <div className="text-lg font-medium text-green-600">
                    總回饋：NT$ {optimalCombination.reduce((sum, card) => sum + card.cashback, 0).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="px-4 md:px-0">
                  {renderConvenienceTable()}
                </div>
              </div>
            </div>
          )}
          
          {viewMode === 'installment' && (
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="text-xl font-bold text-orange-700">零利率分期方案比較</h4>
                {installmentSavings.length > 0 && (
                  <div className="text-lg font-medium text-orange-600">
                    最高節省：NT$ {Math.max(...installmentSavings.map(s => s.aprSavings)).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="px-4 md:px-0">
                  {renderInstallmentTable()}
                </div>
              </div>
            </div>
          )}
          
          {viewMode === 'cashback' && (
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="text-xl font-bold text-yellow-700">簡單刷一張比較</h4>
                {(() => {
                  const eligibleCards = creditCards.filter(card => 
                    card.cashbackRate > 0 &&
                    (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount)
                  ).sort((a, b) => {
                    const aCashback = Math.min(
                      taxAmount * a.cashbackRate,
                      a.cashbackLimit || Infinity
                    );
                    const bCashback = Math.min(
                      taxAmount * b.cashbackRate,
                      b.cashbackLimit || Infinity
                    );
                    return bCashback - aCashback;
                  });

                  if (eligibleCards.length > 0) {
                    const bestCard = eligibleCards[0];
                    const cashback = Math.min(
                      taxAmount * bestCard.cashbackRate,
                      bestCard.cashbackLimit || Infinity
                    );
                    return (
                      <div className="text-lg font-medium text-yellow-600">
                        最高回饋：NT$ {cashback.toLocaleString()}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="px-4 md:px-0">
                  {renderCashbackTable()}
                </div>
              </div>
            </div>
          )}
          
          {viewMode === 'split' && (
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="text-xl font-bold text-purple-700">稅額拆分最佳組合</h4>
                {splitStrategy && (
                  <div className="text-lg font-medium text-purple-600">
                    {splitStrategy.remainingStrategy?.type === 'installment'
                      ? `回饋 NT$ ${splitStrategy.convenienceCashback.toLocaleString()} + 分期節省 NT$ ${Math.round(
                          (0.015 * splitStrategy.remainingStrategy.amount * (splitStrategy.remainingStrategy.bestOption.months + 1)) / 24
                        ).toLocaleString()}`
                      : `總回饋：NT$ ${(
                          splitStrategy.convenienceCashback +
                          (splitStrategy.remainingStrategy?.type === 'cashback' ? splitStrategy.remainingStrategy.cashback : 0)
                        ).toLocaleString()}`
                    }
                  </div>
                )}
              </div>
              {splitStrategy ? renderOptimalCombination() : (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-600">對於您的稅額 NT$ {taxAmount.toLocaleString()}，建議使用單一張信用卡繳納，無需拆單。請參考其他方案。</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-4 md:p-8 mt-6">
          <h3 className="text-xl font-bold mb-6 text-slate-800">符合條件的信用卡</h3>
          <CardResults 
            key={`card-results-${viewMode}`}
            cards={getCurrentViewCards()} 
            taxAmount={taxAmount} 
            strategy={viewMode} 
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable; 