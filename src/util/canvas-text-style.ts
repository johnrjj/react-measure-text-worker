const defaultStyle = {
  align: 'left',
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: 'black',
  dropShadowDistance: 5,
  fill: 'black',
  fillGradientType: 0,
  fillGradientStops: [],
  fontFamily: 'Arial',
  fontSize: 26,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: 'miter',
  miterLimit: 10,
  padding: 0,
  stroke: 'black',
  strokeThickness: 0,
  textBaseline: 'alphabetic',
  trim: false,
  whiteSpace: 'pre',
  wordWrap: false,
  wordWrapWidth: 100,
  leading: 0,
};

const genericFontFamilies = [
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
];

/**
 * A TextStyle Object decorates a Text Object. It can be shared between
 * multiple Text objects. Changing the style will update all text objects using it.
 * It can be generated [here](https://pixijs.io/pixi-text-style).
 *
 * @class
 * @memberof PIXI
 */
class TextStyle {
  styleID: number;
  _align: any;
  _breakWords: any;
  _dropShadow: any;
  _dropShadowAlpha: any;
  _dropShadowAngle: any;
  _dropShadowBlur: any;
  _dropShadowColor: any;
  _dropShadowDistance: any;
  _fill: any;
  _fillGradientType: any;
  _fillGradientStops: any;
  _fontFamily: any;
  _fontSize: any;
  _fontStyle: any;
  _fontVariant: any;
  _fontWeight: any;
  _letterSpacing: any;
  _lineHeight: any;
  _leading: any;
  _lineJoin: any;
  _miterLimit: any;
  _padding: any;
  _stroke: any;
  _strokeThickness: any;
  _textBaseline: any;
  _trim: any;
  _whiteSpace: any;
  _wordWrap: any;
  _wordWrapWidth: any;
  /**
   * @param {object} [style] - The style parameters
   * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center' or 'right'),
   *  does not affect single line text
   * @param {boolean} [style.breakWords=false] - Indicates if lines can be wrapped within words, it
   *  needs wordWrap to be set to true
   * @param {boolean} [style.dropShadow=false] - Set a drop shadow for the text
   * @param {number} [style.dropShadowAlpha=1] - Set alpha for the drop shadow
   * @param {number} [style.dropShadowAngle=Math.PI/6] - Set a angle of the drop shadow
   * @param {number} [style.dropShadowBlur=0] - Set a shadow blur radius
   * @param {string|number} [style.dropShadowColor='black'] - A fill style to be used on the dropshadow e.g 'red', '#00FF00'
   * @param {number} [style.dropShadowDistance=5] - Set a distance of the drop shadow
   * @param {string|string[]|number|number[]|CanvasGradient|CanvasPattern} [style.fill='black'] - A canvas
   *  fillstyle that will be used on the text e.g 'red', '#00FF00'. Can be an array to create a gradient
   *  eg ['#000000','#FFFFFF']
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   * @param {number} [style.fillGradientType=PIXI.TEXT_GRADIENT.LINEAR_VERTICAL] - If fill is an array of colours
   *  to create a gradient, this can change the type/direction of the gradient. See {@link PIXI.TEXT_GRADIENT}
   * @param {number[]} [style.fillGradientStops] - If fill is an array of colours to create a gradient, this array can set
   * the stop points (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   * @param {string|string[]} [style.fontFamily='Arial'] - The font family
   * @param {number|string} [style.fontSize=26] - The font size (as a number it converts to px, but as a string,
   *  equivalents are '26px','20pt','160%' or '1.6em')
   * @param {string} [style.fontStyle='normal'] - The font style ('normal', 'italic' or 'oblique')
   * @param {string} [style.fontVariant='normal'] - The font variant ('normal' or 'small-caps')
   * @param {string} [style.fontWeight='normal'] - The font weight ('normal', 'bold', 'bolder', 'lighter' and '100',
   *  '200', '300', '400', '500', '600', '700', 800' or '900')
   * @param {number} [style.leading=0] - The space between lines
   * @param {number} [style.letterSpacing=0] - The amount of spacing between letters, default is 0
   * @param {number} [style.lineHeight] - The line height, a number that represents the vertical space that a letter uses
   * @param {string} [style.lineJoin='miter'] - The lineJoin property sets the type of corner created, it can resolve
   *      spiked text issues. Possible values "miter" (creates a sharp corner), "round" (creates a round corner) or "bevel"
   *      (creates a squared corner).
   * @param {number} [style.miterLimit=10] - The miter limit to use when using the 'miter' lineJoin mode. This can reduce
   *      or increase the spikiness of rendered text.
   * @param {number} [style.padding=0] - Occasionally some fonts are cropped. Adding some padding will prevent this from
   *     happening by adding padding to all sides of the text.
   * @param {string|number} [style.stroke='black'] - A canvas fillstyle that will be used on the text stroke
   *  e.g 'blue', '#FCFF00'
   * @param {number} [style.strokeThickness=0] - A number that represents the thickness of the stroke.
   *  Default is 0 (no stroke)
   * @param {boolean} [style.trim=false] - Trim transparent borders
   * @param {string} [style.textBaseline='alphabetic'] - The baseline of the text that is rendered.
   * @param {boolean} [style.whiteSpace='pre'] - Determines whether newlines & spaces are collapsed or preserved "normal"
   *      (collapse, collapse), "pre" (preserve, preserve) | "pre-line" (preserve, collapse). It needs wordWrap to be set to true
   * @param {boolean} [style.wordWrap=false] - Indicates if word wrap should be used
   * @param {number} [style.wordWrapWidth=100] - The width at which text will wrap, it needs wordWrap to be set to true
   */
  constructor(style: {}) {
    this.styleID = 0;

    this.reset();

    deepCopyProperties(this, style, style);
  }

