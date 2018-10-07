import { TextMetrics } from './canvas-text-measure';
import { TextStyle } from './canvas-text-style';

function measureText(
  ctx: CanvasRenderingContext2D,
  { text, font }: { text: string; font: string }
) {
  ctx.font = font;
  return ctx.measureText(text);
}

function customMeasureText(
  canvas: HTMLCanvasElement,
  {
    text,
    fontFamily,
    fontSize,
  }: { text: string; fontFamily: string; fontSize: string }
) {
  const style = new TextStyle({
    fontFamily,
    fontSize,
  });
  return TextMetrics.measureText(text, style, false, canvas);
}

export { measureText, customMeasureText };
