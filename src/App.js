import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import routes from './pages';
import { WingBlank } from 'antd-mobile';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/Warning/NotFound';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';

@inject('store', 'routing')
@withRouter
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appStore;
    this.toTop = React.createRef();
    this.state = {
      showToTop: false
    };
  }

  componentDidMount() {
    window.addEventListener(
      'scroll',
      this.throttle(this.handleScroll.bind(this), 300)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    this.toTop.current.style.display = scrollTop > 300 ? 'block' : 'none';

    //this.setState({ showToTop: scrollTop > 300 });
  }

  handleLocalChange = lang => {
    this.store.setLocaleLang(lang);
  };

  handleToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  render() {
    const { lang, appTheme } = this.store;

    return (
      <ErrorBoundary>
        <LocaleProvider locale={lang === 'zh-CN' ? zhCN : enUS}>
          <div className="relative">
            <WingBlank>
              <Header />
            </WingBlank>
            <div className="content-container" style={{ minHeight: 360 }}>
              <Switch>
                {routes.map((route, index) => (
                  <Route key={`${route.name}-${index}`} {...route} />
                ))}
                <Route key="404" component={NotFound} />
              </Switch>
            </div>
            <a
              className="to-top"
              ref={this.toTop}
              style={{ display: 'none' }}
              onClick={this.handleToTop}
            />
          </div>
        </LocaleProvider>
      </ErrorBoundary>
    );
  }
}
