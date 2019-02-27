import React from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";

const Box = styled.span`
  background: gray;
  width: 50px;
  height: 50px;
  text-align: center;
  margin-left: 1px;
  margin-bottom: 1px;
  font-size: 2em;
  &:before {
    content: '${props => props.char}';
  }
`;

/* eslint-disable react/prefer-stateless-function */

const SELECTED_COLOR = "red";
const CORRECT_COLOR = "green";
const DISPLAY_COLOR = "gray";

class WordBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: DISPLAY_COLOR,
      selected: false
    };
  }

  toggle() {
    this.setState(
      {
        selected: !this.state.selected
      },
      () => this.props.onToggled(this.props.value, this.state.selected)
    );
  }

  render() {
    const stylesObj = {
      background: this.state.selected
        ? SELECTED_COLOR
        : this.props.completed
        ? CORRECT_COLOR
        : DISPLAY_COLOR
    };

    return (
      <Box
        onClick={() => {
          this.toggle();
        }}
        style={stylesObj}
        char={this.props.value.char} // display by pseudo class ::before to disable browser find feature
      />
    );
  }
}

WordBox.propTypes = {};

export default WordBox;
