const isProduction = process.env.NODE_ENV === 'production';
const appVersion = process.env.APP_VERSION;
const appCoinType = process.env.APP_COIN_TYPE;
const baseURL = isProduction
  ? `https://explorer-web.api.btc.com/${appVersion}/${appCoinType}/`
  : `https://explorer-web.api.btc.com/${appVersion}/${appCoinType}/`;

//const socketIOURL = 'http://54.169.197.219:17002';
const socketIOURL = 'https://explorer-web.api.btc.com';
//wss://explorer-web.api.btc.com/socket.io/?EIO=3&transport=websocket

export { isProduction, baseURL, socketIOURL };
