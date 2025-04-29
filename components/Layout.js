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

      <div className="min-h-screen bg-slate-50">
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>

        <footer className="h-20 border-t border-slate-200/50">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-slate-500 text-sm">
              <p>© {new Date().getFullYear()} 台灣所得稅信用卡優惠比較工具</p>
              <p className="mt-1">
                數據僅供參考，實際優惠以各銀行公告為準
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout; 