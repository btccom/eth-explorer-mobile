import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { dateFormat } from 'utils';
import ReactGA from 'react-ga';

import stores from './stores'; //必须引入
import { isProduction } from './utils/constants';
import IntlProviderWrap from './components/IntlProviderWrap';
import App from './App';

import('./styles/main.scss');

//Unique Google Analytics tracking number
ReactGA.initialize('UA-66176065-33');

// init datetime format
dateFormat();

const renderApp = Component => {
  const browserHistory = createBrowserHistory();
  const routeStore = new RouterStore();
  const history = syncHistoryWithStore(browserHistory, routeStore);

  if (typeof history.listen === 'function' && isProduction) {
    history.listen(location => {
      let firstLevel = location.pathname;
      let secondaryLevel = location.hash;
      let splitArr = location.hash.split('/');
      if (splitArr.length > 2) {
        secondaryLevel = splitArr[0] + '/' + splitArr[1];
      }
      let fullPath = firstLevel + secondaryLevel;
      // Google Analatics
      if (window.ga) {
        window.ga('set', 'page', fullPath);
        window.ga('send', 'pageview', fullPath);
      }

      // Baidu Tongji
      if (_hmt) {
        _hmt.push(['_trackPageview', fullPath]);
      }
    });
  }

  render(
    <AppContainer>
      <Provider store={stores} routing={routeStore}>
        <IntlProviderWrap>
          {/* react router key props for fixing dev bug it should remove when deployed */}
          <Router
            history={history}
            onUpdate={() => {
              window.scrollTo(0, 0);
              //fireTracking();
              //ReactGA.pageview(window.location.hash);
            }}
            key={Math.random()}
          >
            <App />
          </Router>
        </IntlProviderWrap>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (isProduction) {
  window.onload = () => {
    if (!global.Intl) {
      require.ensure(
        [
          'intl',
          'intl/locale-data/jsonp/en.js',
          'intl/locale-data/jsonp/zh.js'
        ],
        function(require) {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          require('intl/locale-data/jsonp/zh.js');
          renderApp(App);
        }
      );
    } else {
      renderApp(App);
    }
  };
} else {
  renderApp(App);
}

if (module.hot) {
  module.hot.accept(() => {
    renderApp(App);
  });
}
