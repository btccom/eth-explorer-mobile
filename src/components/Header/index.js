import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { debounce } from 'lodash';
import Ts from 'Trans';
import { FormattedMessage } from 'react-intl';
import { SearchBar } from 'antd-mobile';
import './index.scss';
import { isNull } from 'utils';

@withRouter //必须放在最前面
@inject('store')
@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appStore;
    this.handleSearchInputChange = debounce(this.handleSearchInputChange, 500);
  }

  handleSearchInputChange = value => {
    if (value) {
      //this.store.setSearchClickable(false);
      //this.store.getSearchSuggestionList(value);
    }
  };

  handleSearch = keyword => {
    // if (isToken) {
    //   this.props.history.push({
    //     pathname: `/tokeninfo/${keyword}`,
    //     state: 'changetoken'
    //   });
    // } else {
    if (isNull(keyword)) {
      this.props.history.push({
        pathname: `/`
      });
      return;
    }
    this.props.history.push({
      pathname: `/search/${keyword.trim()}`
    });
    // }
  };

  render() {
    //const { searchSuggestionList } = this.store;
    const searchSuggestionList = [];
    return (
      <div className="header">
        <div className="header-bar">
          <a href="https://btc.com/" target="_blank" className="logo" />
          <Link to="/">
            <div className="app-name-wrap">
              <p className="app-name">
                <Ts transKey="pages.root.header.appName" />
              </p>
            </div>
          </Link>
        </div>
        <h1 className="header-title">
          <Ts transKey="common.pageTitle.transactionInformation" />
        </h1>
        <div className="header-search">
          <FormattedMessage
            id="pages.root.header.searchPlaceholder"
            defaultMessage="TxHash"
          >
            {msg => (
              <SearchBar
                placeholder={msg}
                maxLength={66}
                onSubmit={this.handleSearch}
                cancelText={<Ts transKey="pages.root.cancel" />}
              />
            )}
          </FormattedMessage>
        </div>
      </div>
    );
  }
}

export default Header;
