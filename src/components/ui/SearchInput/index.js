import React, { Component } from 'react';
import { IconSearch } from '../../SvgIcon';
import './index.scss';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputKeyword: '',
      isActive: false,
      isShowMatchContainer: false
      // isAbsoluteHide: false
    };
    this.containerRef = React.createRef();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {

  //   console.log('dev');
  //   console.log(nextProps.matchItems);
  //   let isHaveMatchItems = false;
  //   let { isShowMatchContainer, isAbsoluteHide } = prevState;
  //   console.log(isAbsoluteHide);
  //   if (nextProps.matchItems && nextProps.matchItems.length > 0) {
  //     isHaveMatchItems = true;
  //   }
  //   if (isAbsoluteHide) {
  //     isShowMatchContainer = false;
  //   } else if (isHaveMatchItems) {
  //     isShowMatchContainer = true;
  //   }
  //   return { ...prevState, isShowMatchContainer, isAbsoluteHide: false };
  // }

  componentDidMount() {
    //document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    //document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getMatchItems = matchItems => {
    return (
      <ul>
        {matchItems.map((item, index) => (
          <li
            key={item.value + index}
            onMouseDown={e => {
              e.preventDefault();
              this.handleItemClick(item.value, true);
            }}
          >{`${item.name} (${item.symbol})`}</li>
        ))}
      </ul>
    );
  };

  // handleClickOutside = event => {
  //   console.log('---', event);
  //   console.log('---', this.containerRef);
  //   if (
  //     this.containerRef &&
  //     this.containerRef.current &&
  //     !this.containerRef.current.contains(event.target)
  //   ) {
  //     this.setState({ isShowMatchContainer: false });
  //   }
  // };

  handleInputClick = () => {
    this.setState({ isActive: true });
  };

  handleInputBlur = () => {
    this.setState({ isActive: false, isShowMatchContainer: false });
  };

  handleInputChange = e => {
    this.setState({ inputKeyword: e.target.value });
    if (!e.target.value.trim()) {
      this.setState({ isShowMatchContainer: false });
    } else {
      this.setState({ isShowMatchContainer: true });
    }
    this.props.onChange(e.target.value.trim());
  };

  handleItemClick = hash => {
    this.props.onSearch(hash, true);
    this.setState({ inputKeyword: '', isShowMatchContainer: false });
  };

  handleSearch = () => {
    if (this.state.inputKeyword) {
      this.props.onSearch(this.state.inputKeyword.trim());
      this.setState({ inputKeyword: '' });
    }
    this.setState({ isAbsoluteHide: true, isShowMatchContainer: false });
  };

  handleEnterSearch = e => {
    if (e.charCode == 13) {
      this.handleSearch();
    }
  };

  render() {
    const { placeholder, matchItems } = this.props;
    return (
      <div className="search-container" ref={this.containerRef}>
        <div className="search-button-wrap" onClick={this.handleSearch}>
          <IconSearch isActive={this.state.isActive} />
        </div>
        <div className="search-input-wrap" onBlur={this.handleInputBlur}>
          <input
            type="text"
            placeholder={placeholder}
            onClick={this.handleInputClick}
            onChange={this.handleInputChange}
            value={this.state.inputKeyword}
            onKeyPress={this.handleEnterSearch}
          />
          <div className="default-slice-line" />
          <div className="focus-slice-line" />
          {this.state.isShowMatchContainer && (
            <div className="search-dropdown div-scroll">
              {this.getMatchItems(matchItems)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchInput;
