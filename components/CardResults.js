import React from 'react';
import CreditCard from './CreditCard';
import { installmentOptions } from '../data/creditcards';

const CardResults = ({ cards, taxAmount, strategy }) => {
  // 预处理卡片数据，为分期卡添加期数信息
  const processedCards = cards.map(card => {
    // 如果卡片已有installmentPeriods，则直接使用
    if (card.installmentAvailable && !card.installmentPeriods) {
      // 查找该银行在installmentOptions中的最大分期期数
      const bankOptions = installmentOptions.filter(opt => opt.bank === card.bank);
      if (bankOptions.length > 0) {
        // 找出最高期数
        const maxPeriod = Math.max(...bankOptions.flatMap(opt => opt.periods));
        return { ...card, installmentPeriods: maxPeriod };
      }
    }
    return card;
  });

  // 根據策略與稅額進行排序
  const sortedCards = [...processedCards].sort((a, b) => {
    // 拆單與超商策略優先超商高回饋卡
    if ((strategy === 'split' || strategy === 'convenience' || strategy === 'multiple') && a.convenienceStore && b.convenienceStore) {
      const cashbackA = Math.min(a.cashbackLimit, 30000 * a.cashbackRate);
      const cashbackB = Math.min(b.cashbackLimit, 30000 * b.cashbackRate);
      return cashbackB - cashbackA;
    }
    
    // 分期策略優先分期卡，尤其是高期數的分期卡
    if (strategy === 'installment' && a.installmentAvailable && b.installmentAvailable) {
      // 确保使用正确的期数属性进行比较
      const periodsA = a.installmentPeriods || 0;
      const periodsB = b.installmentPeriods || 0;
      return periodsB - periodsA;
    }
    
    // 一般情況下按照回饋率排序
    const cashbackA = a.cashbackRate ? Math.min(a.cashbackLimit, taxAmount * a.cashbackRate) : 0;
    const cashbackB = b.cashbackRate ? Math.min(b.cashbackLimit, taxAmount * b.cashbackRate) : 0;
    return cashbackB - cashbackA;
  });
  
  // 根據稅額和策略篩選適合的卡片
  let displayCards = sortedCards;
  
  if (strategy === 'split' || strategy === 'multiple') {
    // 拆單策略優先展示便利商店高回饋卡，然後是分期卡
    const convenienceCards = sortedCards.filter(card => card.convenienceStore).slice(0, 2);
    const installmentCards = sortedCards.filter(card => card.installmentAvailable && taxAmount >= card.minTaxAmount).slice(0, 2);
    const remainingCards = sortedCards.filter(card => 
      !convenienceCards.includes(card) && !installmentCards.includes(card)
    ).slice(0, 1);
    
    displayCards = [...convenienceCards, ...installmentCards, ...remainingCards];
  } else if (strategy === 'convenience') {
    // 便利商店策略僅展示便利商店高回饋卡
    displayCards = sortedCards.filter(card => card.convenienceStore).slice(0, 3);
  } else if (strategy === 'installment') {
    // 分期策略優先展示分期卡
    displayCards = sortedCards.filter(card => card.installmentAvailable && taxAmount >= card.minTaxAmount).slice(0, 3);
  }
  
  // 最多顯示5張卡片
  displayCards = displayCards.slice(0, 5);
  
  // 推薦標題根據策略切換
  const getRecommendationTitle = () => {
    switch (strategy) {
      case 'split':
        return '拆單組合方案 - 優先便利商店高回饋，剩餘金額使用分期卡';
      case 'multiple':
        return '拆單繳稅推薦卡片 - 最多可拆5次超商繳納';
      case 'convenience':
        return '便利商店繳稅推薦卡片 - 高回饋';
      case 'installment':
        return '分期繳稅推薦卡片 - 零利率';
      default:
        return '一般信用卡繳稅推薦 - 現金回饋';
    }
  };
  
  // 提示額外說明
  const getStrategyTip = () => {
    if (strategy === 'split' && taxAmount > 150000) {
      return (
        <div className="text-gray-700 mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="font-medium">拆單策略提示：</p>
          <ol className="list-decimal ml-5 text-sm">
            <li>先使用以下超商高回饋卡，拆單繳納5筆，每筆NT$30,000 (共NT$150,000)</li>
            <li>剩餘稅額NT${(taxAmount - 150000).toLocaleString()}使用下方分期卡繳納</li>
            <li>請務必注意登錄期限並確認回饋上限</li>
          </ol>
        </div>
      );
    } else if (strategy === 'multiple') {
      const splitCount = Math.min(Math.ceil(taxAmount / 30000), 5);
      return (
        <div className="text-gray-700 mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="font-medium">拆單策略提示：</p>
          <ol className="list-decimal ml-5 text-sm">
            <li>透過國稅局網站申請15G繳費單，將稅額拆成{splitCount}筆 (最多5筆)</li>
            <li>每筆限額NT$30,000，可使用不同銀行的高回饋信用卡</li>
            <li>可混用下方的多張卡片，依各卡回饋上限最大化回饋效益</li>
          </ol>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{getRecommendationTitle()}</h2>
      
      {getStrategyTip()}
      
      {displayCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCards.map((card, index) => (
            <CreditCard key={card.id} card={card} taxAmount={taxAmount} isHighlighted={index === 0} />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 rounded-lg dark:bg-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            未找到符合條件的信用卡。請嘗試不同的稅額或繳納策略。
          </p>
        </div>
      )}
    </div>
  );
};

export default CardResults; 