import flatten from 'flat';
const commonMessage = {
  common: {
    notFoundTip: 'Sorry, the page you are looking for does not exist',
    goHome: 'Home',
    goBack: 'Go back',
    viewAll: 'view all',
    pageTitle: {
      blocks: 'Blocks',
      blockInformation: 'Block Information',
      transactions: 'Transactions',
      transactionInformation: 'Transaction Information',
      accounts: 'Top Ethereum Accounts',
      accountInformation: 'Account Information',
      tokens: 'Ethereum Tokens (ERC-20)',
      tokenInformation: 'Token Information'
    },
    notFoundTip: 'Sorry, the page you are looking for does not exist',
    serverErrorTip: 'Sorry, server error',
    noResultTip: 'Sorry, no search results',
    noData: 'No data'
  }
};
const commonMessageFlatten = flatten(commonMessage);
export default commonMessageFlatten;
