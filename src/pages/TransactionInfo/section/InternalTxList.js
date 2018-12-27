import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { formatNumber, isContract } from 'utils';

const getDisplayStatusCls = ({ error }) => {
  let displayStatus = 'success';
  if (error) {
    displayStatus = 'error';
  }
  return `tx-status-${displayStatus}`;
};

const InternalListItem = ({
  trace_address,
  amount,
  sender_type,
  sender_hash,
  receiver_type,
  receiver_hash,
  status,
  error
}) => {
  return (
    <div className="simple-list-item-container">
      <div className="internal-list-row with-icon-left">
        <i className={`cell-icon ${getDisplayStatusCls({ status, error })}`} />
        <span className="width45 text-left">{trace_address}</span>
        <div className="width45 text-right">
          <span className="minor-text">
            <Ts transKey="pages.txns.transfer" />
          </span>
          {formatNumber(amount, 5) + 'ETH' + ` `}
        </div>
      </div>
      <div className="internal-list-row with-icon-left">
        <div className="width45 text-left">
          <div className={`cell-text-ellipsis address-item with-icon-right`}>
            {sender_hash}
            {isContract(sender_type) && (
              <i className="cell-icon contract-tx-icon padding-pos" />
            )}
          </div>
        </div>
        <i className="cell-icon tx-direction-icon" />
        <div className="width45 text-right">
          <div className="cell-text-ellipsis address-item with-icon-right">
            {receiver_hash}
            {isContract(receiver_type) && (
              <i className="cell-icon contract-tx-icon padding-pos" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
@withRouter //必须放在最前面
@inject('store')
@observer
export default class InternalTxList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.transactionInfoStore;
  }

  getInternalList = () => {
    const { dataSource } = this.props;
    if (!dataSource || dataSource.length === 0) {
      return (
        <p className="no-data-tip">
          <Ts transKey="common.noData" />
        </p>
      );
    }
    return dataSource.map(item => <InternalListItem {...item} key={item.id} />);
  };

  render() {
    return <div>{this.getInternalList()}</div>;
  }
}
