import flatten from 'flat';
const pageMesage = {
  pages: {
    root: {
      header: {
        appName: '以太坊浏览器',
        searchPlaceholder: '请输入交易哈希'
      },
      footer: {},
      cancel: '取消'
    },

    txns: {
      totalTransaction: '总计{txnsCount}个交易',
      totalTransactionMaxLimit: ' (仅显示最近{count}+条数据)',
      txHash: '交易哈希',
      block: '所在区块',
      time: '时间',
      timeLastSeen: '上次收录时间',
      from: '发送方',
      to: '接收方',
      forQuantity: '数量',
      quantity: '数量',
      value: '金额',
      fee: '手续费',
      gasLimit: 'Gas 限额',
      gasUsed: 'Gas 消耗',
      gasPrice: 'Gas 价格',
      transactionHash: '交易哈希',
      transactionDetail: '交易详情',
      tokenTransfer: '代币转账',
      internalTxns: '内部交易',
      txStatus: '交易结果',
      success: '交易成功',
      pending: '处理中',
      fail: '交易失败',
      txErrorTip: '成功，但存在错误',
      txFailTip: '失败，发生错误',
      confirmCount: '{count}个确认',
      confirmCountPlural: '{count}个确认',
      timeStr: '{time}分钟前',
      confirmedIn: '确认耗时',
      transfer: '转账',
      transferValue: '转账 {value}',
      gasofTotal: '消耗{gas}，(共{total})',
      inputData: '输入数据',
      eventLogs: '事件日志',
      errorMsg: '合约执行中遇到错误[Reverted]',
      cancelled: '已取消',
      tokenTransfered: '代币转账',
      txTokenTransferedCount: '共{count}笔 ERC-20 代币转账， ',
      internalTotalCountMaxLimit: '共{count}笔内部转账， ',
      otherExplorers: '其他区块链浏览器'
    }
  }
};
const pageMesageFlatten = flatten(pageMesage);
export default pageMesageFlatten;
