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
    // todo: if no requests in flight, stop listening to worker messages
    this.setState({
      width: data.width,
      height: data.height,
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
    return this.props.children(this.state);
  }

  componentWillUnmount() {
    worker.removeEventListener('message', this.handleMessageFromWorker);
  }

  private measure() {
    // FIFO MessagePort queue implicitly created when worker is created
    // http://www.w3.org/TR/2015/WD-workers-20150924/#communicating-with-a-dedicated-worker
    worker.postMessage({
      id: workerMessageCounter++,
      text: this.props.text,
      fontFamily: this.props.fontFamily,
      fontSize: this.props.fontSize,
    });
  }
}

export { MeasureTextOffThread };
