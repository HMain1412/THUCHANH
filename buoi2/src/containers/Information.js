import React from 'react';

function Information({ userName }) {
  return (
    <div className="info">
      <p>Xin chào: {userName}</p>
    </div>
  );
}

export default Information;
