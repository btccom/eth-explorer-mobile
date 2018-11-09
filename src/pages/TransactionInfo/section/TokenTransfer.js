import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { tokenAmount2Qty } from 'utils';

const TokenTransferListItem = ({
  amount,
  sender_name,
  sender_hash,
  receiver_name,
  receiver_hash,
  token_decimal,
  token_found,
  token_hash,
  unit_name,
  token_name,
  token_icon_url
}) => {
  return (
    <div className="simple-list-item-container">
      <div className="token-list-row with-icon-left">
        <i className={`cell-icon token-transfer-icon`} />
        <div className="width45 text-left">
          <span className="minor-text">
            <Ts transKey="pages.txns.from" />
          </span>
          <div className={`cell-text-ellipsis address-item`}>
            {sender_name ? sender_name : sender_hash}
          </div>
        </div>
        <div className="width45 text-right">
          <span className="minor-text">
            <Ts transKey="pages.txns.to" />
          </span>
          <div className={`cell-text-ellipsis address-item`}>
            {receiver_name ? receiver_name : receiver_hash}
          </div>
        </div>
      </div>
      <div className="internal-list-row with-icon-left">
        <div className="width45 text-left">
          <span className="minor-text">
            <Ts transKey="pages.txns.forQuantity" />
          </span>
          <div className="inline-block">
            {tokenAmount2Qty(amount, token_decimal)}
          </div>
        </div>
        <div className="width45 text-right">
          <span
            className="cell-text-ellipsis with-icon-left vertical-bottom"
            title={token_name}
          >
            {token_found ? `ERC-20(${unit_name})` : <span>-</span>}
            {token_icon_url && (
              <i
                className="cell-icon token-name-icon"
                style={{ backgroundImage: `url(${token_icon_url})` }}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
@withRouter //必须放在最前面
@inject('store')
@observer
export default class TokenTransfer extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.transactionInfoStore;
  }

  getTokenTransferList = () => {
    const { dataSource } = this.props;
    if (!dataSource) {
      return null;
    }
    return dataSource.map(item => (
      <TokenTransferListItem {...item} key={item.id} />
    ));
  };

  render() {
    return <div>{this.getTokenTransferList()}</div>;
  }
}
