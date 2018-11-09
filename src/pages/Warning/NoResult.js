import React, { Component } from 'react';
import Ts from 'Trans';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './index.scss';
export default class NoResult extends Component {
  render() {
    return (
      <div className="warning-page">
        <div className="noresult-bg" />
        <p className="warning-tip">
          <Ts transKey="common.noResultTip" />
        </p>
      </div>
    );
  }
}