  /**
   * Creates a new TextStyle object with the same values as this one.
   * Note that the only the properties of the object are cloned.
   *
   * @return {PIXI.TextStyle} New cloned TextStyle object
   */
  clone() {
    const clonedProperties = {};

    deepCopyProperties(clonedProperties, this, defaultStyle);

    return new TextStyle(clonedProperties);
  }

  /**
   * Resets all properties to the defaults specified in TextStyle.prototype._default
   */
  reset() {
    deepCopyProperties(this, defaultStyle, defaultStyle);
  }

  /**
   * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
   *
   * @member {string}
   */
  get align() {
    return this._align;
  }
  set align(
    align // eslint-disable-line require-jsdoc
  ) {
    if (this._align !== align) {
      this._align = align;
      this.styleID++;
    }
  }

  /**
   * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
   *
   * @member {boolean}
   */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(
    breakWords // eslint-disable-line require-jsdoc
  ) {
    if (this._breakWords !== breakWords) {
      this._breakWords = breakWords;
      this.styleID++;
    }
  }

  /**
   * Set a drop shadow for the text
   *
   * @member {boolean}
   */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(
    dropShadow // eslint-disable-line require-jsdoc
  ) {
    if (this._dropShadow !== dropShadow) {
      this._dropShadow = dropShadow;
      this.styleID++;
    }
  }

  /**
   * Set alpha for the drop shadow
   *
   * @member {number}
   */
  get dropShadowAlpha() {
    return this._dropShadowAlpha;
  }
  set dropShadowAlpha(
    dropShadowAlpha // eslint-disable-line require-jsdoc
  ) {
    if (this._dropShadowAlpha !== dropShadowAlpha) {
      this._dropShadowAlpha = dropShadowAlpha;
      this.styleID++;
    }
  }

  /**
   * Set a angle of the drop shadow
   *
   * @member {number}
   */
  get dropShadowAngle() {
    return this._dropShadowAngle;
  }
  set dropShadowAngle(
    dropShadowAngle // eslint-disable-line require-jsdoc
  ) {
    if (this._dropShadowAngle !== dropShadowAngle) {
      this._dropShadowAngle = dropShadowAngle;
      this.styleID++;
    }
  }

  /**
   * Set a shadow blur radius
   *
   * @member {number}
   */
  get dropShadowBlur() {
    return this._dropShadowBlur;
  }
  set dropShadowBlur(
    dropShadowBlur // eslint-disable-line require-jsdoc
  ) {
    if (this._dropShadowBlur !== dropShadowBlur) {
      this._dropShadowBlur = dropShadowBlur;
      this.styleID++;
    }
  }

  /**
   * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
   *
   * @member {string|number}
   */
  get dropShadowColor() {
    return this._dropShadowColor;
  }
  set dropShadowColor(
    dropShadowColor // eslint-disable-line require-jsdoc
  ) {
    const outputColor = getColor(dropShadowColor);
    if (this._dropShadowColor !== outputColor) {
      this._dropShadowColor = outputColor;
      this.styleID++;
    }
  }

  /**
   * Set a distance of the drop shadow
   *
   * @member {number}
   */
  get dropShadowDistance() {
    return this._dropShadowDistance;
  }
  set dropShadowDistance(
    dropShadowDistance // eslint-disable-line require-jsdoc
  ) {
    if (this._dropShadowDistance !== dropShadowDistance) {
      this._dropShadowDistance = dropShadowDistance;
      this.styleID++;
    }
  }

