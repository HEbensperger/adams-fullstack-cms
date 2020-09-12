import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

class SelectCommunity extends Component {

  componentDidMount() {
    this.props.onFetchCommunities();
  }
  render() {
    return (
    <div>state: {JSON.stringify(this.props)}</div>
    )
  };
};

const mapStateToProps = (state) => {
  return { isLoading: state.isLoading, data: state.data, error: state.error }
};

const mapDispatchToProps = (dispatch) => {
  return { onFetchCommunities: () => dispatch(fetchCommunities())}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCommunity);