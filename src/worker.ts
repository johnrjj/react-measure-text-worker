import { measureText, customMeasureText } from './util/canvas';
// import { TextMetrics } from './util/canvas-text-measure';

declare var OffscreenCanvas: any; // Too new for typings!
const canvas: HTMLCanvasElement = new OffscreenCanvas(100, 100);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let messagesProcessedCount = 0;

export interface WorkerMessageResponsePayload {
  input: any;
  width: any;
  height?: any;
  workerJobId: number;
}

// TypeScript thinks the second param for postMessage is required (?)
// When local, it's implicit and not needed.
export type PostMessage = (data: WorkerMessageResponsePayload) => void;

export type MessageTypes = 'CANVAS' | 'GET__BOUNDING_CLIENT_RECT';

export interface WorkerMessageRequestPayload {
  text: string;
  font: string;
  type: MessageTypes;
}

onmessage = (evt: { data: WorkerMessageRequestPayload }) => {
  messagesProcessedCount++;
  switch (evt.data.type) {
    case 'GET__BOUNDING_CLIENT_RECT':
      throw new Error('Not yet implemented');
    case 'CANVAS':
    default:
      const textMetrics = customMeasureText(canvas, evt.data.text);
      console.log(textMetrics);
      (postMessage as PostMessage)({
        input: evt.data,
        width: textMetrics.width,
        height: textMetrics.height,
        workerJobId: messagesProcessedCount,
      } as WorkerMessageResponsePayload);
      return;
  }
};
