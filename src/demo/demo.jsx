import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Typist from 'react-typist';
import { MeasureTextOffThread } from '../MeasureTextOffThread.tsx';
import './reset.css';
import 'react-typist/dist/Typist.css';
import './styles.css';

const Highlight = ({ width, height }) => (
  <div
    style={{
      position: 'absolute',
      backgroundColor: 'yellow',
      opacity: 0.5,
      width: `${width || 0}px`,
      bottom: '-8px',
      left: 0,
      height: `${height}`,
      willChange: 'width',
      border: 'none',
      transform: `translate(calc(-50% + ${width / 2}px), calc(-50% + ${height / 2}px))`,
      background: 'linear-gradient(135deg,#73a5ff,#5477f5) no-repeat',
      color: '#fff',
      padding: '5px 3px',
      borderRadius: '4px',
      boxShadow: '0 4px 8px -1px rgba(0,32,128,.2), 0 8px 24px -2px rgba(0,128,255,.1)',
      fontSize: '20px',
      transition: 'width 0.000s, height 0.1s, background-color 2s, transform 0.000s',
      transitionTimingFunction: 'cubic-bezier(.2,.74,.66,.52)',
      outline: '0',
      willChange: 'opacity',
    }}
  />
);

const TOOLTIP_OFFSET = 40;
const Tooltip = ({ width, height, children }) => (
  <div
    className="tooltip"
    style={{
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'center',
      fontSize: '20px',
      position: 'absolute',
      padding: '16px',
      width: '256px',
      height: '64px',
      opacity: 0.28,
      transform: `translate(calc(-50% + ${(width || 20) / 2}px), calc(-50% - ${(height || 20) /
        2}px - ${(height || 20) + TOOLTIP_OFFSET}px))`,
      transition: 'width 2s, height 2s, background-color 2s, transform 0.5s',
      // http://cubic-bezier.com/#.11,.84,.49,.97
      transitionTimingFunction: 'cubic-bezier(.25,.75,.5,1.25)',
      willChange: 'transform',
    }}
  >
    {children}
    <div className="tooltip__arrow" />
  </div>
);

const Container = ({ children, ...rest }) => (
  <span style={{ position: 'relative' }} {...rest}>
    {children}
  </span>
);

const Content = ({ children, style, ...rest }) => (
  <pre style={{ display: 'inline-block', position: 'relative', ...style }} {...rest}>
    {children}
  </pre>
);

const DemoContainer = styled.div`
  font-size: ${props => props.fontSize};
  margin: 128px;
`;

const Hidden = styled.div`
  opacity: 0;
`;

const Title = styled.h1`
  font-size: 64px;
  margin: 128px;
`;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: '',
      fontSizeText: '24',
      fontFamily: 'Open Sans',
    };
    this.onTextType = this.onTextType.bind(this);
  }

  onTextType(char, _charIdx) {
    const operation = char === '🔙' ? 'delete' : 'add';
    this.setState(prevState => ({
      typedText:
        operation === 'add'
          ? prevState.typedText + char
          : prevState.typedText.substring(0, prevState.typedText.length - 1),
    }));
  }

  render() {
    const { fontFamily, fontSizeText, typedText } = this.state;
    const fontSize = `${fontSizeText}px`;

    return (
      <div>
        <Title>Measure Text Off-Thread Demo</Title>
        <DemoContainer fontSize={fontSize}>
          <MeasureTextOffThread text={typedText || ' '} fontSize={fontSize} fontFamily={fontFamily}>
            {({ width, height }) => (
              <Container>
                <Highlight width={width} height={height} />
                <Content style={{ fontFamily, fontSize }}>
                  {typedText || ' '}
                  <Tooltip width={width} height={height}>
                    Tooltip Content
                  </Tooltip>
                </Content>
              </Container>
            )}
          </MeasureTextOffThread>

          <Hidden>
            <Typist startDelay={250} onCharacterTyped={this.onTextType}>
              <Typist.Delay ms={250} />
              measurements here are calculated off the main thread, asynchronously.
              <Typist.Delay ms={750} />
              <pre> cool.</pre>
              <Typist.Backspace count={5} delay={1350} />
              really cool.
            </Typist>
          </Hidden>
        </DemoContainer>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('app'));
