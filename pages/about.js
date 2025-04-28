import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="關於我們 | 2025台灣所得稅信用卡優惠比較">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">關於2025台灣所得稅信用卡優惠比較工具</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">我們的目標</h2>
            <p className="text-gray-700 mb-3">
              我們創建這個工具是為了幫助台灣納稅人在繳納綜合所得稅時，能夠輕鬆找到最適合自己的信用卡，獲得最大的回饋收益。
            </p>
            <p className="text-gray-700">
              不同銀行的信用卡提供不同的回饋率和額度，我們整理了2025年度各大銀行針對綜合所得稅繳納的特殊回饋資訊，幫助您做出最優選擇。
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">資料來源</h2>
            <p className="text-gray-700 mb-3">
              本工具的資料來源於各銀行官方網站、信用卡優惠公告以及官方活動資訊。我們會定期更新這些資料，以確保資訊的準確性。
            </p>
            <p className="text-gray-700">
              請注意，銀行的優惠政策可能隨時變更，建議在做最終決定前，再次查閱銀行官方網站或聯繫銀行客服確認最新優惠內容。
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">免責聲明</h2>
            <p className="text-gray-700">
              本網站提供的資訊僅供參考，不構成任何投資或金融建議。信用卡使用應根據個人財務狀況謹慎評估，我們不對使用者因使用本工具所做決策承擔責任。
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/" className="btn btn-primary">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 