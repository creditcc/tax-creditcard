import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, title = '2025台灣綜合所得稅信用卡優惠比較' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="2025年度台灣綜合所得稅信用卡優惠比較工具，幫您選擇最佳回饋信用卡" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  <Link href="/" className="hover:text-blue-100">
                    2025 台灣綜合所得稅信用卡優惠比較
                  </Link>
                </h1>
                <p className="mt-2 text-blue-100">
                  找出最適合您的所得稅繳納信用卡，最大化您的回饋
                </p>
              </div>
              <nav className="mt-4 md:mt-0">
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-white hover:text-blue-100">
                      首頁
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-white hover:text-blue-100">
                      關於我們
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-600 text-sm">
              <p>© {new Date().getFullYear()} 台灣所得稅信用卡優惠比較工具</p>
              <p className="mt-1">
                數據僅供參考，實際優惠以各銀行公告為準
              </p>
              <div className="mt-3">
                <Link href="/about" className="text-blue-600 hover:text-blue-800">
                  關於我們
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout; 