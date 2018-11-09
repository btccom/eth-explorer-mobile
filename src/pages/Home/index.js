import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';

import './index.scss';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.demoStore;
    this.appStore = this.props.store.appStore;
  }

  render() {
    const { lang } = this.appStore;

    return (
      <div>
        <h2
          style={{
            color: 'rgba(0,0,0,.65)',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 40
          }}
        >
          请输入要搜索的交易Hash
        </h2>
      </div>
    );
  }
}
