import lodash from 'lodash';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
export const dateFormat = () => {
  Date.prototype.format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  };
};

const formatLocaleRelative = (valueArrs, lang) => {
  const agoLocales = {
    'zh-CN': '前',
    'en-US': ' ago'
  };
  const unitLocales = {
    'zh-CN': {
      second: '秒',
      minute: '分',
      hour: '小时',
      day: '天',
      month: '月',
      year: '年'
    },
    'en-US': {
      second: 'sec',
      minute: 'min',
      hour: 'hr',
      day: 'day',
      month: 'month',
      year: 'year'
    }
  };
  const unitLocalesplural = {
    'zh-CN': {
      second: '秒',
      minute: '分',
      hour: '小时',
      day: '天',
      month: '月',
      year: '年'
    },
    'en-US': {
      second: 'secs',
      minute: 'mins',
      hour: 'hrs',
      day: 'days',
      month: 'months',
      year: 'years'
    }
  };

  function getUnitLocale(value) {
    return value > 1 ? unitLocalesplural : unitLocales;
  }
  let currentLocales = valueArrs.map(({ value, unit }) => {
    return `${value} ${getUnitLocale(value)[lang][unit]}`;
  });
  return currentLocales.join(' ') + agoLocales[lang];
};
/**
 *
 * @param {number} current millisecond
 * @param {number} previous millisecond
 */
export const timeDifference = (current, previous, lang) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return formatLocaleRelative(
      [{ value: Math.round(elapsed / 1000), unit: 'second' }],
      lang
    );
  } else if (elapsed < msPerHour) {
    return formatLocaleRelative(
      [
        { value: Math.floor(elapsed / msPerMinute), unit: 'minute' },
        { value: Math.floor((elapsed % msPerMinute) / 1000), unit: 'second' }
      ],
      lang
    );
  } else if (elapsed < msPerDay) {
    return formatLocaleRelative(
      [
        { value: Math.floor(elapsed / msPerHour), unit: 'hour' },
        {
          value: Math.floor((elapsed % msPerHour) / msPerMinute),
          unit: 'minute'
        }
      ],
      lang
    );
  } else if (elapsed < msPerMonth) {
    return formatLocaleRelative(
      [
        { value: Math.round(elapsed / msPerDay), unit: 'day' },
        {
          value: Math.floor((elapsed % msPerDay) / msPerHour),
          unit: 'hour'
        }
      ],
      lang
    );
  } else if (elapsed < msPerYear) {
    return formatLocaleRelative(
      [{ value: Math.round(elapsed / msPerMonth), unit: 'month' }],
      lang
    );
  } else {
    return formatLocaleRelative(
      [{ value: Math.round(elapsed / msPerYear), unit: 'year' }],
      lang
    );
  }
};

/**
 * convert time second to relative time
 * @param {number} second
 */
export const second2Relative = (second, lang) => {
  if (typeof second !== 'number') {
    return '';
  }
  return timeDifference(second * 1000, 0, lang);
};

export const timestamp2Relative = (timestamp, lang) => {
  let current = new Date().getTime();
  return timeDifference(current, timestamp * 1000, lang);
};

export const getLocaleTimeStr = (secondTimeStamp, lang) => {
  if (lang === 'zh-CN') {
    return moment(secondTimeStamp * 1000).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(secondTimeStamp * 1000).format('MMM-DD-YYYY HH:mm:ss');
  }
};

/**
 * Uppercase first letter
 * @param {string} str
 */
export const upper = str => {
  var upper = str.replace(/^\w/, function(chr) {
    return chr.toUpperCase();
  });
  return upper;
};
/**
 * 获取url参数
 * @param {String} url url地址
 * @param {String} name 参数名称
 */
