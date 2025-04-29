import React from 'react';
import CreditCard from './CreditCard';
import { installmentOptions } from '../data/creditcards';

const CardResults = ({ cards, taxAmount, strategy }) => {
  // 預處理卡片數據
  const processedCards = cards.map(card => {
    // 處理分期卡資訊
    if (card.installmentAvailable && !card.installmentPeriods) {
      const bankOptions = installmentOptions.filter(opt => opt.bank === card.bank);
      if (bankOptions.length > 0) {
        const maxPeriod = Math.max(...bankOptions.flatMap(opt => opt.periods));
        return { ...card, installmentPeriods: maxPeriod };
      }
    }
    return card;
  });

  // 計算卡片綜合價值的輔助函數
  const calculateCardValue = (card, amount) => {
    let value = 0;
    
    // 考慮現金回饋
    if (card.cashbackRate) {
      value += Math.min(amount * card.cashbackRate, card.cashbackLimit || Infinity);
    }
    
    // 考慮分期優惠
    if (card.installmentAvailable) {
      const monthlyRate = 0.015 / 12; // 1.5% APR
      const months = card.installmentPeriods || 12;
      value += (monthlyRate * amount * (months + 1)) / 2;
      // 扣除手續費的影響
      value -= amount * (card.handlingFee || 0);
    }
    
    // 考慮超商繳費優惠
    if (card.convenienceStore) {
      const convenienceAmount = Math.min(amount, 30000);
      value += convenienceAmount * (card.bestOption?.cashbackRate || 0);
    }
    
    return value;
  };

  // 根據不同策略排序卡片
  const sortedCards = [...processedCards].sort((a, b) => {
    switch (strategy) {
      case 'split_convenience':
      case 'convenience':
        // 超商策略：優先考慮回饋率和實際可用額度
        if (a.convenienceStore && b.convenienceStore) {
          const effectiveRateA = (a.cashback || 0) / (a.amountToUse || 30000);
          const effectiveRateB = (b.cashback || 0) / (b.amountToUse || 30000);
          return effectiveRateB - effectiveRateA;
        }
        return b.convenienceStore ? 1 : -1;

      case 'split_installment':
      case 'installment':
        // 分期策略：優先考慮手續費和期數
        if (a.installmentAvailable && b.installmentAvailable) {
          // 先比較手續費
          if (a.handlingFee !== b.handlingFee) {
            return (a.handlingFee || 0) - (b.handlingFee || 0);
          }
          // 再比較期數
          return (b.installmentPeriods || 0) - (a.installmentPeriods || 0);
        }
        return b.installmentAvailable ? 1 : -1;

      case 'cashback':
        // 現金回饋策略：考慮實際回饋金額
        const cashbackA = a.estimatedCashback || 0;
        const cashbackB = b.estimatedCashback || 0;
        return cashbackB - cashbackA;

      default:
        // 默認排序：綜合考慮各種因素
        const valueA = calculateCardValue(a, taxAmount);
        const valueB = calculateCardValue(b, taxAmount);
        return valueB - valueA;
    }
  });

  // 根據不同策略篩選卡片
  const filterCards = () => {
    switch (strategy) {
      case 'split_convenience':
      case 'convenience':
        return sortedCards.filter(card => card.convenienceStore);
        
      case 'split_installment':
      case 'installment':
        return sortedCards.filter(card => 
          card.installmentAvailable && 
          (!card.minTaxAmount || card.minTaxAmount <= taxAmount)
        );
        
      case 'cashback':
        return sortedCards.filter(card => 
          card.cashbackRate > 0 &&
          (!card.minTaxAmount || card.minTaxAmount <= taxAmount)
        );
        
      default:
        return sortedCards;
    }
  };

  const displayCards = filterCards().slice(0, 5);

  // 根據不同視圖模式顯示不同的標題
  const getRecommendationTitle = () => {
    switch (strategy) {
      case 'split':
      case 'split_convenience':
      case 'split_installment':
        return '最佳組合方案詳細資訊';
      case 'convenience':
        return '超商繳費卡片詳細資訊';
      case 'installment':
        return '分期零利率卡片詳細資訊';
      case 'cashback':
        return '現金回饋卡片詳細資訊';
      default:
        return '信用卡詳細資訊';
    }
  };

  // 根據不同視圖模式顯示不同的提示
  const getStrategyTip = () => {
    switch (strategy) {
      case 'split':
      case 'split_convenience':
      case 'split_installment':
        return (
          <div className="text-gray-700 mb-4 bg-purple-50 p-3 rounded-lg border border-purple-200">
            <p className="text-sm">顯示最佳組合方案中的推薦信用卡，包含超商繳費和分期付款的選項</p>
          </div>
        );
      case 'convenience':
        return (
          <div className="text-gray-700 mb-4 bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm">顯示超商繳費回饋最高的信用卡，每筆繳費上限為 NT$ 30,000</p>
          </div>
        );
      case 'installment':
        return (
          <div className="text-gray-700 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
            <p className="text-sm">顯示提供零利率分期的信用卡，依據手續費和 APR 收益排序</p>
          </div>
        );
      case 'cashback':
        return (
          <div className="text-gray-700 mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm">顯示回饋最高的信用卡，依據回饋金額排序</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{getRecommendationTitle()}</h2>
      
      {getStrategyTip()}
      
      {displayCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCards.map((card, index) => (
            <CreditCard 
              key={`${card.id}-${strategy}`}
              card={card} 
              taxAmount={taxAmount} 
              viewMode={strategy}
              isHighlighted={index === 0} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            未找到符合條件的信用卡。請調整稅額或選擇其他繳納方式。
          </p>
        </div>
      )}
    </div>
  );
};

export default CardResults; 