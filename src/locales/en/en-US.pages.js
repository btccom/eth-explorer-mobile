import flatten from 'flat';
const pageMessage = {
  pages: {
    root: {
      header: {
        appName: 'Ethereum Explorer',
        searchPlaceholder: 'Search by Txhash'
      },
      footer: {},
      cancel: 'Cancel'
    },

    txns: {
      totalTransaction: 'Total {txnsCount} Transactions',
      totalTransactionMaxLimit: ' (Display the last {count}+ records only)',
      txHash: 'TxHash',
      block: 'Block',
      time: 'Time',
      timeLastSeen: 'Time LastSeen',
      from: 'From',
      to: 'To',
      forQuantity: 'For',
      quantity: 'Quantity',
      value: 'Value',
      fee: 'Fee',
      gasLimit: 'Gas Limit ',
      gasUsed: 'Gas Used',
      gasPrice: 'Gas Price',
      transactionHash: 'Transaction',
      transactionDetail: 'Txn Details',
      tokenTransfer: 'Token Transfer',
      internalTxns: 'Internal Txns',
      txStatus: 'Tx Status',
      success: 'Success',
      pending: 'Pending',
      fail: 'FAIL',
      txErrorTip: 'Success,but errors occured',
      txFailTip: 'Fail,errors occured',
      confirmCount: '{count} confirmation',
      confirmCountPlural: '{count} confirmations',
      timeStr: '{time} mins ago',
      confirmedIn: 'Confirmed in',
      transfer: 'Transfer',
      transferValue: 'TRANSFER {value}',
      gasofTotal: '{gas} Gas of {total}',
      inputData: 'Input Data',
      eventLogs: 'Event Logs',
      errorMsg: 'Error encountered during contract execution [Reverted]',
      cancelled: 'CANCELLED',
      tokenTransfered: 'Tokens Transfered',
      txTokenTransferedCount: '{count} ERC-20 transfers found,  ',
      internalTotalCountMaxLimit: '{count} internal transactions found,  ',
      otherExplorers: 'Other blockchain explorers'
    }
  }
};
const pageMessageFlatten = flatten(pageMessage);
export default pageMessageFlatten;
