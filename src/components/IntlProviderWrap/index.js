import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';
/**
 * 获取国际化资源文件
 *
 * @param {any} lang
 * @returns
 */
function getLocale(lang) {
  /* eslint-disable global-require */
  let result = {};
  switch (lang) {
    case 'zh-CN':
      result = require('../../locales/zh/zh-CN');
      break;
    case 'en-US':
      result = require('../../locales/en/en-US');
      break;
    default:
      result = require('../../locales/en/en-US');
  }

  return result.default || result;
  /* eslint-enable global-require */
}

@inject('store')
@observer
class IntlProviderWrap extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appStore;
  }

  render() {
    const { lang } = this.store;

    const appLocale = getLocale(lang);
    addLocaleData(...appLocale.data);

    this.store.setAppLocale(appLocale);

    return (
      <IntlProvider
        key={appLocale.locale}
        locale={appLocale.locale}
        messages={appLocale.messages}
        // formats={appLocale.formats}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default IntlProviderWrap;
