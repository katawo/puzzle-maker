import React from 'react';

// Random component
const Completionist = () => <span>Không được khôn nhắm =]]</span>;

// Renderer callback with condition
export default ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