  /**
   * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
   * Can be an array to create a gradient eg ['#000000','#FFFFFF']
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   *
   * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  get fill() {
    return this._fill;
  }
  set fill(
    fill // eslint-disable-line require-jsdoc
  ) {
    const outputColor = getColor(fill);
    if (this._fill !== outputColor) {
      this._fill = outputColor;
      this.styleID++;
    }
  }

  /**
   * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
   * See {@link PIXI.TEXT_GRADIENT}
   *
   * @member {number}
   */
  get fillGradientType() {
    return this._fillGradientType;
  }
  set fillGradientType(
    fillGradientType // eslint-disable-line require-jsdoc
  ) {
    if (this._fillGradientType !== fillGradientType) {
      this._fillGradientType = fillGradientType;
      this.styleID++;
    }
  }

  /**
   * If fill is an array of colours to create a gradient, this array can set the stop points
   * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   *
   * @member {number[]}
   */
  get fillGradientStops() {
    return this._fillGradientStops;
  }
  set fillGradientStops(
    fillGradientStops // eslint-disable-line require-jsdoc
  ) {
    if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
      this._fillGradientStops = fillGradientStops;
      this.styleID++;
    }
  }

  /**
   * The font family
   *
   * @member {string|string[]}
   */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(
    fontFamily // eslint-disable-line require-jsdoc
  ) {
    if (this.fontFamily !== fontFamily) {
      this._fontFamily = fontFamily;
      this.styleID++;
    }
  }

  /**
   * The font size
   * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
   *
   * @member {number|string}
   */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(
    fontSize // eslint-disable-line require-jsdoc
  ) {
    if (this._fontSize !== fontSize) {
      this._fontSize = fontSize;
      this.styleID++;
    }
  }

  /**
   * The font style
   * ('normal', 'italic' or 'oblique')
   *
   * @member {string}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(
    fontStyle // eslint-disable-line require-jsdoc
  ) {
    if (this._fontStyle !== fontStyle) {
      this._fontStyle = fontStyle;
      this.styleID++;
    }
  }

  /**
   * The font variant
   * ('normal' or 'small-caps')
   *
   * @member {string}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(
    fontVariant // eslint-disable-line require-jsdoc
  ) {
    if (this._fontVariant !== fontVariant) {
      this._fontVariant = fontVariant;
      this.styleID++;
    }
  }

  /**
   * The font weight
   * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
   *
   * @member {string}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(
    fontWeight // eslint-disable-line require-jsdoc
  ) {
    if (this._fontWeight !== fontWeight) {
      this._fontWeight = fontWeight;
      this.styleID++;
    }
  }

  /**
   * The amount of spacing between letters, default is 0
   *
   * @member {number}
   */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(
    letterSpacing // eslint-disable-line require-jsdoc
  ) {
    if (this._letterSpacing !== letterSpacing) {
      this._letterSpacing = letterSpacing;
      this.styleID++;
    }
  }

  /**
   * The line height, a number that represents the vertical space that a letter uses
   *
   * @member {number}
   */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(
    lineHeight // eslint-disable-line require-jsdoc
  ) {
    if (this._lineHeight !== lineHeight) {
      this._lineHeight = lineHeight;
      this.styleID++;
    }
  }

  /**
   * The space between lines
   *
   * @member {number}
   */
  get leading() {
    return this._leading;
  }
  set leading(
    leading // eslint-disable-line require-jsdoc
  ) {
    if (this._leading !== leading) {
      this._leading = leading;
      this.styleID++;
    }
  }

  /**
   * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
   * Default is 'miter' (creates a sharp corner).
   *
   * @member {string}
   */
  get lineJoin() {
    return this._lineJoin;
  }
  set lineJoin(
    lineJoin // eslint-disable-line require-jsdoc
  ) {
    if (this._lineJoin !== lineJoin) {
      this._lineJoin = lineJoin;
      this.styleID++;
    }
  }

  /**
   * The miter limit to use when using the 'miter' lineJoin mode
   * This can reduce or increase the spikiness of rendered text.
   *
   * @member {number}
   */
  get miterLimit() {
    return this._miterLimit;
  }
  set miterLimit(
    miterLimit // eslint-disable-line require-jsdoc
  ) {
    if (this._miterLimit !== miterLimit) {
      this._miterLimit = miterLimit;
      this.styleID++;
    }
  }

  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   *
   * @member {number}
   */
  get padding() {
    return this._padding;
  }
  set padding(
    padding // eslint-disable-line require-jsdoc
  ) {
    if (this._padding !== padding) {
      this._padding = padding;
      this.styleID++;
    }
  }

  /**
   * A canvas fillstyle that will be used on the text stroke
   * e.g 'blue', '#FCFF00'
   *
   * @member {string|number}
   */
  get stroke() {
    return this._stroke;
  }
  set stroke(
    stroke // eslint-disable-line require-jsdoc
  ) {
    const outputColor = getColor(stroke);
    if (this._stroke !== outputColor) {
      this._stroke = outputColor;
      this.styleID++;
    }
  }

  /**
   * A number that represents the thickness of the stroke.
   * Default is 0 (no stroke)
   *
   * @member {number}
   */
  get strokeThickness() {
    return this._strokeThickness;
  }
  set strokeThickness(
    strokeThickness // eslint-disable-line require-jsdoc
  ) {
    if (this._strokeThickness !== strokeThickness) {
      this._strokeThickness = strokeThickness;
      this.styleID++;
    }
  }

  /**
   * The baseline of the text that is rendered.
   *
   * @member {string}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(
    textBaseline // eslint-disable-line require-jsdoc
  ) {
    if (this._textBaseline !== textBaseline) {
      this._textBaseline = textBaseline;
      this.styleID++;
    }
  }

  /**
   * Trim transparent borders
   *
   * @member {boolean}
   */
  get trim() {
    return this._trim;
  }
  set trim(
    trim // eslint-disable-line require-jsdoc
  ) {
    if (this._trim !== trim) {
      this._trim = trim;
      this.styleID++;
    }
  }

  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   *
   * @member {string}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(
    whiteSpace // eslint-disable-line require-jsdoc
  ) {
    if (this._whiteSpace !== whiteSpace) {
      this._whiteSpace = whiteSpace;
      this.styleID++;
    }
  }

  /**
   * Indicates if word wrap should be used
   *
   * @member {boolean}
   */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(
    wordWrap // eslint-disable-line require-jsdoc
  ) {
    if (this._wordWrap !== wordWrap) {
      this._wordWrap = wordWrap;
      this.styleID++;
    }
  }

  /**
   * The width at which text will wrap, it needs wordWrap to be set to true
   *
   * @member {number}
   */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(
    wordWrapWidth // eslint-disable-line require-jsdoc
  ) {
    if (this._wordWrapWidth !== wordWrapWidth) {
      this._wordWrapWidth = wordWrapWidth;
      this.styleID++;
    }
  }

  /**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return {string} Font style string, for passing to `TextMetrics.measureFont()`
   */
  toFontString() {
    // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
    const fontSizeString =
      typeof this.fontSize === 'number' ? `${this.fontSize}px` : this.fontSize;

    // Clean-up fontFamily property by quoting each font name
    // this will support font names with spaces
    let fontFamilies = this.fontFamily;

    if (!Array.isArray(this.fontFamily)) {
      fontFamilies = this.fontFamily.split(',');
    }

    for (let i = fontFamilies.length - 1; i >= 0; i--) {
      // Trim any extra white-space
      let fontFamily = fontFamilies[i].trim();

      // Check if font is already escaped in quotes except for CSS generic fonts
      if (
        !/([\"\'])[^\'\"]+\1/.test(fontFamily) &&
        genericFontFamilies.indexOf(fontFamily) < 0
      ) {
        fontFamily = `"${fontFamily}"`;
      }
      fontFamilies[i] = fontFamily;
    }

    return `${this.fontStyle} ${this.fontVariant} ${
      this.fontWeight
    } ${fontSizeString} ${fontFamilies.join(',')}`;
  }
}

/**
 * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
 * @private
 * @param {number|number[]} color
 * @return {string} The color as a string.
 */
function getSingleColor(color: any) {
  // if (typeof color === 'number')
  // {
  //     return hex2string(color);
  // }
  // else if ( typeof color === 'string' )
  // {
  //     if ( color.indexOf('0x') === 0 )
  //     {
  //         color = color.replace('0x', '#');
  //     }
  // }

  return color;
}

/**
 * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
 * This version can also convert array of colors
 * @private
 * @param {number|number[]} color
 * @return {string} The color as a string.
 */
function getColor(color: any) {
  if (!Array.isArray(color)) {
    return getSingleColor(color);
  } else {
    for (let i = 0; i < color.length; ++i) {
      color[i] = getSingleColor(color[i]);
    }

    return color;
  }
}

/**
 * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
 * This version can also convert array of colors
 * @private
 * @param {Array} array1 First array to compare
 * @param {Array} array2 Second array to compare
 * @return {boolean} Do the arrays contain the same values in the same order
 */
function areArraysEqual(array1: any, array2: any) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Utility function to ensure that object properties are copied by value, and not by reference
 * @private
 * @param {Object} target Target object to copy properties into
 * @param {Object} source Source object for the proporties to copy
 * @param {string} propertyObj Object containing properties names we want to loop over
 */
function deepCopyProperties(target: any, source: any, propertyObj: any) {
  for (const prop in propertyObj) {
    if (Array.isArray(source[prop])) {
      target[prop] = source[prop].slice();
    } else {
      target[prop] = source[prop];
    }
  }
}

export { TextStyle };
