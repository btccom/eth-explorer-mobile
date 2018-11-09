import appLocaleData from 'react-intl/locale-data/zh';
import common from './zh-CN.common';
import pages from './zh-CN.pages';

window.appLocale = {
  // 合并所有 messages, 加入组件的 messages
  messages: Object.assign({}, common, pages),

  // locale
  locale: 'zh-CN',

  // react-intl locale-data
  data: appLocaleData

  // // 自定义 formates
  // formats: {
  //   // 日期、时间
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
  //     currency: 'CNY'
  //   }
  // }
};

export default window.appLocale;
