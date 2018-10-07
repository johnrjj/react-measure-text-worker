function measureText(
  ctx: CanvasRenderingContext2D,
  { text, font }: { text: string; font: string }
) {
  ctx.font = font;
  return ctx.measureText(text).width;
}

export { measureText };
