import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';


class CommunityDropdown extends Component {
  constructor(props) {
    super(props);

    const dropdownOptions = [];
  }
  
  componentDidUpdate() {
    console.log(`is this bit an array: ${Array.isArray(this.props.communities)}`);
    for (let i in this.props.communities) {
      if(this.props.communities[i].status === "Live") {
        let optionToAdd = {
          key: this.props.communities[i].id,
          value: this.props.communities[i],
          text: this.props.communities[i].name
        };

        console.log(`optionToAdd is: ${optionToAdd}`);

        dropdownOptions.push(optionToAdd);
      }
    }

    console.log(`the dropdown options are: ${dropdownOptions}`);
  }
  render() {
    return(
      <Dropdown 
        placeholder="select a community" 
        fluid
        search
        selection
        options={this.dropdownOptions}
        onChange={() => console.log(`on change selected, value is: ${this.dropdownOptions.value}`)}
        />
    );
  };
}

function mapStateToProps({ communities }) {
  return ({ communities });
};

export default connect(mapStateToProps)(CommunityDropdown);