import flatten from 'flat';
const commonMessage = {
  common: {
    notFoundTip: '对不起，您当前访问的页面不存在',
    goHome: '首页',
    goBack: '回退',
    viewAll: '全部',
    pageTitle: {
      blocks: '区块',
      blockInformation: '区块详情',
      transactions: '交易',
      transactionInformation: '交易详情',
      accounts: '以太币账户排行',
      accountInformation: '账户详情',
      tokens: 'ERC20代币',
      tokenInformation: '代币详情'
    },
    notFoundTip: '对不起，您当前访问的页面不存在',
    serverErrorTip: '对不起, 服务器出错',
    noResultTip: '对不起, 您要查询的数据不存在',
    noData: '暂无数据'
  }
};
const commonMessageFlatten = flatten(commonMessage);
export default commonMessageFlatten;
