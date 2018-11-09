import React from 'react';
import * as Sentry from '@sentry/browser';
import { isProduction } from 'constants';
Sentry.init({
  dsn: 'https://232a570b813b459f8d463e903a868160@sentry.io/1298067'
});
// should have been called before using it here
// ideally before even rendering your react app
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    // if (isProduction) {
    //   this.setState({ error });
    //   Sentry.withScope(scope => {
    //     Object.keys(errorInfo).forEach(key => {
    //       scope.setExtra(key, errorInfo[key]);
    //     });
    //     Sentry.captureException(error);
    //   });
    // }
  }

  render() {
    if (this.state.error) {
      //Sentry.showReportDialog();
      // You can render any custom fallback UI
      //return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
