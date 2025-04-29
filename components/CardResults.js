import React from 'react';
import CreditCard from './CreditCard';
import { installmentOptions } from '../data/creditcards';
import PropTypes from 'prop-types';

const CardResults = ({ cards, taxAmount, strategy, period }) => {
  // 去除重複的卡片（根據 id）
  const uniqueCards = [...new Map(cards.map(card => [card.id, card])).values()];

  // 根據 period 過濾卡片
  const filteredCards = uniqueCards.filter(card => {
    if (strategy === 'installment') {
      const cardInstOptions = installmentOptions.find(opt => opt.bank === card.bank);
      if (!cardInstOptions) return false;
      
      if (period === 'all') {
        return true;
      }
      
      return cardInstOptions.periods.includes(parseInt(period));
    }
    return true;
  });

  // 根據不同視圖模式顯示不同的標題
  const getRecommendationTitle = () => {
    switch (strategy) {
      case 'split':
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
      
      {uniqueCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => (
            <CreditCard 
              key={card.uniqueId || `${card.id}-${index}`} 
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

CardResults.propTypes = {
  cards: PropTypes.array.isRequired,
  taxAmount: PropTypes.number.isRequired,
  strategy: PropTypes.string.isRequired,
  period: PropTypes.string
};

export default CardResults;