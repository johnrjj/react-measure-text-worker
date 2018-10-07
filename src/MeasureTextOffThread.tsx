import { Component } from 'react';
import { LruCache } from './util/lru-cache';
import { WorkerMessageResponsePayload } from './worker';

const worker = new Worker('worker.ts');
let workerMessageCounter = 0;

export interface MeasureTextOffThreadState {
  width: number;
  height: number;
}

export interface MeasureTextOffThreadProps {
  text: string;
  fontFamily: string;
  fontSize: string;
  children: (state: MeasureTextOffThreadState) => string;
}

class MeasureTextOffThread extends Component<
  MeasureTextOffThreadProps,
  MeasureTextOffThreadState
> {
  cache: LruCache<string, any>;
  constructor(props: any) {
    super(props);
    this.cache = new LruCache<string, any>();
    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    worker.addEventListener('message', this.handleMessageFromWorker);
    this.measure();
  }

  handleMessageFromWorker = ({
    data,
  }: {
    data: WorkerMessageResponsePayload;
  }) => {
    this.setState({
      width: data.width,
      // not ready to calc height yet render uses fontSize prop instead for now
    });
  };

  componentDidUpdate(prevProps: MeasureTextOffThreadProps) {
    if (
      this.props.text !== prevProps.text ||
      this.props.fontSize !== prevProps.fontSize ||
      this.props.fontFamily !== prevProps.fontFamily
    ) {
      this.measure();
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      height: parseFloat(this.props.fontSize), // temp until we calc height on our own
    });
  }

  componentWillUnmount() {
    worker.removeEventListener('message', this.handleMessageFromWorker);
  }

  private measure() {
    // MessagePort queue implicitly created when worker is (if worried about multiple msgs)
    // http://www.w3.org/TR/2015/WD-workers-20150924/#communicating-with-a-dedicated-worker
    // Messages will also FIFO, don't need to worry about ordering
    worker.postMessage({
      id: workerMessageCounter++,
      text: this.props.text,
      font: `${this.props.fontSize} ${this.props.fontFamily}`,
    });
  }
}

export { MeasureTextOffThread };
