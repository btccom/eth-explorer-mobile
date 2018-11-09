import appLocaleData from 'react-intl/locale-data/en';
import common from './en-US.common';
import pages from './en-US.pages';

window.appLocale = {
  // 合并所有 messages, 加入组件的 messages
  messages: Object.assign({}, common, pages),

  // locale
  locale: 'en-US',

  // react-intl locale-data
  data: appLocaleData

  // 自定义 formates
  // formats: {
  //   date: {
  //     normal: {
  //       hour12: false,
  //       year: 'numeric',
  //       month: 'short',
  //       day: '2-digit',
  //       hour: '2-digit',
  //       minute: '2-digit'
  //     }
  //   },
  //   // 货币
  //   money: {
  //     currency: 'USD'
  //   }
  // }
};

export default window.appLocale;
