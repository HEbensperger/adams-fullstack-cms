import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { fetchCommunities } from '../actions';

class SelectCommunity extends Component {

  componentDidMount() {
    this.props.onFetchCommunities();
  }


  onDropdownChange(data) {
    console.log(`selected value is: ${data.value}`);
  }

  render() {
    return (
    <Dropdown 
      options={this.props.communities.data}
      placeholder="Select a community"
      fluid
      selection
      loading={this.props.communities.isLoading}
      onChange={ (data) => this.onDropdownChange(data)}
    />
    )
  };
};

const mapStateToProps = ({communities}) => {
  return { communities };
};

const mapDispatchToProps = (dispatch) => {
  return { onFetchCommunities: () => dispatch(fetchCommunities()) }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCommunity);