import React from 'react';
import _ from 'lodash';

// Random component
export const Completionist = () => (
  <span style={{ color: 'blue' }}>Không được khôn nhắm =]]</span>
);

// Renderer callback with condition
export default ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        Time left:
        <span style={{ color: 'red', marginLeft: '10px' }}>
          {_.padStart(minutes, 2, '0')}:{_.padStart(seconds, 2, '0')}
        </span>
      </span>
    );
  }
};
