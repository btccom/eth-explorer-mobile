import React, { Component } from 'react';
import { second2Relative } from 'utils';
class RelativeLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      currentSecond: this.props.second - 0,
      relativeTime: ''
    };
  }
  componentWillMount() {}

  componentDidMount() {
    let intervalId = setInterval(this.loopRelative.bind(this), 1000);
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSecond: nextProps.second - 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loopRelative = () => {
    this.setState({
      currentSecond: this.state.currentSecond + 1
    });
  };

  render() {
    return (
      <span>{second2Relative(this.state.currentSecond, this.props.lang)}</span>
    );
  }
}

export default RelativeLoop;
