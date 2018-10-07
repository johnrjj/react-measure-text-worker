import { TextMetrics } from './canvas-text-measure';
import { TextStyle } from './canvas-text-style';

function measureText(
  ctx: CanvasRenderingContext2D,
  { text, font }: { text: string; font: string }
) {
  ctx.font = font;
  return ctx.measureText(text);
}

function customMeasureText(canvas: HTMLCanvasElement, text: string) {
  const style = new TextStyle({
    fontFamily: 'Lato',
    fontSize: 20,
  });
  return TextMetrics.measureText(text, style, false, canvas);
}

export { measureText, customMeasureText };