export const getQueryString = (url, name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = url
    .slice(url.search(/\?/))
    .substr(1)
    .match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 函数去抖,针对winodw.onresize等事件
 * @param {Function} method 需要去抖的方法
 */
export const debounce = method => {
  if (method.timeout) clearTimeout(method.timeout);
  method.timeout = setTimeout(() => {
    method();
  }, 500);
};

/**
 * 判断是否为空对象
 * @param {*} obj
 */
export const isEmptyObject = obj => {
  for (var name in obj) {
    return false;
  }
  return true;
};

/**
 * 面包屑配置
 */
export const getBreadInfo = url => {
  const breadConfig = {
    '/overview': ['概述'],
    '/sdkdownload': ['数据管理', 'SDK下载']
  };
  let breadInfo =
    breadConfig[Object.keys(breadConfig).find((item, index) => item === url)];
  if (url === '/') {
    breadInfo = breadConfig['/overview'];
  }
  return breadInfo ? breadInfo : [];
};

/**
 * convert timestapm to date time string
 *
 * @param {number} timestamp
 * @param {string} formatPattern yyyy-MM-dd hh:mm:ss
 */
export const timeStamp2TimeStr = (timestamp, formatPattern) => {
  timestamp = Number(timestamp);
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  return new Date(timestamp).format(formatPattern);
};

// /**
//  * 格式化数据
//  * @param {string|number} value 要格式化的值
//  * @param {number} decimalPlaces 保留的小树位数
//  */
// export const formatNumber = (value, decimalPlaces) => {
//   let result = '';
//   try {
//     //result = parseFloat(Math.round(value * 100) / 100).toFixed(decimalPlaces);
//     result = parseFloat(value).toFixed(decimalPlaces);
//   } catch (error) {}
//   return result;
//   // return '';
// };

/**
 * 格式化数据
 * @param {string|number} value 要格式化的值
 * @param {number} decimalPlaces 保留的小树位数
 */
export const formatNumber = (value, decimalPlaces) => {
  try {
    // let format = {
    //   groupSeparator: ',',
    //   groupSize: 3
    // };
    // BigNumber.config({ FORMAT: format });

    if (isNaN(value) || value === '' || value === null || value === undefined) {
      return '';
    }
    if (value === '0' || value === 0) {
      return 0;
    }
    let result = '';
    result = BigNumber(value);

    return result.toFormat(decimalPlaces).toString();
  } catch (error) {
    return '';
  }
};

export const abbreviateNumber_en = (value, decimalPlaces, isLowerCase) => {
  if (!value) {
    return '';
  }
  var SI_SYMBOL = ['', 'K', 'M', 'B', 'T'];
  var SI_SYMBOLLower = ['', 'k', 'm', 'b', 't'];
  var tier = (Math.log10(value) / 3) | 0;
  if (tier == 0) return value;
  var suffix = isLowerCase ? SI_SYMBOLLower[tier] : SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = value / scale;
  // return {
  //   full: scaled.toFixed(decimalPlaces) + suffix,
  //   value: scaled.toFixed(decimalPlaces),
  //   suffix
  // };
  return scaled.toFixed(decimalPlaces) + ' ' + suffix;
};

export const abbreviateNumber_zh = (value, decimalPlaces) => {
  if (!value) {
    return '';
  }
  var SI_SYMBOL = ['', '万', '亿', '万亿'];

  var tier = (Math.log10(value) / 4) | 0;
  if (tier == 0) return value;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 4);
  var scaled = value / scale;
  return scaled.toFixed(decimalPlaces) + ' ' + suffix;
  // return {
  //   full: scaled.toFixed(decimalPlaces) + suffix,
  //   value: scaled.toFixed(decimalPlaces),
  //   suffix
  // };
};

/**
 * 将数字字符串根据当前语言转换成带单位的字符串
 * @param {string|number} value
 * @param {number} decimalPlaces
 * @param {string} localeLanguage
 */
export const abbreviateNumber = (
  value,
  decimalPlaces,
  localeLanguage,
  isLowerCase
) => {
  if (localeLanguage === 'zh-CN')
    return abbreviateNumber_zh(value, decimalPlaces);
  else return abbreviateNumber_en(value, decimalPlaces, isLowerCase);
};

const HASH_TRUNC_LENGTH = 15;

export const truncString = (str, length) => {
  let len = length ? length : HASH_TRUNC_LENGTH;
  return str.substr(0, len) + '...';
};

export const ether2GWei = etherValue => {
  if (typeof etherValue !== 'number') {
    etherValue = parseFloat(etherValue);
  }
  return formatNumber(etherValue * Math.pow(10, 9), 2) + ' Gwei';
};

