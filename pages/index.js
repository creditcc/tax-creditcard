import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import TaxForm from '../components/TaxForm';
import CardResults from '../components/CardResults';
import ComparisonTable from '../components/ComparisonTable';
import { creditCards } from '../data/creditcards';
import Head from 'next/head';

export default function Home() {
  const [taxAmount, setTaxAmount] = useState(0);
  const [filteredCards, setFilteredCards] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [taxYear, setTaxYear] = useState('2025');
  const [paymentStrategy, setPaymentStrategy] = useState('cashback');
  
  const resultsRef = useRef(null);

  useEffect(() => {
    if (taxAmount > 0) {
      // 根据税额确定策略
      let strategy;
      if (taxAmount >= 500000) {
        strategy = 'installment';
      } else if (taxAmount <= 30000) {
        strategy = 'convenience';
      } else {
        strategy = 'split';
      }
      setPaymentStrategy(strategy);

      // 根据策略和税额过滤信用卡
      let eligibleCards = [];
      
      // 对于分期方案，只考虑符合最低金额要求的分期卡
      if (strategy === 'installment') {
        eligibleCards = creditCards.filter(card => 
          card.installmentAvailable
        );
      } 
      // 对于超商方案，只考虑不超过最高金额限制的超商卡
      else if (strategy === 'convenience') {
        eligibleCards = creditCards.filter(card => 
          card.convenienceStore
        );
      }
      // 对于拆单策略，考虑所有符合条件的信用卡
      else if (strategy === 'split') {
        const installmentCards = creditCards.filter(card => 
          card.installmentAvailable
        );
        
        const convenienceCards = creditCards.filter(card => 
          card.convenienceStore
        );
        
        const cashbackOnlyCards = creditCards.filter(card => 
          card.cashbackRate > 0 &&
          (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount) &&
          (card.maxTaxAmount === undefined || card.maxTaxAmount >= taxAmount)
        );
        
        // 合并结果并去重
        const allEligibleCards = [...installmentCards, ...convenienceCards, ...cashbackOnlyCards];
        eligibleCards = allEligibleCards.filter((card, index, self) => 
          index === self.findIndex((c) => c.id === card.id)
        );
      }
      // 一般现金回馈方案
      else {
        eligibleCards = creditCards.filter(card => 
          card.cashbackRate > 0 &&
          (card.minTaxAmount === undefined || card.minTaxAmount <= taxAmount) &&
          (card.maxTaxAmount === undefined || card.maxTaxAmount >= taxAmount)
        );
      }

      setFilteredCards(eligibleCards);
      setShowResults(eligibleCards.length > 0);
    } else {
      setShowResults(false);
    }
  }, [taxAmount]);
  
  const handleTaxSubmit = (amount) => {
    setTaxAmount(amount);
    setShowResults(true);
    
    // 滚动到结果区域
    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };
  
  const renderStrategyAdvice = () => {
    if (taxAmount <= 0) return null;

    switch (paymentStrategy) {
      case 'installment':
        return (
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 mb-6">
            <h3 className="text-xl font-bold text-orange-800 mb-2">首選零利率分期</h3>
            <p className="mb-2">
              您的稅額為 NT$ {taxAmount.toLocaleString()}，使用零利率分期可以避免一次性大額消費，
              並讓您的資金能夠更長時間地投資理財。
            </p>
            <ul className="list-disc list-inside text-orange-700 space-y-1">
              <li>專家建議：優先選擇手續費低或免手續費的分期方案</li>
              <li>期數建議：選擇最長期限（12期）可以獲得最大的資金時間價值</li>
              <li>可考慮搭配：將部分金額通過超商繳費獲得回饋</li>
            </ul>
          </div>
        );
      
      case 'convenience':
        return (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-2">首選超商繳費</h3>
            <p className="mb-2">
              您的稅額為 NT$ {taxAmount.toLocaleString()}，超商繳費是您的最佳選擇，
              部分信用卡在超商繳費可享最高6%回饋。
            </p>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>專家建議：優先選擇回饋率高的超商信用卡</li>
              <li>注意事項：部分超商每筆繳費上限為NT$ 30,000</li>
              <li>注意事項：大部分信用卡超商回饋有上限，建議使用最佳組合方案</li>
            </ul>
          </div>
        );
      
      case 'split':
        return (
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 mb-6">
            <h3 className="text-xl font-bold text-purple-800 mb-2">建議拆單繳款</h3>
            <p className="mb-2">
              您的稅額為 NT$ {taxAmount.toLocaleString()}，拆單使用不同信用卡繳納可能是您的最佳選擇，
              透過合理分配，可以最大化回饋收益。
            </p>
            <ul className="list-disc list-inside text-purple-700 space-y-1">
              <li>超商繳稅：將部分金額（最高NT$ 30,000）用超商回饋高的信用卡支付</li>
              <li>普通信用卡：剩餘金額可使用一般現金回饋信用卡</li>
              <li>看下表最佳組合方案，可獲得最高的總體回饋</li>
            </ul>
          </div>
        );
      
      default:
        return (
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">簡單刷一張方案</h3>
            <p>
              您的稅額為 NT$ {taxAmount.toLocaleString()}，使用一般現金回饋信用卡可以獲得基本的回饋，
              請根據您持有的信用卡選擇最高回饋率的卡片。
            </p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <Head>
        <title>2025綜所稅信用卡最佳繳納方案 - 稅款計算與回饋比較</title>
        <meta name="description" content="計算2025綜所稅最佳信用卡繳納方案，比較各銀行卡片回饋、零利率分期與超商繳費選項，為您節省最多稅金支出。" />
      </Head>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            2025綜所稅信用卡繳納計算
          </h1>
          <p className="text-lg text-slate-600">
            輸入您的稅額，立即為您計算最佳的繳納組合方案
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <TaxForm onSubmit={handleTaxSubmit} />
          </div>
        </div>

        {showResults && (
          <div ref={resultsRef} className="mt-12 space-y-8">
            {renderStrategyAdvice()}
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-8">
              <ComparisonTable taxAmount={taxAmount} />
            </div>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">繳稅注意事項</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              <strong className="text-slate-700">綜所稅繳納期間：</strong>每年5月1日至6月30日
            </p>
            <p>
              <strong className="text-slate-700">信用卡繳稅優勢：</strong>
              使用信用卡繳稅可享有現金回饋、零利率分期或積點回饋等優惠，但需注意各卡片的回饋上限和適用條件。
            </p>
            <p>
              <strong className="text-slate-700">超商繳費：</strong>
              在7-11、全家、萊爾富、OK等四大超商均可使用信用卡繳稅，單筆上限為NT$ 30,000。若稅額超過，可拆分多張繳款單。
            </p>
            <p>
              <strong className="text-slate-700">分期付款提醒：</strong>
              零利率分期通常要求最低稅額，且大部分銀行提供3-12期不等的分期選擇，請確認您的信用卡是否符合資格。
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
} 