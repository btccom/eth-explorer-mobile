import { observable, action, runInAction, computed, reaction } from 'mobx';
import ajax from 'ajax';
import { isNull } from 'utils';

class TransactionInfoStore {
  //#region Observable variables
  @observable
  loading;

  @observable
  txHash;

  @observable
  currentTab;

  @observable
  txInfo;

  @observable
  txStatus;

  @observable
  internalTxList;
  @observable
  internalTotalCount;

  @observable
  tokenTransferList;
  @observable
  tokenTransferCount;
  //#endregion

  constructor() {
    this.loading = false;
    this.isPendingStatus = false;
    this.currentTab = 0;
    this.txHash = null;
    this.txInfo = {};
    this.txStatus = '';
    this.internalTxList = [];
    this.tokenTransferList = [];

    reaction(
      () => this.txHash,
      txHash => {
        this.getTransactionOverview(txHash);
        this.getInternalTxList(txHash);
        this.getTokenTransferList(txHash);
      }
    );
  }

  @action
  setTxHash = txHash => {
    this.txHash = txHash;
    this.isPendingStatus = false;
  };

  @action
  setCurrentTab = tab => {
    this.currentTab = tab;
  };

  @action
  getTransactionOverview = async txHash => {
    if (this.isPendingStatus !== true) {
      this.loading = true;
    }

    const res = await ajax.get(`/txns/${txHash}`);
    this.loading = false;
    if (res && res.data) {
      runInAction(() => {
        this.txInfo = res.data;
        this.txStatus = this.getTxStatus(res.data);
      });
    }
  };

  getTxStatus = txInfo => {
    let s = '';
    if (!isNull(txInfo.block_height)) {
      s = txInfo.status;
    } else if (!txInfo.status) {
      s = 'pending';
      this.isPendingStatus = true;
    }
    return s === 'failed' ? 'fail' : s;
  };

  @action
  getInternalTxList = async txHash => {
    const res = await ajax.get(`/internaltxns/${txHash}`, {
      params: {
        nested: false,
        limit: 500
      }
    });
    if (res && res.data) {
      runInAction(() => {
        this.internalTxList = res.data.list;
        this.internalTotalCount = res.data.list.length;
      });
    }
  };

  @action
  getTokenTransferList = async txHash => {
    const res = await ajax.get(`/tokentxns/${txHash}`, {
      params: {
        page: 1,
        size: 500
      }
    });
    if (res && res.data) {
      runInAction(() => {
        this.tokenTransferList = res.data.list;
        this.tokenTransferTotalCount = res.data.total_count;
      });
    }
  };
}

const transactionInfoStore = new TransactionInfoStore();

export { transactionInfoStore };
