import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { Tabs } from 'antd-mobile';
import { WingBlank } from 'antd-mobile';
import PageWrap from '../../components/ui/PageWrap';
import Copy from '../../components/ui/Copy';
import TransactionDetail from './section/TransactionDetail';
import TokenTransfer from './section/TokenTransfer';
import InternalTxList from './section/InternalTxList';

import './index.scss';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class TransactionInfo extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.transactionInfoStore;
    this.store.setTxHash(this.props.match.params.txHash);
  }

  componentDidMount() {
    const { txHash } = this.store;
    this.store.getTransactionOverview(txHash);
    this.store.getInternalTxList(txHash);
    this.store.getTokenTransferList(txHash);
  }

  componentWillUnmount() {
    this.store.setCurrentTab(0);
  }

  handleChangeTab = (tab, index) => {
    this.store.setCurrentTab(index);
  };
  render() {
    const {
      loading,
      currentTab,
      txInfo,
      internalTxList,
      tokenTransferList
    } = this.store;

    const tabs = [
      { title: <Ts transKey="pages.txns.transactionDetail" /> },
      { title: <Ts transKey="pages.txns.tokenTransfer" /> },
      { title: <Ts transKey="pages.txns.internalTxns" /> }
    ];

    const otherRows = [
      {
        key: 'otherExplorers',
        title: <Ts transKey="pages.txns.otherExplorers" />,
        isValueWrap: true,
        render: () => {
          return (
            <div>
              <a
                className="other-blockchain"
                href="https://etherscan.io/"
                target="_blank"
              >
                <i className="inline-icon blockchain-ex-icon" /> ETHERSCAN
              </a>
            </div>
          );
        }
      }
    ];

    return (
      <PageWrap loading={loading}>
        <div className="page-container txinfo-container">
          <WingBlank>
            <h2>
              <Ts transKey="pages.txns.txHash" />
            </h2>

            <div className="tx-hash">
              {txInfo.tx_hash}
              <Copy text={txInfo.tx_hash} />
            </div>
          </WingBlank>
          <div className="tab-container">
            <Tabs
              tabs={tabs}
              initialPage={currentTab}
              swipeable={false}
              page={currentTab}
              onChange={this.handleChangeTab}
            >
              <TransactionDetail />
              <WingBlank>
                <TokenTransfer dataSource={tokenTransferList} />
              </WingBlank>
              <WingBlank>
                <InternalTxList dataSource={internalTxList} />
              </WingBlank>
            </Tabs>
          </div>
        </div>
      </PageWrap>
    );
  }
}
