import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd-mobile';
import Ts from 'Trans';
import {
  formatNumber,
  ether2GWei,
  getLocaleTimeStr,
  isContract,
  getCurrency
} from 'utils';
import { WingBlank } from 'antd-mobile';
import RelativeLoop from '../../../components/RelativeLoop';
import List from '../../../components/ui/List';
import Chunk from '../../../components/ui/Chunk';
import TokenTransfer from './TokenTransfer';
import InternalTxList from './InternalTxList';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.transactionInfoStore;
    this.appStore = this.props.store.appStore;
    this.state = {
      intervalId: null
    };
  }

  componentDidMount() {
    let intervalId = setInterval(this.pendingTimer, 10000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  pendingTimer = () => {
    const { txStatus, txHash, getTransactionOverview } = this.store;
    if (this.isPending(txStatus)) {
      getTransactionOverview(txHash);
    }
    if (!this.isPending(txStatus)) {
      clearInterval(this.state.intervalId);
    }
  };

  getTimeStr = (created_ts, time_in_sec, lang, isLoop) => {
    if (created_ts) {
      return (
        <span style={{ verticalAlign: 'textBottom' }}>
          {getLocaleTimeStr(created_ts, lang)}(
          <span>
            {' '}
            {isLoop ? (
              <RelativeLoop second={time_in_sec} lang={lang} />
            ) : (
              second2Relative(time_in_sec, lang)
            )}
          </span>
          )
        </span>
      );
    } else return '--';
  };

  getDisplayStatus = txInfo => {
    let s = 'pending';
    if (txInfo.block_height) {
      s = txInfo.status;
    }
    return s === 'failed' ? 'fail' : s;
  };

  isPending(txStatus) {
    return txStatus === 'pending';
  }

  handleClickView = tab => {
    this.store.setCurrentTab(tab);
  };

  render() {
    const { lang } = this.appStore;
    const {
      txInfo,
      txStatus,
      internalTxList,
      internalTotalCount,
      tokenTransferList,
      tokenTransferTotalCount
    } = this.store;

    const rows = [
      {
        key: 'txStatus',
        title: <Ts transKey="pages.txns.txStatus" />,
        isShow: !!txStatus,
        render: () => {
          return (
            <Chunk
              type={txStatus}
              style={{ textAlign: 'center', width: 'auto' }}
            >
              {txStatus && <Ts transKey={`pages.txns.${txStatus}`} />}
            </Chunk>
          );
        }
      },
      {
        key: 'block',
        title: <Ts transKey="pages.txns.block" />,
        isShow: !this.isPending(txStatus),
        render: () => {
          return (
            <span>
              {txInfo.block_height}
              {` `}
              <span>
                ({` `}
                <Ts
                  type="pluralMessage"
                  transKey="pages.txns.confirmCount"
                  transKeyPlural="pages.txns.confirmCountPlural"
                  pluralValue={txInfo.total_confirmation - 0}
                  values={{
                    count: txInfo.total_confirmation
                  }}
                />
                {` `})
              </span>
            </span>
          );
        }
      },
      {
        key: 'time',
        title: this.isPending(txStatus) ? (
          <Ts transKey="pages.txns.timeLastSeen" />
        ) : (
          <Ts transKey="pages.txns.time" />
        ),
        isValueWrap: true,
        render: () => {
          return (
            <div>
              {this.isPending(txStatus) && (
                <Icon type="loading" style={{ marginRight: 5 }} spin />
              )}
              {this.getTimeStr(
                txInfo.created_ts,
                txInfo.time_in_sec,
                lang,
                true
              )}
            </div>
          );
        }
      },
      {
        key: 'from',
        isValueWrap: true,
        title: <Ts transKey="pages.txns.from" />,
        render: () => {
          return (
            <div>
              {txInfo.sender_hash}
              {isContract(txInfo.sender_type) && (
                <i className="cell-icon contract-tx-icon" />
              )}
            </div>
          );
        }
      },
      {
        key: 'to',
        isValueWrap: true,
        title: <Ts transKey="pages.txns.to" />,
        render: () => {
          return (
            <div>
              {txInfo.receiver_hash}
              {isContract(txInfo.receiver_type) && (
                <i className="cell-icon contract-tx-icon" />
              )}
              {internalTxList.length > 0 && (
                <div>
                  <InternalTxList
                    dataSource={internalTxList.slice(0, 5)}
                    internalTotalCount={internalTotalCount}
                  />
                  {internalTotalCount > 5 && (
                    <p className="max-limit-tip">
                      (
                      <Ts
                        transKey="pages.txns.internalTotalCountMaxLimit"
                        values={{ count: internalTotalCount }}
                      />
                      {` `}
                      <span
                        className="link"
                        onClick={() => {
                          this.handleClickView(2);
                        }}
                      >
                        <Ts transKey="common.viewAll" />
                      </span>
                      )
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        }
      },
      {
        key: 'tokenTransfered',
        isValueWrap: true,
        title: <Ts transKey="pages.txns.tokenTransfered" />,
        isShow: tokenTransferList.length > 0,
        render: () => {
          return (
            <div>
              <TokenTransfer
                dataSource={tokenTransferList.slice(0, 5)}
                tokenTransferTotalCount={tokenTransferTotalCount}
              />
              {tokenTransferTotalCount > 5 && (
                <p className="max-limit-tip">
                  (
                  <Ts
                    transKey="pages.txns.txTokenTransferedCount"
                    values={{ count: tokenTransferTotalCount }}
                  />
                  {` `}
                  <span
                    className="link"
                    onClick={() => {
                      this.handleClickView(1);
                    }}
                  >
                    <Ts transKey="common.viewAll" />
                  </span>
                  )
                </p>
              )}
            </div>
          );
        }
      },
      {
        key: 'value',
        title: <Ts transKey="pages.txns.value" />,
        render: () => {
          return (
            <span>
              {formatNumber(txInfo.amount, 5)} ETH |{' '}
              <Ts
                currency={getCurrency(lang)}
                type="currency"
                values={
                  lang === 'zh-CN' ? txInfo.amount_rmb : txInfo.amount_usd
                }
                decimal={2}
              />
            </span>
          );
        }
      },
      {
        key: 'fee',
        title: <Ts transKey="pages.txns.fee" />,
        isShow: !this.isPending(txStatus),
        render: () => {
          return (
            <span>
              {formatNumber(txInfo.fee, 5)} ETH |{' '}
              <Ts
                currency={getCurrency(lang)}
                type="currency"
                values={lang === 'zh-CN' ? txInfo.fee_rmb : txInfo.fee_usd}
                decimal={2}
              />
            </span>
          );
        }
      },
      {
        key: 'gasLimit',
        title: <Ts transKey="pages.txns.gasLimit" />,
        render: () => {
          return txInfo.gas_limit;
        }
      },
      {
        key: 'gasUsed',
        title: <Ts transKey="pages.txns.gasUsed" />,
        render: () => {
          return this.isPending(txStatus) ? (
            <Ts transKey="pages.txns.pending" />
          ) : (
            txInfo.gas_used
          );
        }
      },
      {
        key: 'gasPrice',
        title: <Ts transKey="pages.txns.gasPrice" />,
        render: () => {
          return ether2GWei(txInfo.gas_price);
        }
      },
      {
        key: 'Nonce',
        title: 'Nonce;{Position}',
        render: () => {
          return this.isPending(txStatus) ? (
            <span>
              {txInfo.nonce}
              {` `}|{` {`}
              <Ts transKey="pages.txns.pending" />
              {`}`}
            </span>
          ) : (
            `${txInfo.nonce} | {${txInfo.position}}`
          );
        }
      },
      {
        key: 'inputData',
        title: <Ts transKey="pages.txns.inputData" />,
        isValueWrap: true,
        render: () => {
          return <div className="mult-text">{txInfo.input}</div>;
        }
      }
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
                href={`https://blockchair.com/ethereum/transaction/${
                  txInfo.tx_hash
                }`}
                target="_blank"
              >
                <i className="inline-icon blockchain-ex-icon" /> BLOCKCHAIR
              </a>
            </div>
          );
        }
      }
    ];

    return (
      <div className="detail-container">
        <WingBlank>
          <List rows={rows} />
        </WingBlank>
        <div className="splitline" />
        <WingBlank>
          <List rows={otherRows} displaySplitline={false} />
        </WingBlank>
      </div>
    );
  }
}
