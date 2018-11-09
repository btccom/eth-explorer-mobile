import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PageWrap from '../../components/ui/PageWrap';
import NoResult from '../Warning/NoResult';
const backendSearchTypeMapRoute = {
  block: 'blockinfo',
  tx: 'txinfo',
  account: 'accountinfo',
  token: 'tokeninfo'
};

@withRouter //必须放在最前面
@inject('store')
@observer
export default class SearchMid extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.searchStore;
  }

  componentWillMount() {
    this.store.getSearchType(this.props.match.params.wd);
  }

  componentWillReceiveProps(nextProps) {
    this.store.getSearchType(nextProps.match.params.wd);
  }

  render() {
    const { searching, searchType, isSearchReturnError, searchWd } = this.store;

    const route = backendSearchTypeMapRoute[searchType];
    if (!searching && !isSearchReturnError) {
      return <Redirect to={`/${route}/${searchWd}`} />;
    } else if (isSearchReturnError) {
      return <NoResult />;
    }
    return (
      <PageWrap loading={true}>
        <div className="page-container" />
      </PageWrap>
    );
  }
}
