import React from 'react';

class Cube extends React.Component {
  render() {
    return (
      <div className="wrap">
        <div className="cube">
          <div className="front">{this.props.children}</div>
          <div className="back" />
          <div className="top" />
          <div className="bottom" />
          <div className="left" />
          <div className="right" />
        </div>
      </div>
    );
  }
}

export { Cube };
