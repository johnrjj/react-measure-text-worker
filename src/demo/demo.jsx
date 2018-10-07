import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MeasureTextOffThread } from '../MeasureTextOffThread.tsx';
import './reset.css';
import './styles.css';

const Highlight = ({ width, height }) => (
  <div
    style={{
      position: 'absolute',
      backgroundColor: 'yellow',
      opacity: 0.5,
      width: `${width || 0}px`,
      bottom: '-10px',
      left: 0,
      height: `${height || 0}`,
      willChange: 'width',
      border: 'none',
      transform: `translate(calc(-50% + ${width / 2}px), calc(-50% + ${height / 2}px))`,
      background: 'linear-gradient(135deg,#73a5ff,#5477f5) no-repeat',
      color: '#fff',
      padding: '5px 3px',
      // padding: `${height / 4}px ${height / 8}px`,
      // margin: `-${height / 4}px -${(height) / 8}px`,
      borderRadius: '4px',
      boxShadow: '0 4px 8px -1px rgba(0,32,128,.2), 0 8px 24px -2px rgba(0,128,255,.1)',
      fontSize: '20px',
      transition: 'width 0.007s, height 0.1s, background-color 2s, transform 0.007s',
      transitionTimingFunction: 'cubic-bezier(.2,.74,.66,.52)',
      outline: '0',
      willChange: 'opacity',
    }}
  />
);

const TOOLTIP_OFFSET = 40;
const Tooltip = ({ width, height }) => (
  <div
    className="tooltip"
    style={{
      fontSize: '20px',
      position: 'absolute',
      width: '200px',
      height: '50px',
      opacity: 0.28,
      transform: `translate(calc(-50% + ${width / 2}px), calc(-50% - ${height / 2}px - ${height +
        TOOLTIP_OFFSET}px))`,
      transition: 'width 2s, height 2s, background-color 2s, transform 0.5s',
      // http://cubic-bezier.com/#.11,.84,.49,.97
      transitionTimingFunction: 'cubic-bezier(.25,.75,.5,1.25)',
      willChange: 'transform',
    }}
  >
    Tooltip
    <div className="tooltip__arrow" />
  </div>
);

const Container = ({ children, ...rest }) => (
  <span style={{ position: 'relative' }} {...rest}>
    {children}
  </span>
);

const Content = ({ children, style, ...rest }) => (
  <span style={{ display: 'inline-block', position: 'relative', ...style }} {...rest}>
    {children}
  </span>
);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: 'as you type, it will calculate highlight and tooltip',
      fontSizeText: '20',
    };
  }
  render() {
    const fontSize = `${this.state.fontSizeText}px`;
    const fontFamily = 'Lato';

    return (
      <div style={{ fontSize, marginTop: '20px', marginLeft: '128px' }}>
        <div style={{ marginBottom: '128px' }}>
          <input
            value={this.state.inputText}
            onChange={e => this.setState({ inputText: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '128px' }}>
          <span>before </span>
          <MeasureTextOffThread
            text={this.state.inputText || ' '}
            fontSize={fontSize}
            fontFamily={fontFamily}
          >
            {({ width, height }) => (
              <Container>
                <Highlight width={width} height={height} />
                <Content style={{ fontFamily, fontSize }}>
                  {this.state.inputText || ' '}
                  <Tooltip width={width} height={height} />
                </Content>
              </Container>
            )}
          </MeasureTextOffThread>
          <span> after</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('app'));