export const formatDecimalZero = value => {
  if (!value) {
    return '';
  }
  if (value.indexOf('.') > 0) {
    value = value.replace(/0+?$/g, ''); //去掉多余的0
    value = value.replace(/[.]$/g, ''); //如最后一位是.则去掉
  }
  return value;
};
/**
 * transfer token amount to quantity
 */
export const tokenAmount2Qty = (amount, decimal) => {
  let result;
  try {
    if (!amount) {
      return '';
    }
    if (decimal == 0) {
      decimal = 0;
    }
    result = formatNumber(amount / Math.pow(10, decimal), 5) + '';
    result = formatDecimalZero(result);

    return result;
  } catch (error) {}
};

/**
 * transfer token amount in currency
 */
export const tokenValueInCurrency = (price, amount, decimal) => {
  let result;
  try {
    if (!amount) {
      return '';
    }
    if (decimal == 0) {
      decimal = 0;
    }
    result = price * (amount / Math.pow(10, decimal));

    return result;
  } catch (error) {}
};

/**
 * transfer change rate to percent rate
 */
export const rate2Percent = changeRate => {
  if (!changeRate) {
    return '';
  }
  return Math.abs(changeRate) + '%';
};

/**
 * 将小值按照小数位转换成大值
 */
export const decimalScale = (value, decimal) => {
  if (!value) {
    return '';
  }
  return value / Math.pow(10, decimal);
};

/**
 * 求两个数的乘积，并保留一定小数
 */
export const multiply = (valueA, valueB) => {
  if (valueA === 0 || valueB === 0) {
    return 0;
  }
  if (!valueA || !valueB) {
    return '';
  }
  return valueA * valueB;
};

/**
 * 数字千分位
 */
export const numberWithCommas = x => {
  var parts = x.toString().split('.');
  if (parts.length > 0) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return '';
};

export const handlerToByte = input => {
  var input = input || 0;
  var num = parseFloat(input);
  if (input >= 1000 && input < 1000 * 1000) {
    num = parseFloat(input / 1000).toFixed(2);
    return num + ' KB';
  } else if (input >= 1000 * 1000 && input < 1000 * 1000 * 1000) {
    num = parseFloat(input / 1000 / 1000).toFixed(2);
    return num + ' MB';
  } else if (input >= 1000 * 1000 * 1000 && input < 1000 * 1000 * 1000 * 1000) {
    num = parseFloat(input / 1000 / 1000 / 1000).toFixed(2);
    return num + ' GB';
  } else if (input >= 1000 * 1000 * 1000 * 1000) {
    num = parseFloat(input / 1000 / 1000 / 1000 / 1000).toFixed(2);
    return num + ' TB';
  } else {
    return num.toFixed(2) + ' B';
  }
};

export const isContract = type => {
  return type == 1;
};

export const isSelf = (valueA, valueB) => {
  if (valueA && valueB) {
    return valueA.toLowerCase() === valueB.toLowerCase();
  }
  return false;
};

export const getCurrency = lang => {
  return lang === 'zh-CN' ? 'CNY' : 'USD';
};

export const hex2bin = s => {
  if (!s) {
    return '';
  }
  if (s.indexOf('0x') >= 0) {
    s = s.substr(2);
  }
  let result = '';
  try {
    let ret = [];
    let i = 0;
    let l;
    s += '';
    for (l = s.length; i < l; i += 2) {
      let c = parseInt(s.substr(i, 1), 16);
      let k = parseInt(s.substr(i + 1, 1), 16);
      if (isNaN(c) || isNaN(k)) return false;
      ret.push((c << 4) | k);
    }
    result = String.fromCharCode.apply(String, ret);
  } catch (error) {}

  return result;
};

export const isNull = s => {
  return s === null || s === '' || s === undefined;
};

export const scrollOffset = (c, t) =>
  c === document
    ? t.getBoundingClientRect().top + (window.scrollY || window.pageYOffset)
    : getComputedStyle(c).position === 'relative'
      ? t.offsetTop
      : t.getBoundingClientRect().top + c.scrollTop;
