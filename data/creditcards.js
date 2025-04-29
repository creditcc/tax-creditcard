// 2025年綜合所得稅信用卡回饋資料
// 現金回饋信用卡
export const creditCards = [
  {
    id: 1,
    name: "星展銀行信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 2,
    name: "滙豐銀行信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 3,
    name: "台新銀行信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 4,
    name: "台新 @GoGo 卡",
    specialRequirements: null,
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
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 6,
    name: "玉山銀行信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 7,
    name: "第一銀行信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 8,
    name: "中國信託信用卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 9,
    name: "中信 統一企業認同卡",
    specialRequirements: null,
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
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 10,
    name: "富邦 OpenPossible 卡",
    specialRequirements: null,
    bank: "富邦銀行",
    cashbackRate: 0.02, // 2% (1%無上限+1%上限600元/期)
    cashbackLimit: 600, // 最高加碼回饋600元
    minTaxAmount: 5000, // 需月消費滿5000元
    maxTaxAmount: 60000, // 便利商店上限
    requireRegistration: false,
    registrationLink: "https://www.fubon.com/",
    notes: "主要針對房屋稅，所得稅適用性待確認，需在7-11使用OPEN錢包支付，回饋期限至2025/6/30",
    installmentAvailable: true,
    convenienceStore: true,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 11,
    name: "新光悠遊聯名卡",
    specialRequirements: null,
    bank: "新光銀行",
    cashbackRate: 0.04, // 4%
    cashbackLimit: 200, // 每季上限200元
    minTaxAmount: 5000, // 需季消費滿5000元
    maxTaxAmount: 1000, // FamiPay單筆上限1000元
    requireRegistration: true,
    registrationLink: "https://www.skbank.com.tw/",
    notes: "需登錄，每季限3,500名，需在全家使用FamiPay支付，需季消費滿5000元，回饋為等值禮券，回饋期限至2025/6/30",
    installmentAvailable: true,
    convenienceStore: true,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 12,
    name: "土地銀行信用卡",
    specialRequirements: null,
    bank: "土地銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.landbank.com.tw/",
    notes: "可享3/6/9期零利率，無最低門檻限制",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 13,
    name: "上海商銀信用卡",
    specialRequirements: null,
    bank: "上海商銀",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 30000,
    maxTaxAmount: 5000000,
    requireRegistration: true,
    registrationLink: "https://www.scsb.com.tw/",
    notes: "可享3/6/12期零利率，適用金額3萬~500萬",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 14,
    name: "聯邦銀行信用卡",
    specialRequirements: null,
    bank: "聯邦銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 6000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.ubot.com.tw/",
    notes: "可享3/6期零利率(稅額6千起)，及12期零利率(稅額6萬起)",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 15,
    name: "華南銀行信用卡",
    specialRequirements: null,
    bank: "華南銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.hncb.com.tw/",
    notes: "領航會員或2025年信用卡新戶可享6/12期零利率，領航會員需300萬資產",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 16,
    name: "台灣企銀信用卡",
    specialRequirements: null,
    bank: "台灣企銀",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 3000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.tbb.com.tw/",
    notes: "可享3/6期零利率，透過台灣Pay可享9期零利率，最低門檻3000元",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 17,
    name: "永豐銀行信用卡",
    specialRequirements: null,
    bank: "永豐銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://bank.sinopac.com/",
    notes: "永傳/永富世界卡可享6期零利率，財富管理客戶可享額外優惠",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 18,
    name: "合作金庫信用卡",
    specialRequirements: null,
    bank: "合作金庫",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 3000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.tcb-bank.com.tw/",
    notes: "可享3/6期零利率，需透過台灣Pay支付，最低門檻3000元",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 19,
    name: "國泰世華信用卡",
    specialRequirements: null,
    bank: "國泰世華",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 3000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.cathaybk.com.tw/",
    notes: "可享3/6期零利率，回饋為邀請制，最低門檻3000元",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 20,
    name: "陽信銀行信用卡",
    specialRequirements: null,
    bank: "陽信銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 3000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.sunnybank.com.tw/",
    notes: "可享3/6期零利率，最低門檻3000元",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 21,
    name: "兆豐銀行信用卡",
    specialRequirements: null,
    bank: "兆豐銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.megabank.com.tw/",
    notes: "可享3期零利率，可透過台灣Pay支付，無金額限制",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 22,
    name: "彰化銀行信用卡",
    specialRequirements: null,
    bank: "彰化銀行",
    cashbackRate: 0.0,
    cashbackLimit: 0,
    minTaxAmount: 3000,
    maxTaxAmount: 0,
    requireRegistration: true,
    registrationLink: "https://www.bankchb.com/",
    notes: "可享3期零利率，可透過台灣Pay支付，最低門檻3000元",
    installmentAvailable: true,
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 23,
    name: "樂天銀行御璽卡",
    specialRequirements: "年費3000元",
    bank: "樂天銀行",
    cashbackRate: 0.022, // Approx. 2.2% from 18元/哩
    cashbackLimit: 2500, // Based on 御璽卡 lower tier
    minTaxAmount: 0, // Annual fee is card cost, not tax threshold
    maxTaxAmount: 45000, // Based on 御璽卡 limit reach
    requireRegistration: false, // Not explicitly mentioned as required for the reward itself
    registrationLink: "https://www.card.rakuten.com.tw/corp/campaign/cpn.xhtml?code=2249",
    notes: "回饋為哩程 (18元/哩，表格估計約 2.2%)。御璽卡年費3000元，回饋上限2500元哩程(需繳稅約4.5萬)；無限卡年費15000元，回饋上限5500元哩程(需繳稅約9.9萬)。回饋與分期不可共用。活動連結: https://www.card.rakuten.com.tw/corp/campaign/cpn.xhtml?code=2249",
    installmentAvailable: true, // Assuming installments available, but not combinable with miles
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 24,
    name: "上海商銀信用卡",
    specialRequirements: null,
    bank: "上海商銀",
    cashbackRate: 0.005, // 0.5%
    cashbackLimit: 500,
    minTaxAmount: 0, // Registration is condition, not amount threshold
    maxTaxAmount: 100000, // 刷10萬
    requireRegistration: true,
    registrationLink: "https://www.scsb.com.tw/content/card/news_1140401TAX.html",
    notes: "0.5%現金回饋，上限500元(需繳稅10萬)，與房屋稅共用額度。需登錄(無名額)。後續6-8月消費再享5%回饋(條件詳見活動)。回饋與分期不可共用。活動連結: https://www.scsb.com.tw/content/card/news_1140401TAX.html",
    installmentAvailable: true, // From initial data (ID 13), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 25,
    name: "聯邦銀行吉鶴卡",
    specialRequirements: null,
    bank: "聯邦銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0, // Card specific condition
    maxTaxAmount: 0, // No limit
    requireRegistration: true, // Implied by overall registration & NNB limit
    registrationLink: "https://activity.ubot.com.tw/aws_act/2025/2025incometax/index.htm",
    notes: "吉鶴卡享0.2%現金回饋無上限。需登錄(活動總名額1.5萬名)。回饋與分期不可共用。後續7-8月消費另有回饋(詳見活動)。活動連結: https://activity.ubot.com.tw/aws_act/2025/2025incometax/index.htm",
    installmentAvailable: true, // From initial data (ID 14), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 26,
    name: "聯邦銀行 NNB新戶加碼",
    specialRequirements: "NNB新戶加碼",
    bank: "聯邦銀行",
    cashbackRate: 0.003, // 加碼 0.3%
    cashbackLimit: 5000,
    minTaxAmount: 0, // NNB account is condition
    maxTaxAmount: 1666667, // 刷166萬 (approx. for 5000 / 0.003)
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://activity.ubot.com.tw/aws_act/2025/2025incometax/index.htm",
    notes: "需為新開立NNB數位帳戶者，享額外加碼0.3%現金回饋，上限5000元(需繳稅約166.7萬)。限1萬名。需登錄(活動總名額1.5萬名)。回饋與分期不可共用。後續7-8月消費另有回饋(詳見活動)。活動連結: https://activity.ubot.com.tw/aws_act/2025/2025incometax/index.htm",
    installmentAvailable: true, // From initial data (ID 14), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 27,
    name: "玉山銀行星宇航空聯名卡",
    specialRequirements: null,
    bank: "玉山銀行",
    cashbackRate: 0.0025, // Approx. 0.25% from 200元/哩 (using 0.5元/哩 estimate from table)
    cashbackLimit: 50000, // Estimate: 10萬哩 * 0.5元/哩
    minTaxAmount: 0,
    maxTaxAmount: 20000000, // 刷2000萬
    requireRegistration: false, // Not mentioned
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "回饋為星宇航空哩程 (200元/哩，表格估計約0.25%)。回饋上限10萬哩(需繳稅2000萬)。回饋與分期不可共用。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable with miles
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 28,
    name: "星展銀行信用卡",
    specialRequirements: "豐盛理財會員",
    bank: "星展銀行",
    cashbackRate: 0.0038, // 0.38% for 豐盛理財
    cashbackLimit: 18000, // 1.8萬
    minTaxAmount: 0, // Asset level is condition, not tax amount
    maxTaxAmount: 4736842, // 刷473萬 (approx.)
    requireRegistration: false, // Not mentioned, but likely implied by membership status
    registrationLink: "https://www.ctee.com.tw/news/20250421701612-430301", // Link to news, not direct activity
    notes: "限豐盛理財會員(資產需達300萬)。享0.38%現金回饋，上限1.8萬元(需繳稅約473萬)。回饋與分期可共用。活動詳情需洽星展。新聞來源: https://www.ctee.com.tw/news/20250421701612-430301",
    installmentAvailable: true, // Yes, and combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 29,
    name: "星展銀行信用卡",
    specialRequirements: "豐盛私人客戶",
    bank: "星展銀行",
    cashbackRate: 0.0068, // 0.68% for 豐盛私人
    cashbackLimit: 125000, // 12.5萬
    minTaxAmount: 0, // Asset level is condition
    maxTaxAmount: 18382353, // 刷1838萬 (approx.)
    requireRegistration: false, // Not mentioned, implied by membership
    registrationLink: "https://www.ctee.com.tw/news/20250421701612-430301", // Link to news
    notes: "限豐盛私人客戶(資產需達3000萬)。享0.68%現金回饋，上限12.5萬元(需繳稅約1838萬)。回饋與分期可共用。活動詳情需洽星展。新聞來源: https://www.ctee.com.tw/news/20250421701612-430301",
    installmentAvailable: true, // Yes, and combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 30,
    name: "玉山銀行信用卡",
    specialRequirements: "一般卡",
    bank: "玉山銀行",
    cashbackRate: 0.002, // 0.2% for "不限" (assuming this means general customers or lowest tier)
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "一般卡(或無特別會員身分)享0.2%現金回饋，無上限。回饋與分期不可共用。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 31,
    name: "玉山銀行信用卡",
    specialRequirements: "登峰/菁英理財會員",
    bank: "玉山銀行",
    cashbackRate: 0.0035, // 0.35%
    cashbackLimit: 100000, // 10萬點 (assuming 1點=1元 for limit calculation)
    minTaxAmount: 0, // Asset level is condition
    maxTaxAmount: 28571429, // 刷2857萬 (approx.)
    requireRegistration: false, // Implied by membership
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "登峰/菁英理財會員(資產需達100萬/300萬)享0.35%回饋(點數)，上限10萬點(需繳稅約2857萬)。回饋與分期不可共用。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 32,
    name: "玉山銀行信用卡",
    specialRequirements: "私銀會員",
    bank: "玉山銀行",
    cashbackRate: 0.004, // 0.4%
    cashbackLimit: 150000, // 15萬點 (assuming 1點=1元 for limit calculation)
    minTaxAmount: 0, // Asset level is condition
    maxTaxAmount: 37500000, // 刷3750萬
    requireRegistration: false, // Implied by membership
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "私銀會員享0.4%回饋(點數)，上限15萬點(需繳稅3750萬)。回饋與分期不可共用。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable with cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 33,
    name: "永豐銀行永傳世界卡",
    specialRequirements: null,
    bank: "永豐銀行",
    cashbackRate: 0.0038, // 0.38%
    cashbackLimit: 200000, // 20萬
    minTaxAmount: 0, // Registration is condition
    maxTaxAmount: 52631579, // 刷5263萬 (approx.)
    requireRegistration: true, // 需登錄
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "永傳世界卡享0.38%現金回饋，上限20萬元(需繳稅約5263萬)。需登錄(無名額限制)。回饋可與6期零利率分期共用。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // Yes, and 6-期 combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 34,
    name: "國泰世華信用卡",
    specialRequirements: "邀請制, 稅額30萬+",
    bank: "國泰世華",
    cashbackRate: 0.003, // 0.3%
    cashbackLimit: 50000, // 共用上限? Table ambiguous. Assuming 5000 applies to both tiers as max? Check source. Assuming limit shared.
    minTaxAmount: 300000, // 30萬
    maxTaxAmount: 1666667, // Approx. 5000 / 0.003
    requireRegistration: false, // Invitation based
    registrationLink: "https://www.cathaybk.com.tw/cathaybk/personal/campaigns/ebanking/2025hightax/",
    notes: "邀請制。繳稅額滿30萬(含)以上享0.3%現金回饋。回饋上限推測為5000元(需繳稅約167萬，上限資訊待確認)。回饋與分期可共用。活動連結: https://www.cathaybk.com.tw/cathaybk/personal/campaigns/ebanking/2025hightax/",
    installmentAvailable: true, // Yes, and combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 35,
    name: "國泰世華信用卡",
    specialRequirements: "邀請制, 稅額100萬+",
    bank: "國泰世華",
    cashbackRate: 0.0035, // 0.35%
    cashbackLimit: 5000, // Assuming shared limit, see note above
    minTaxAmount: 1000000, // 100萬
    maxTaxAmount: 1428571, // Approx. 5000 / 0.0035. This max amount is lower than min amount, suggesting the 5000 limit might be *per tier* or inaccurate. Re-checking table: 5000元(刷142萬). Okay, max tax amount is for the 0.35% tier.
    requireRegistration: false, // Invitation based
    registrationLink: "https://www.cathaybk.com.tw/cathaybk/personal/campaigns/ebanking/2025hightax/",
    notes: "邀請制。繳稅額滿100萬(含)以上享0.35%現金回饋。回饋上限5000元(需繳稅約142萬)。回饋與分期可共用。活動連結: https://www.cathaybk.com.tw/cathaybk/personal/campaigns/ebanking/2025hightax/",
    installmentAvailable: true, // Yes, and combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 36,
    name: "富邦銀行 J卡",
    specialRequirements: null,
    bank: "富邦銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 2000,
    minTaxAmount: 0, // Card specific
    maxTaxAmount: 1000000, // 刷100萬
    requireRegistration: false, // Not mentioned
    registrationLink: "https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=E000042",
    notes: "限富邦J卡。享0.2%現金回饋，上限2000元(需繳稅100萬)。回饋與分期共用狀態未明。活動連結: https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=E000042",
    installmentAvailable: true, // From initial data (ID 23/24), combinability unknown
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 37,
    name: "富邦銀行信用卡",
    specialRequirements: "本行存戶且稅額30萬+",
    bank: "富邦銀行",
    cashbackRate: 0.0036, // 0.36%
    cashbackLimit: 80000, // 8萬
    minTaxAmount: 300000, // 30萬
    maxTaxAmount: 22222222, // 刷2222萬 (approx.)
    requireRegistration: false, // Implied by customer status
    registrationLink: "https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=E000042",
    notes: "限本行存戶且繳稅額滿30萬。享0.36%現金回饋，上限8萬元(需繳稅約2222萬)。回饋與分期共用狀態未明。活動連結: https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=E000042",
    installmentAvailable: true, // From initial data (ID 23/24), combinability unknown
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 38,
    name: "華南銀行信用卡",
    specialRequirements: "領航會員-夢享家",
    bank: "華南銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 2000,
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 1000000, // 刷100萬
    requireRegistration: false, // Implied by membership
    registrationLink: "https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    notes: "限領航會員-夢享家。享0.2%現金回饋，上限2000元(需繳稅100萬)。回饋與分期不可共用。活動連結: https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    installmentAvailable: true, // From initial data (ID 15), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 15)
  },
  {
    id: 39,
    name: "華南銀行信用卡",
    specialRequirements: "領航會員-理享家",
    bank: "華南銀行",
    cashbackRate: 0.0025, // 0.25%
    cashbackLimit: 30000, // 3萬
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 12000000, // 刷1200萬
    requireRegistration: false, // Implied by membership
    registrationLink: "https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    notes: "限領航會員-理享家。享0.25%現金回饋，上限3萬元(需繳稅1200萬)。回饋與分期不可共用。活動連結: https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    installmentAvailable: true, // From initial data (ID 15), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 15)
  },
  {
    id: 40,
    name: "華南銀行信用卡",
    specialRequirements: "領航會員-獨享家",
    bank: "華南銀行",
    cashbackRate: 0.003, // 0.3%
    cashbackLimit: 50000, // 5萬
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 16666667, // 刷1666萬 (approx.)
    requireRegistration: false, // Implied by membership
    registrationLink: "https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    notes: "限領航會員-獨享家。享0.3%現金回饋，上限5萬元(需繳稅約1667萬)。回饋與分期不可共用。活動連結: https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    installmentAvailable: true, // From initial data (ID 15), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 15)
  },
  {
    id: 41,
    name: "華南銀行信用卡",
    specialRequirements: "領航會員-睿享家",
    bank: "華南銀行",
    cashbackRate: 0.0035, // 0.35%
    cashbackLimit: 100000, // 10萬
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 28571429, // 刷2857萬 (approx.)
    requireRegistration: false, // Implied by membership
    registrationLink: "https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    notes: "限領航會員-睿享家。享0.35%現金回饋，上限10萬元(需繳稅約2857萬)。回饋與分期不可共用。活動連結: https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    installmentAvailable: true, // From initial data (ID 15), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 15)
  },
  {
    id: 42,
    name: "合作金庫信用卡",
    specialRequirements: "一般卡",
    bank: "合作金庫",
    cashbackRate: 0.0018, // 0.18%
    cashbackLimit: 30000, // 共用上限? Assuming shared across tiers based on text format.
    minTaxAmount: 0, // Card tier is condition
    maxTaxAmount: 16666667, // 刷1666萬 (approx.)
    requireRegistration: true, // 限1萬名 implies registration
    registrationLink: "https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    notes: "限一般卡。享0.18%現金回饋。回饋上限可能為3萬元(需繳稅約1667萬，上限資訊待確認)。活動總限1萬名。回饋與分期不可共用。活動連結: https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    installmentAvailable: true, // From initial data (ID 18), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 18), esp. if using 台灣Pay
  },
  {
    id: 43,
    name: "合作金庫信用卡",
    specialRequirements: "中台卡/國防卡",
    bank: "合作金庫",
    cashbackRate: 0.0025, // 0.25%
    cashbackLimit: 30000, // Assuming shared limit
    minTaxAmount: 0, // Card tier is condition
    maxTaxAmount: 12000000, // 刷1200萬
    requireRegistration: true, // 限1萬名 implies registration
    registrationLink: "https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    notes: "限中台卡/國防卡。享0.25%現金回饋。回饋上限可能為3萬元(需繳稅1200萬，上限資訊待確認)。活動總限1萬名。回饋與分期不可共用。活動連結: https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    installmentAvailable: true, // From initial data (ID 18), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 18)
  },
  {
    id: 44,
    name: "合作金庫信用卡",
    specialRequirements: "頂級卡",
    bank: "合作金庫",
    cashbackRate: 0.0036, // 0.36%
    cashbackLimit: 100000, // 10萬 for top tier
    minTaxAmount: 0, // Card tier is condition
    maxTaxAmount: 27777778, // 刷2777萬 (approx.)
    requireRegistration: true, // 限1萬名 implies registration
    registrationLink: "https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    notes: "限頂級卡。享0.36%現金回饋，上限10萬元(需繳稅約2778萬)。活動總限1萬名。回饋與分期不可共用。活動連結: https://www.tcb-bank.com.tw/personal-banking/credit-card/discount/event/income_tax_12",
    installmentAvailable: true, // From initial data (ID 18), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 未明確說明可共用 // From initial data (ID 18)
  },
  {
    id: 45,
    name: "永豐銀行信用卡",
    specialRequirements: "永聚會員",
    bank: "永豐銀行",
    cashbackRate: 0.0015, // 0.15%
    cashbackLimit: 5000,
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 3333333, // 刷333萬 (approx.)
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "限永聚會員。享0.15%現金回饋，上限5千元(需繳稅約333萬)。限2000名。回饋與分期共用條件不明(圖示為橘色驚嘆號)。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // From initial data (ID 18 - 永聚3期), combinability unclear for cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 46,
    name: "永豐銀行信用卡",
    specialRequirements: "永富會員",
    bank: "永豐銀行",
    cashbackRate: 0.0025, // 0.25%
    cashbackLimit: 50000, // 5萬
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 20000000, // 刷2000萬
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "限永富會員。享0.25%現金回饋，上限5萬元(需繳稅2000萬)。限1200名。回饋與分期共用條件不明(圖示為橘色驚嘆號)。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // From initial data (ID 17 - 永富6期), combinability unclear for cashback
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 47,
    name: "永豐銀行信用卡",
    specialRequirements: "永傳會員",
    bank: "永豐銀行",
    cashbackRate: 0.0038, // 0.38%
    cashbackLimit: 200000, // 20萬
    minTaxAmount: 0, // Membership level is condition
    maxTaxAmount: 52631579, // 刷5263萬 (approx.)
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "限永傳會員。享0.38%現金回饋，上限20萬元(需繳稅約5263萬)。限800名。僅永傳會員的回饋可與分期共用。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // Yes, and combinable (as per orange icon note)
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: true // 明確說明可共用
  },
  {
    id: 48,
    name: "玉山銀行信用卡",
    specialRequirements: "一般卡 Tier 2",
    bank: "玉山銀行",
    cashbackRate: 0.001, // 0.1%
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "一般卡享0.1%現金回饋，無上限。回饋與分期不可共用。(此處與上方0.2%一般卡資訊來源相同但回饋率不同，請確認活動細節)。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 49,
    name: "玉山銀行 U Bear卡 / Pi拍錢包卡等",
    specialRequirements: "原 Unicard",
    bank: "玉山銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0, // Card specific condition
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "限 U Bear卡/Pi拍錢包卡等 (原Unicard類別)。享0.2%現金回饋，無上限。回饋與分期不可共用。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 50,
    name: "玉山銀行信用卡",
    specialRequirements: "稅額100萬+",
    bank: "玉山銀行",
    cashbackRate: 0.003, // 0.3%
    cashbackLimit: 100000, // 10萬點 (assuming 1點=1元)
    minTaxAmount: 1000000, // 100萬稅額
    maxTaxAmount: 33333333, // 刷3333萬 (approx.)
    requireRegistration: false, // Not mentioned
    registrationLink: "https://event.esunbank.com.tw/credit/tax/index.html",
    notes: "繳稅額達100萬享0.3%回饋(點數)，上限10萬點(需繳稅約3333萬)。回饋與分期不可共用。(此條件與理財會員等級回饋相似，請確認活動細節)。活動連結: https://event.esunbank.com.tw/credit/tax/index.html",
    installmentAvailable: true, // From initial data (ID 6), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 51,
    name: "永豐銀行永富世界卡",
    specialRequirements: null,
    bank: "永豐銀行",
    cashbackRate: 0.0025, // 0.25%
    cashbackLimit: 50000, // 5萬
    minTaxAmount: 0, // Registration is condition
    maxTaxAmount: 20000000, // 刷2000萬
    requireRegistration: true, // 需登錄
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "永富世界卡享0.25%現金回饋，上限5萬元(需繳稅2000萬)。需登錄(無名額限制)。回饋與分期不可共用。(此條目與永富會員回饋相似)。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // From initial data (ID 17), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 52,
    name: "華南銀行信用卡",
    specialRequirements: "消費滿額贈點",
    bank: "華南銀行",
    cashbackRate: 0.0, // Rate varies significantly, difficult to represent simply
    cashbackLimit: 2500, // Max points value = 2500元
    minTaxAmount: 50000, // Lowest threshold starts at 5萬 tax
    maxTaxAmount: 1000000, // Applies up to 100萬+ tax
    requireRegistration: false, // Condition is spending, not registration? Check link. Assume false for now.
    registrationLink: "https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    notes: "需3個月內消費滿10萬。繳稅5~50萬贈5000點(=250元, Max 0.5%); 50~100萬贈1萬點(=500元, Max 0.1%); 100萬以上贈5萬點(=2500元, Max 0.25%)。回饋上限為2500元。回饋與分期不可共用。活動連結: https://www.hncb.com.tw/wps/portal/HNCB/card/event/TAXCARD",
    installmentAvailable: true, // From initial data (ID 15), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 15)
  },
  {
    id: 53,
    name: "第一銀行信用卡",
    specialRequirements: null,
    bank: "第一銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 2000,
    minTaxAmount: 100000, // 10萬以上
    maxTaxAmount: 1000000, // 刷100萬
    requireRegistration: false, // Not mentioned (but likely needed, check link)
    registrationLink: "https://card.firstbank.com.tw/sites/card/zh_TW/1565707087044",
    notes: "繳稅額10萬以上享0.2%現金回饋，上限2000元(需繳稅100萬)。回饋與分期共用狀態未明。活動連結: https://card.firstbank.com.tw/sites/card/zh_TW/1565707087044",
    installmentAvailable: true, // From initial data (ID 7), combinability unknown
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 未明確說明可共用
  },
  {
    id: 54,
    name: "中信和泰聯名卡",
    specialRequirements: null,
    bank: "中國信託",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    notes: "和泰聯名卡享0.2%和泰Points回饋，無上限。回饋與分期不可共用。活動連結: https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    installmentAvailable: true, // From initial data (ID 8), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 55,
    name: "中信中華航空聯名卡",
    specialRequirements: null,
    bank: "中國信託",
    cashbackRate: 0.0017, // Approx 0.17% (using 0.52元/哩 estimate from table)
    cashbackLimit: 0, // 無上限 (for base rate)
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "",
    notes: "回饋為華航哩程 (300元/哩，表格估計約0.17%)，無上限。稅額達1000萬有額外哩程。回饋與分期不可共用。",
    installmentAvailable: true, // From initial data (ID 8), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 56,
    name: "永豐銀行幣倍卡",
    specialRequirements: null,
    bank: "永豐銀行",
    cashbackRate: 0.0015, // 0.15%
    cashbackLimit: 1000,
    minTaxAmount: 0, // Registration is condition
    maxTaxAmount: 666667, // 刷66萬 (approx.)
    requireRegistration: true, // 需登錄 (1萬名)
    registrationLink: "", // Link to review, not activity
    notes: "幣倍卡享0.15%現金回饋，上限1000元(需繳稅約66.7萬)。需登錄(限1萬名)。回饋與分期不可共用。",
    installmentAvailable: true, // From initial data (ID 17), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 57,
    name: "永豐銀行信用卡",
    specialRequirements: "新戶/舊戶回饋",
    bank: "永豐銀行",
    cashbackRate: 0.0015, // 0.15%
    cashbackLimit: 500,
    minTaxAmount: 100000, // 10萬以上
    maxTaxAmount: 333333, // 刷33萬 (approx.)
    requireRegistration: true, // 需登錄 (4000名)
    registrationLink: "https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    notes: "限2024年未用永豐信用卡繳稅者，且稅額10萬以上。享0.15%現金回饋，上限500元(需繳稅約33.3萬)。需登錄(限4000名)。回饋與分期不可共用。活動連結: https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/831654557.html",
    installmentAvailable: true, // From initial data (ID 17), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 58,
    name: "中信LINEPay信用卡",
    specialRequirements: null,
    bank: "中國信託",
    cashbackRate: 0.001, // 0.1%
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    notes: "LINE Pay信用卡/簽帳金融卡享0.1% LINE Points回饋，無上限。回饋與分期不可共用。活動連結: https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    installmentAvailable: true, // From initial data (ID 8), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用 // Direct card usage, LINE Pay app payment might differ
  },
  {
    id: 59,
    name: "中信商旅鈦金卡",
    specialRequirements: null,
    bank: "中國信託",
    cashbackRate: 0.001, // 0.1% (Assuming same rate as LINE Pay card based on grouping)
    cashbackLimit: 0, // 無上限
    minTaxAmount: 0,
    maxTaxAmount: 0,
    requireRegistration: false, // Not mentioned
    registrationLink: "https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    notes: "商旅鈦金卡享0.1%現金回饋，無上限。回饋與分期不可共用。活動連結: https://mkt.ctbcbank.com/recent/202507/N2025041400015_01-7/index.html",
    installmentAvailable: true, // From initial data (ID 8), but not combinable
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
  {
    id: 60,
    name: "彰化銀行信用卡",
    specialRequirements: "早鳥",
    bank: "彰化銀行",
    cashbackRate: 0.001, // 0.1%
    cashbackLimit: 1200,
    minTaxAmount: 0, // Condition is "早鳥" + registration
    maxTaxAmount: 1200000, // 刷120萬
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://www.bankchb.com/frontend/bonusDetail.jsp?id=3163",
    notes: "早鳥享0.1%現金回饋，上限1200元(需繳稅120萬)。限2000名。回饋與分期不可共用。活動連結: https://www.bankchb.com/frontend/bonusDetail.jsp?id=3163",
    installmentAvailable: true, // From initial data (ID 22), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 22)
  },
  {
    id: 61,
    name: "彰化銀行信用卡",
    specialRequirements: "VIP",
    bank: "彰化銀行",
    cashbackRate: 0.002, // 0.2%
    cashbackLimit: 30000, // 3萬
    minTaxAmount: 0, // Condition is "VIP" + registration
    maxTaxAmount: 15000000, // 刷1500萬
    requireRegistration: true, // Limited spots imply registration
    registrationLink: "https://www.bankchb.com/frontend/bonusDetail.jsp?id=3163",
    notes: "VIP客戶享0.2%現金回饋，上限3萬元(需繳稅1500萬)。限1000名。回饋與分期不可共用。活動連結: https://www.bankchb.com/frontend/bonusDetail.jsp?id=3163",
    installmentAvailable: true, // From initial data (ID 22), but not combinable
    convenienceStore: false,
    mobilePay: true,
    rebateWithInstallments: false // 明確說明不可共用 // From initial data (ID 22)
  },
  {
    id: 23,
    name: "樂天銀行無限卡",
    specialRequirements: "年費15000元",
    bank: "樂天銀行",
    cashbackRate: 0.022, 
    cashbackLimit: 5500, 
    minTaxAmount: 0, 
    maxTaxAmount: 99000, 
    requireRegistration: false, // Not explicitly mentioned as required for the reward itself
    registrationLink: "https://www.card.rakuten.com.tw/corp/campaign/cpn.xhtml?code=2249",
    notes: "回饋為哩程 (18元/哩，表格估計約 2.2%)。御璽卡年費3000元，回饋上限2500元哩程(需繳稅約4.5萬)；無限卡年費15000元，回饋上限5500元哩程(需繳稅約9.9萬)。回饋與分期不可共用。活動連結: https://www.card.rakuten.com.tw/corp/campaign/cpn.xhtml?code=2249",
    installmentAvailable: true, // Assuming installments available, but not combinable with miles
    convenienceStore: false,
    mobilePay: false,
    rebateWithInstallments: false // 明確說明不可共用
  },
];

// 分期付款選項
export const installmentOptions = [
  {
    id: 1,
    bank: "星展銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0, // 0%利率
    handlingFee: 0, // 0手續費
    minAmount: 500000,
    specialRequirements: "需登錄活動 (2025/5/6-7/3)，透過Paytax/電話繳納，排除臨調/超額/預繳"
  },
  {
    id: 2,
    bank: "星展銀行",
    cards: ["全卡別"],
    periods: [12],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 1000000,
    specialRequirements: "需登錄活動 (2025/5/6-7/3)，透過Paytax/電話繳納，排除臨調/超額/預繳"
  },
  {
    id: 3,
    bank: "滙豐銀行",
    cards: ["全卡別 (卓越理財貴賓)"],
    periods: [3, 6, 9],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 1000,
    specialRequirements: "卓越理財貴賓專屬，透過Paytax/電話繳納"
  },
  {
    id: 4,
    bank: "土地銀行",
    cards: ["全卡別"],
    periods: [3, 6, 9],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "無門檻限制"
  },
  {
    id: 5,
    bank: "上海商銀",
    cards: ["全卡別"],
    periods: [3, 6, 12],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 30000,
    maxAmount: 5000000,
    specialRequirements: "適用金額3萬~500萬"
  },
  {
    id: 6,
    bank: "聯邦銀行",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 6000,
    specialRequirements: "最低門檻6000元"
  },
  {
    id: 7,
    bank: "聯邦銀行",
    cards: ["全卡別"],
    periods: [12],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 60000,
    specialRequirements: "最低門檻6萬元"
  },
  {
    id: 8,
    bank: "華南銀行",
    cards: ["領航會員或2025年信用卡新戶"],
    periods: [6, 12],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "領航會員需300萬資產，無金額限制"
  },
  {
    id: 9,
    bank: "華南銀行",
    cards: ["全卡別 + 華銀支付"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "需透過台灣Pay支付"
  },
  {
    id: 10,
    bank: "台灣企銀",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "最低門檻3000元"
  },
  {
    id: 11,
    bank: "台灣企銀",
    cards: ["全卡別 + 台灣Pay"],
    periods: [9],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "9期零利率需用台灣Pay，最低門檻3000元"
  },
  {
    id: 12,
    bank: "玉山銀行",
    cards: ["全卡別"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "理財會員可享回饋與分期共用"
  },
  {
    id: 13,
    bank: "中國信託",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "無金額限制"
  },
  {
    id: 14,
    bank: "新光銀行",
    cards: ["全卡別", "含鼎鑽財富無限卡"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "無金額限制"
  },
  {
    id: 15,
    bank: "永豐銀行",
    cards: ["永傳/永富世界卡"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "僅永傳卡有回饋共用"
  },
  {
    id: 16,
    bank: "永豐銀行",
    cards: ["永傳 (財富管理)"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "限800名，僅永傳卡有回饋共用"
  },
  {
    id: 17,
    bank: "永豐銀行",
    cards: ["永富 (財富管理)"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "限600名"
  },
  {
    id: 18,
    bank: "永豐銀行",
    cards: ["永聚 (財富管理)"],
    periods: [3],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "限800名"
  },
  {
    id: 19,
    bank: "合作金庫",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "需透過台灣Pay支付，最低門檻3000元"
  },
  {
    id: 20,
    bank: "國泰世華",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "回饋為邀請制，最低門檻3000元"
  },
  {
    id: 21,
    bank: "陽信銀行",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "最低門檻3000元"
  },
  {
    id: 22,
    bank: "第一銀行",
    cards: ["全卡別"],
    periods: [3, 6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 10000,
    specialRequirements: "最低門檻10000元"
  },
  {
    id: 23,
    bank: "富邦銀行",
    cards: ["全卡別"],
    periods: [3],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "無金額限制"
  },
  {
    id: 24,
    bank: "富邦銀行",
    cards: ["全卡別 (存戶)"],
    periods: [6],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 300000,
    specialRequirements: "需為存戶，最低門檻30萬元"
  },
  {
    id: 25,
    bank: "兆豐銀行",
    cards: ["全卡別"],
    periods: [3],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 0,
    specialRequirements: "可透過台灣Pay支付，無金額限制"
  },
  {
    id: 26,
    bank: "彰化銀行",
    cards: ["全卡別"],
    periods: [3],
    interestRate: 0,
    handlingFee: 0,
    minAmount: 3000,
    specialRequirements: "可透過台灣Pay支付，最低門檻3000元"
  }
];

// 超商繳費
export const convenienceStoreOptions = [
  {
    id: 4, // foreign key
    bank: "台新銀行",
    cards: ["@GoGo 卡"],
    cashbackRate: 0.06, // 6%
    cashbackLimit: 200, // 最高回饋200點 (每月)
    maxAmount: 3333, // 每月最高可回饋的金額
    notes: "需每月領券 (Richart Life App)，適用7-11/全家，回饋期限至2025/5/31",
    chains: ["7-11", "family"]
  },
  {
    id: 5,
    bank: "台新銀行",
    cards: ["@GoGo 卡 (新戶)"],
    cashbackRate: 0.26, // 6% + 20% = 26%
    cashbackLimit: 2000, // 新戶加碼上限2000點
    maxAmount: 10000, // 可繳10000元獲得最高回饋
    notes: "需為新戶 (6個月內無台新卡)，需於5/31前申辦，並使用指定支付工具繳稅，回饋期限為核卡後90天",
    chains: ["7-11", "family"]
  },
  {
    id: 9,
    bank: "中國信託",
    cards: ["統一企業認同卡"],
    cashbackRate: 0.03, // 3%
    cashbackLimit: 300, // 每月上限300點
    maxAmount: 10000, // icash單筆/儲值上限10000元
    notes: "可能限員工申請，需使用icash 2.0自動加值在7-11繳稅，需月消費滿3000元，回饋期限至2025/12/31",
    chains: ["7-11"]
  },
  {
    id: 10,
    bank: "富邦銀行",
    cards: ["OpenPossible 卡"],
    cashbackRate: 0.02, // 2% (1%無上限+1%上限600元/期)
    cashbackLimit: 600, // 每期上限600元
    maxAmount: 60000, // 便利商店上限
    notes: "(1%無上限+1%上限600元/期，主要針對房屋稅，所得稅適用性待確認，需在7-11使用OPEN錢包支付，需月消費滿5000元，回饋期限至2025/6/30",
    chains: ["7-11"]
  },
  {
    id: 11,
    bank: "新光銀行",
    cards: ["悠遊聯名卡"],
    cashbackRate: 0.04, // 4%
    cashbackLimit: 200, // 每季上限200元
    maxAmount: 1000, // FamiPay單筆上限1000元
    notes: "FamiPay單筆上限1000元，需登錄，每季限3,500名，需在全家使用FamiPay支付，需季消費滿5000元，回饋為等值禮券，回饋期限至2025/6/30",
    chains: ["family"]
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