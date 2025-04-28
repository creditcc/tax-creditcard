// 2025年綜合所得稅信用卡回饋資料
// 現金回饋信用卡
export const creditCards = [
  {
    id: 1,
    name: "星展銀行信用卡",
    bank: "星展銀行",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0, // 沒有一般回饋
    minTaxAmount: 1000000, // 最低稅額限制 100萬
    maxTaxAmount: 0, // 0表示沒有上限
    requireRegistration: true,
    registrationLink: "https://www.dbs.com.tw/",
    notes: "需登錄活動 (2025/5/6-7/3)，透過Paytax/電話繳納，12期零利率，排除臨調/超額/預繳",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 2,
    name: "滙豐銀行信用卡",
    bank: "滙豐銀行",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0,
    minTaxAmount: 1000, // 最低稅額限制
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.hsbc.com.tw/",
    notes: "卓越理財貴賓享9期零利率，需透過Paytax/電話繳納",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 3,
    name: "台新銀行信用卡",
    bank: "台新銀行",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0,
    minTaxAmount: 0, // 無最低稅額限制
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.taishinbank.com.tw/",
    notes: "需登錄活動 (2025/4/28-7/5)，透過Paytax/電話繳納，6期零利率，超商/行動支付/臨櫃不適用",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 4,
    name: "台新 @GoGo 卡",
    bank: "台新銀行",
    cashbackRate: 0.06, // 6%
    cashbackLimit: 200, // 最高回饋200點 (每月)
    minTaxAmount: 0, // 無最低限制
    maxTaxAmount: 3333, // 每月上限3333元可獲得200點
    requireRegistration: true,
    registrationLink: "https://www.taishinbank.com.tw/",
    notes: "需每月領券 (Richart Life App)，適用7-11/全家，可用實體卡/Apple Pay/Google Pay/Samsung Pay/台新Pay/全盈Pay，回饋期限至2025/5/31",
    installmentAvailable: false,
    convenienceStore: true,
    mobilePay: true
  },
  // {
  //   id: 5,
  //   name: "台新 @GoGo 卡 (新戶)",
  //   bank: "台新銀行",
  //   cashbackRate: 0.26, // 6% + 20% = 26%
  //   cashbackLimit: 2000, // 新戶加碼20%上限2000點
  //   minTaxAmount: 0,
  //   maxTaxAmount: 10000, // 可繳10000元獲得最高回饋
  //   requireRegistration: true,
  //   registrationLink: "https://www.taishinbank.com.tw/",
  //   notes: "需為新戶 (6個月內無台新卡)，需於5/31前透過指定連結申辦，並使用指定支付工具繳稅，回饋期限為核卡後90天",
  //   installmentAvailable: false,
  //   convenienceStore: true,
  //   mobilePay: true
  // },
  {
    id: 6,
    name: "玉山銀行信用卡",
    bank: "玉山銀行",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0,
    minTaxAmount: 0, // 無最低稅額限制
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.esunbank.com.tw/",
    notes: "需登錄活動 (需於2025/7/3前)，透過Paytax/玉山Wallet繳納，6期零利率，悠遊付不適用，回饋與分期二選一",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 7,
    name: "第一銀行信用卡",
    bank: "第一銀行",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0,
    minTaxAmount: 10000, // 最低稅額限制
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.firstbank.com.tw/",
    notes: "需登錄活動 (2025/5/1-7/3)，透過Paytax/電話繳納，6期零利率，公務機關平台不適用，回饋與分期二選一",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 8,
    name: "中國信託信用卡",
    bank: "中國信託",
    cashbackRate: 0.0, // 0%
    cashbackLimit: 0,
    minTaxAmount: 0, // 無最低稅額限制
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.ctbcbank.com/",
    notes: "需登錄活動，透過Paytax/電話繳納，6期零利率，回饋與分期二選一",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false
  },
  {
    id: 9,
    name: "中信 統一企業認同卡",
    bank: "中國信託",
    cashbackRate: 0.03, // 3%
    cashbackLimit: 300, // 每月上限300點
    minTaxAmount: 3000, // 需月消費滿3000元
    maxTaxAmount: 10000, // icash單筆/儲值上限10000元
    requireRegistration: false,
    registrationLink: "https://www.ctbcbank.com/",
    notes: "可能限員工申請，需使用icash 2.0自動加值在7-11繳稅，回饋為OPEN Point，回饋期限至2025/12/31",
    installmentAvailable: false,
    convenienceStore: true,
    mobilePay: false
  },
  {
    id: 10,
    name: "富邦 OpenPossible 卡",
    bank: "富邦銀行",
    cashbackRate: 0.02, // 2% (1%無上限+1%上限600元/期)
    cashbackLimit: 600, // 最高加碼回饋600元
    minTaxAmount: 5000, // 需月消費滿5000元
    maxTaxAmount: 30000, // 便利商店上限
    requireRegistration: false,
    registrationLink: "https://www.fubon.com/",
    notes: "主要針對房屋稅，所得稅適用性待確認，需在7-11使用OPEN錢包支付，回饋期限至2025/6/30",
    installmentAvailable: false,
    convenienceStore: true,
    mobilePay: false
  },
  {
    id: 11,
    name: "新光 悠遊聯名卡",
    bank: "新光銀行",
    cashbackRate: 0.04, // 4%
    cashbackLimit: 200, // 每季上限200元
    minTaxAmount: 5000, // 需季消費滿5000元
    maxTaxAmount: 1000, // FamiPay單筆上限1000元
    requireRegistration: true,
    registrationLink: "https://www.skbank.com.tw/",
    notes: "需登錄，每季限3,500名，需在全家使用FamiPay支付，回饋為等值禮券，回饋期限至2025/6/30",
    installmentAvailable: false,
    convenienceStore: true,
    mobilePay: false
  }
];

