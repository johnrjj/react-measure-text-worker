import { TextMetricsV2 } from './canvas-text-measure';
import { TextStyle } from './canvas-text-style';

function builtInMeasureText(
  ctx: CanvasRenderingContext2D,
  { text, font }: { text: string; font: string }
) {
  ctx.font = font;
  return ctx.measureText(text);
}

function measureText(
  canvas: HTMLCanvasElement,
  { text, fontFamily, fontSize }: { text: string; fontFamily: string; fontSize: string }
) {
  const style = new TextStyle({
    fontFamily,
    fontSize,
    breakWords: false,
    wordWrap: false,
    wordWrapWidth: 200,
  });
  return TextMetricsV2.measureText(text, style, false, canvas);
}

export { builtInMeasureText, measureText };
