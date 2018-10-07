import { measureText } from './util/canvas';

const canvas: HTMLCanvasElement = new OffscreenCanvas(100, 100);
let messagesProcessedCount = 0;

export interface WorkerMessageResponsePayload {
  input: any;
  width: any;
  height?: any;
  workerJobId: number;
}

export type PostMessage = (data: WorkerMessageResponsePayload) => void;

export type MessageTypes = 'CANVAS' | 'GET_BOUNDING_CLIENT_RECT';

export interface WorkerMessageRequestPayload {
  text: string;
  fontFamily: string;
  fontSize: string;
  type: MessageTypes;
}

export interface WorkerMessageRequest extends MessageEvent {
  data: WorkerMessageRequestPayload;
}

onmessage = (msg: WorkerMessageRequest) => {
  messagesProcessedCount++;
  const { data } = msg;
  switch (data.type) {
    case 'GET_BOUNDING_CLIENT_RECT':
      throw new Error('Not yet implemented');
    case 'CANVAS':
    default:
      const textMetrics = measureText(canvas, data);
      (postMessage as PostMessage)({
        input: data,
        width: textMetrics.width,
        height: textMetrics.height,
        workerJobId: messagesProcessedCount,
      } as WorkerMessageResponsePayload);
      return;
  }
};