// 分期付款選項
export const installmentOptions = [
  {
    id: 1,
    bank: "星展銀行",
    cards: ["全卡別"],
    periods: [12],
    interestRate: 0, // 0%利率
    handlingFee: 0, // 0手續費
    minAmount: 1000000,
    specialOffer: "需登錄活動 (2025/5/6-7/3)，透過Paytax/電話繳納，排除臨調/超額/預繳"
  },
  {
    id: 2,
    bank: "星展銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 500000,
    specialOffer: "需登錄活動 (2025/5/6-7/3)，透過Paytax/電話繳納，排除臨調/超額/預繳"
  },
  {
    id: 3,
    bank: "滙豐銀行",
    cards: ["全卡別"],
    periods: [9],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 1000,
    specialOffer: "卓越理財貴賓專屬，透過Paytax/電話繳納"
  },
  {
    id: 4,
    bank: "台新銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0, // 無最低稅額限制
    specialOffer: "需登錄活動 (2025/4/28-7/5)，透過Paytax/電話繳納，超商/行動支付/臨櫃不適用"
  },
  {
    id: 5,
    bank: "玉山銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0, // 無最低稅額限制
    specialOffer: "需登錄活動 (需於2025/7/3前)，透過Paytax/玉山Wallet繳納，悠遊付不適用，回饋與分期二選一"
  },
  {
    id: 6,
    bank: "第一銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 10000,
    specialOffer: "需登錄活動 (2025/5/1-7/3)，透過Paytax/電話繳納，公務機關平台不適用，回饋與分期二選一"
  },
  {
    id: 7,
    bank: "中國信託",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0, // 無最低稅額限制
    specialOffer: "需登錄活動，透過Paytax/電話繳納，回饋與分期二選一"
  }
];

// 便利商店繳稅選項
export const convenienceStoreOptions = [
  {
    id: 1,
    bank: "台新銀行",
    cards: ["@GoGo 卡"],
    cashbackRate: 0.06, // 6%
    cashbackLimit: 200, // 最高回饋200點 (每月)
    maxAmount: 3333, // 每月最高可回饋的金額
    notes: "需每月領券 (Richart Life App)，適用7-11/全家，回饋期限至2025/5/31"
  },
  {
    id: 2,
    bank: "台新銀行",
    cards: ["@GoGo 卡 (新戶)"],
    cashbackRate: 0.26, // 6% + 20% = 26%
    cashbackLimit: 2000, // 新戶加碼上限2000點
    maxAmount: 10000, // 可繳10000元獲得最高回饋
    notes: "需為新戶 (6個月內無台新卡)，需於5/31前申辦，並使用指定支付工具繳稅，回饋期限為核卡後90天"
  },
  {
    id: 3,
    bank: "中國信託",
    cards: ["統一企業認同卡"],
    cashbackRate: 0.03, // 3%
    cashbackLimit: 300, // 每月上限300點
    maxAmount: 10000, // icash單筆/儲值上限10000元
    notes: "可能限員工申請，需使用icash 2.0自動加值在7-11繳稅，需月消費滿3000元，回饋期限至2025/12/31"
  },
  {
    id: 4,
    bank: "富邦銀行",
    cards: ["OpenPossible 卡"],
    cashbackRate: 0.02, // 2% (1%無上限+1%上限600元/期)
    cashbackLimit: 600, // 每期上限600元
    maxAmount: 30000, // 便利商店上限
    notes: "主要針對房屋稅，所得稅適用性待確認，需在7-11使用OPEN錢包支付，需月消費滿5000元，回饋期限至2025/6/30"
  },
  {
    id: 5,
    bank: "新光銀行",
    cards: ["悠遊聯名卡"],
    cashbackRate: 0.04, // 4%
    cashbackLimit: 200, // 每季上限200元
    maxAmount: 1000, // FamiPay單筆上限1000元
    notes: "需登錄，每季限3,500名，需在全家使用FamiPay支付，需季消費滿5000元，回饋為等值禮券，回饋期限至2025/6/30"
  }
];

// 行動支付繳稅選項
export const mobilePayOptions = [
  {
    id: 1,
    name: "台灣 Pay + 兆豐信用卡/金融卡",
    cashbackAmount: "NT$100-2000 (依稅額級距)",
    requireRegistration: true,
    notes: "各級距總額度限制，需登錄",
    validUntil: "2025/6/30"
  },
  {
    id: 2,
    name: "台灣 Pay + 台企銀 Hokii 帳戶",
    cashbackAmount: "NT$150 + NT$200 現金",
    requireRegistration: true,
    notes: "各限量 3000/2000 筆, 需稅額滿 NT$1000 (加碼部分), Hokii 帳戶需為活動期間開立 (加碼部分)",
    validUntil: "2025/5/31"
  },
  {
    id: 3,
    name: "全支付 + 玉山信用卡",
    cashbackRate: 0.005, // 0.5%
    cashbackLimit: 500, // 每會員上限500點
    cashbackType: "全點",
    requireRegistration: false,
    notes: "可繳NT$100,000",
    validUntil: "2025/7/3"
  },
  {
    id: 4,
    name: "icash Pay",
    cashbackRate: 0.02, // 2%
    cashbackLimit: 100, // 每月上限100點
    cashbackType: "OPEN Point",
    requireRegistration: false,
    notes: "需前月消費滿NT$3,000，可繳NT$5,000",
    validUntil: "2025/5/31"
  }
]; 