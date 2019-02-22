/**
 *
 * WordBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.span`
  background: gray;
  width: 50px;
  height: 50px;
  text-align: center;
  margin-left: 1px;
  margin-bottom: 1px;
  font-size: 2em;
`;

/* eslint-disable react/prefer-stateless-function */
class WordBox extends React.Component {
  render() {
    return <Box>{this.props.value}</Box>;
  }
}

WordBox.propTypes = {};

export default WordBox;
