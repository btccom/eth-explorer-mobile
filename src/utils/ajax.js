import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { baseURL } from './constants';
import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: 'https://232a570b813b459f8d463e903a868160@sentry.io/1298067'
});

const redirect = url => {
  const redirectUrl = url.replace(
    '%2FPLACEHOLDER%2F',
    encodeURIComponent(`${window.location.origin}`)
  );
  return window.location.replace(redirectUrl);
};
const handleRedirect = {
  401: data => {
    redirect(data.url); // 未登录跳转
  },
  404: data => {
    redirect('servererror');
  },
  '50x': data => {
    redirect('servererror');
  }
};

const sendErrorLog = error => {
  // Sentry.withScope(scope => {
  //   Object.keys(errorInfo).forEach(key => {
  //     scope.setExtra(key, errorInfo[key]);
  //   });
  Sentry.captureException(error);
  // });
};

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api/' : baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [data => qs.stringify(data)]
});

ajax.interceptors.response.use(
  response => {
    const { err_no, err_msg, data } = response.data;
    // 接口正常，返回 { err_no, err_msg, data }
    if (response.status >= 200 && response.status < 400) {
      // 接口错误，404、500 等，返回错误
      if (err_no === 0) {
        return {
          success: true,
          data
        };
      }
      if (handleRedirect[err_no]) {
        return handleRedirect[err_no](data);
      }
      sendErrorLog(err_msg);
      return message.error(err_msg);
    }
    sendErrorLog(err_msg);
    return message.error(err_msg);
  },
  err => {
    sendErrorLog(err);
    // console.log(err.response);
    if (err.response) {
      const code = err.response.status;
      sendErrorLog(`Server error: ${code}`);

      if (code >= 500) {
        sendErrorLog(err.response);
        //message.error('Server Error');
        return handleRedirect['50x'];
      } else if (err.response.data) {
        //message.error(err.response.data.err_msg);
        sendErrorLog(err.response.data);
        return Promise.reject(err.response.data);
      }
    }
    return {
      error: err
    };
  }
);

export default ajax;
