import React, { useState, useEffect } from 'react';
import { creditCards, installmentOptions, convenienceStoreOptions } from '../data/creditcards';

const ComparisonTable = ({ taxAmount = 0 }) => {
  const [viewMode, setViewMode] = useState(() => getDefaultViewMode(taxAmount));
  const [optimalCombination, setOptimalCombination] = useState([]);
  const [installmentSavings, setInstallmentSavings] = useState([]);
  const [splitStrategy, setSplitStrategy] = useState(null);

  // 根据税额确定默认视图模式
  function getDefaultViewMode(amount) {
    // Default to split view for most cases
    if (amount > 0) return 'split';
    // Only fallback to convenience store if amount is 0
    return 'convenience';
  }

  useEffect(() => {
    // 更新视图模式
    setViewMode(getDefaultViewMode(taxAmount));

    // 计算最佳组合
    const combination = calculateOptimalCombination(Math.min(taxAmount, 150000));
    setOptimalCombination(combination);

    // 计算分期方案节省
    const savings = calculateInstallmentSavings(taxAmount);
    setInstallmentSavings(savings);

    // 计算拆分策略 - 对任何税额都计算拆分策略
    const splitResult = calculateSplitStrategy(taxAmount);
    setSplitStrategy(splitResult);
  }, [taxAmount]);

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
      const estimatedCashback = Math.min(
        actualMaxAmount * convOption.cashbackRate,
        convOption.cashbackLimit
      );
      
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
        const cashback = Math.min(
          amountToUse * card.bestOption.cashbackRate,
          card.bestOption.cashbackLimit
        );
        
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
    eligibleCards.forEach(card => {
      const cardInstOptions = installmentOptions.filter(opt => 
        opt.bank === card.bank && opt.minAmount <= amount
      );
      
      cardInstOptions.forEach(option => {
        option.periods.forEach(months => {
          // 计算APR 1.5%的收益
          const annualRate = 0.015; // 1.5% 年利率
          const monthlyRate = annualRate / 12; // 月利率
          
          // 计算递减余额所产生的总利息 (等额本金)
          const aprSavings = Math.round((monthlyRate * amount * (months + 1)) / 2);
          
          allOptions.push({
            cardId: card.id,
            cardName: card.name,
            months: months,
            handlingFee: option.handlingFee,
            interestRate: option.interestRate,
            minAmount: option.minAmount,
            aprSavings: aprSavings,
            monthlySaving: calculateMonthlySaving(amount, { ...option, months })
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
  const calculateMonthlySaving = (amount, option) => {
    // 计算零利率分期的月供
    const zeroInterestMonthly = amount / option.months;
    
    // 计算一般分期的月供（假设一般分期年化利率为15%）
    const normalInterestRate = 0.15 / 12; // 月利率
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
          specialOffer: bestOption.specialOffer
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
      totalCashback: convenienceCashback + (remainingStrategy?.type === 'cashback' ? remainingStrategy.cashback : 0)
    };
  };

  // 渲染普通现金回馈表格
  const renderCashbackTable = () => {
    // 计算每张卡实际可获得的回馈金额
    const calculateActualCashback = (card) => {
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
              <th className="p-3 text-left border">信用卡</th>
              <th className="p-3 text-left border">回饋率</th>
              <th className="p-3 text-left border">可獲回饋</th>
              <th className="p-3 text-left border">額外條件</th>
            </tr>
          </thead>
          <tbody>
            {eligibleCards.map((card, index) => {
              const cashback = calculateActualCashback(card);
              
              return (
                <tr key={card.id} className={index === 0 ? "bg-yellow-50" : ""}>
                  <td className="p-3 border">
                    {index === 0 && <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mr-2">推薦</span>}
                    {card.name}
                  </td>
                  <td className="p-3 border">{(card.cashbackRate * 100).toFixed(2)}%</td>
                  <td className="p-3 border">NT$ {cashback.toLocaleString()}</td>
                  <td className="p-3 border">
                    {card.specialRequirements && (
                      <ul className="list-disc pl-5">
                        {card.specialRequirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // 渲染分期表格
  const renderInstallmentTable = () => {
    // 确保所有选项都满足最低金额要求
    const filteredSavings = installmentSavings.filter(option => option.minAmount <= taxAmount);
    
    if (filteredSavings.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">沒有符合條件的零利率分期方案，或稅額未達分期最低門檻。</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">信用卡</th>
              <th className="p-3 text-left border">期數</th>
              <th className="p-3 text-left border">手續費</th>
              <th className="p-3 text-left border">每月還款</th>
              <th className="p-3 text-left border">最低稅額</th>
              <th className="p-3 text-left border">
                年利率 1.5% 收益
                <span 
                  className="ml-1 inline-block text-gray-500 cursor-help rounded-full border border-gray-400 w-4 h-4 text-xs text-center"
                  title="以活存年利率：1.5% 計算，此計算僅為存款端的利息「收益」，並未考慮政府對所得稅分期付款本身是否可能收取額外費用或利息"
                >
                  ?
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSavings.map((option, index) => {
              const monthlyPayment = taxAmount / option.months;
              const totalFee = taxAmount * option.handlingFee;
              
              return (
                <tr key={`${option.cardId}-${option.months}`} className={index === 0 ? "bg-orange-50" : ""}>
                  <td className="p-3 border">
                    {index === 0 && <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">推薦</span>}
                    {option.cardName}
                  </td>
                  <td className="p-3 border">{option.months}期</td>
                  <td className="p-3 border">
                    {option.handlingFee > 0 
                      ? `${(option.handlingFee * 100).toFixed(2)}% (NT$ ${totalFee.toLocaleString()})` 
                      : '免手續費'}
                  </td>
                  <td className="p-3 border">NT$ {monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                  <td className="p-3 border">NT$ {option.minAmount.toLocaleString()}</td>
                  <td className="p-3 border">
                    NT$ {option.aprSavings.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">信用卡</th>
              <th className="p-3 text-left border">超商</th>
              <th className="p-3 text-left border">回饋率</th>
              <th className="p-3 text-left border">建議刷卡金額</th>
              <th className="p-3 text-left border">可獲回饋</th>
              <th className="p-3 text-left border">繳費順序</th>
            </tr>
          </thead>
          <tbody>
            {optimalCombination.map((card, index) => (
              <tr key={card.id} className={index === 0 ? "bg-green-50" : ""}>
                <td className="p-3 border">
                  {index === 0 && 
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">最高回饋</span>
                  }
                  {card.name}
                </td>
                <td className="p-3 border">{card.bestOption.bank}</td>
                <td className="p-3 border">{(card.bestOption.cashbackRate * 100).toFixed(2)}%</td>
                <td className="p-3 border">NT$ {card.amountToUse.toLocaleString()}</td>
                <td className="p-3 border">NT$ {card.cashback.toLocaleString()}</td>
                <td className="p-3 border">第{card.cardNumber}筆</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-right text-sm text-gray-600">
          <p>總回饋金額: NT$ {optimalCombination.reduce((sum, card) => sum + card.cashback, 0).toLocaleString()}</p>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          <p className="text-yellow-600">提醒：超商每筆繳納上限為NT$ 30,000，建議使用不同信用卡拆單繳納，每張卡只能獲得一次回饋。</p>
        </div>
      </div>
    );
  };

  // 渲染最佳组合策略表格
  const renderOptimalCombination = () => {
    if (!splitStrategy) {
      return (
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-gray-500">您的稅額在單一繳納方式範圍內，請參考推薦方案。</p>
        </div>
      );
    }

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
          {splitStrategy.remainingStrategy?.type === 'installment' ? '零利率分期' : `回饋總額: NT$ ${splitStrategy.totalCashback.toLocaleString()}`}
        </h4>
        
        <div className="mb-4">
          <h5 className="font-medium mb-1">第一步: 超商繳費 - 使用不同信用卡拆單繳納（最多5張卡，每筆上限NT$ 30,000）</h5>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border">信用卡</th>
                  <th className="p-2 text-left border">銀行</th>
                  <th className="p-2 text-left border">回饋率</th>
                  <th className="p-2 text-left border">建議刷卡金額</th>
                  <th className="p-2 text-left border">可獲回饋</th>
                  <th className="p-2 text-left border">繳費順序</th>
                </tr>
              </thead>
              <tbody>
                {splitStrategy.conveniencePortion.map((card, index) => (
                  <tr key={card.id}>
                    <td className="p-2 border">{card.name}</td>
                    <td className="p-2 border">{card.bestOption.bank}</td>
                    <td className="p-2 border">{(card.bestOption.cashbackRate * 100).toFixed(2)}%</td>
                    <td className="p-2 border">NT$ {card.amountToUse.toLocaleString()}</td>
                    <td className="p-2 border">NT$ {card.cashback.toLocaleString()}</td>
                    <td className="p-2 border">第{card.cardNumber}筆</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                      APR 1.5% 收益: NT$ {Math.round(aprSavings).toLocaleString()}
                      <span 
                        className="ml-1 inline-block text-gray-500 cursor-help rounded-full border border-gray-400 w-3 h-3 text-xs text-center"
                        title="以活存年利率：1.5% 計算，此計算僅為存款端的利息「收益」，並未考慮政府對所得稅分期付款本身是否可能收取額外費用或利息"
                      >
                        ?
                      </span>
                    </p>
                    {splitStrategy.remainingStrategy.bestOption.specialOffer && (
                      <p className="mt-1 italic">備註: {splitStrategy.remainingStrategy.bestOption.specialOffer}</p>
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
    <div className="my-6">
      <h3 className="text-xl font-bold mb-4">信用卡繳稅方案比較</h3>
      
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 mr-2 font-medium ${viewMode === 'split' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-600'}`}
          onClick={() => setViewMode('split')}
        >
          最佳組合
        </button>
        <button
          className={`py-2 px-4 mr-2 font-medium ${viewMode === 'convenience' ? 'border-b-2 border-green-500 text-green-700' : 'text-gray-600'}`}
          onClick={() => setViewMode('convenience')}
        >
          超商繳費
        </button>
        <button
          className={`py-2 px-4 mr-2 font-medium ${viewMode === 'installment' ? 'border-b-2 border-orange-500 text-orange-700' : 'text-gray-600'}`}
          onClick={() => setViewMode('installment')}
        >
          分期零利率
        </button>
        <button
          className={`py-2 px-4 mr-2 font-medium ${viewMode === 'cashback' ? 'border-b-2 border-yellow-500 text-yellow-700' : 'text-gray-600'}`}
          onClick={() => setViewMode('cashback')}
        >
          簡單刷一張
        </button>
      </div>
      
      {viewMode === 'convenience' && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">超商繳費最佳選擇</h4>
          {renderConvenienceTable()}
        </div>
      )}
      
      {viewMode === 'installment' && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">零利率分期方案比較</h4>
          {renderInstallmentTable()}
        </div>
      )}
      
      {viewMode === 'cashback' && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">簡單刷一張比較</h4>
          {renderCashbackTable()}
        </div>
      )}
      
      {viewMode === 'split' && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">稅額拆分最佳組合</h4>
          {splitStrategy ? renderOptimalCombination() : (
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-gray-500">對於您的稅額 NT$ {taxAmount.toLocaleString()}，建議使用單一張信用卡繳納，無需拆單。請參考其他方案。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparisonTable; 