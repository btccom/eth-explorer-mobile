import { observable, action, computed, runInAction } from 'mobx';
import ajax from 'ajax';

class SearchStore {
  @observable
  searching;

  @observable
  searchType; //{result_type, query_string} when result_type='token' query_string is a array

  @observable
  isSearchReturnError;

  @observable
  searchWd; // search key word

  constructor() {
    this.searching = true;
    this.searchType = null;
    this.isSearchReturnError = false;
    this.searchWd = '';
  }

  @action
  getSearchType = async value => {
    try {
      this.searching = true;
      this.isSearchReturnError = false;
      const res = await ajax.get(`/search/general`, { params: { q: value } });

      if (res && res.data) {
        runInAction(() => {
          if (!value) {
            this.searchType = null;
            this.isSearchReturnError = true;
          } else {
            this.searchType = res.data.result_type;
            if (
              res.data.result_type === 'token' ||
              res.data.result_type === 'block'
            ) {
              this.searchWd = res.data.query_string;
            } else {
              this.searchWd = value;
            }

            this.isSearchReturnError = false;
          }
          this.searching = false;
        });
      }
    } catch (error) {
      this.searchType = null;
      this.isSearchReturnError = true;
    }
  };
}
const searchStore = new SearchStore();

export { searchStore };
