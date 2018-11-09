import { observable, action } from 'mobx';

class AppStore {
  @observable
  lang;

  @observable
  appTheme;

  constructor() {
    //locale
    this.lang = this.getDefaultLang();
  }

  getDefaultLang() {
    let browserLang = navigator.language || navigator.userLanguage;
    let userSettingLang = localStorage.getItem('lang');
    let defaultLang =
      userSettingLang ||
      (browserLang.substr(0, 2) === 'en' ? 'en-US' : 'zh-CN');
    //return defaultLang;
    return 'en-US';
  }

  @action
  setLocaleLang(lang) {
    this.lang = lang;
  }
  @action
  setAppLocale(appLocale) {
    this.appLocale = appLocale;
  }
}

const appStore = new AppStore();

export { appStore };
