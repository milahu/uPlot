

// this file was auto-generated with ts-types-parser

// source file: node_modules/typescript/lib/lib.dom.d.ts
// main type: CanvasRenderingContext2D

module.exports = {

canvas: (ctx, { value }) => (ctx.canvas = value),
restore: (ctx) => ctx.restore(),
save: (ctx) => ctx.save(),
getTransform: (ctx) => ctx.getTransform(),
resetTransform: (ctx) => ctx.resetTransform(),
rotate: (ctx, { angle }) => ctx.rotate(angle),
scale: (ctx, { x, y }) => ctx.scale(x, y),
setTransform: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { transform } = parms;
    return ctx.setTransform(transform);
  }
  if (n == 6) {
    const { a, b, c, d, e, f } = parms;
    return ctx.setTransform(a, b, c, d, e, f);
  }
  throw `unhandled argc ${n} in method setTransform with parms ${parms}`;
},
transform: (ctx, { a, b, c, d, e, f }) => ctx.transform(a, b, c, d, e, f),
translate: (ctx, { x, y }) => ctx.translate(x, y),
globalAlpha: (ctx, { value }) => (ctx.globalAlpha = value),
globalCompositeOperation: (ctx, { value }) => (ctx.globalCompositeOperation = value),
imageSmoothingEnabled: (ctx, { value }) => (ctx.imageSmoothingEnabled = value),
imageSmoothingQuality: (ctx, { value }) => (ctx.imageSmoothingQuality = value),
fillStyle: (ctx, { value }) => (ctx.fillStyle = value),
strokeStyle: (ctx, { value }) => (ctx.strokeStyle = value),
createLinearGradient: (ctx, { x0, y0, x1, y1 }) => ctx.createLinearGradient(x0, y0, x1, y1),
createPattern: (ctx, { image, repetition }) => ctx.createPattern(image, repetition),
createRadialGradient: (ctx, { x0, y0, r0, x1, y1, r1 }) => ctx.createRadialGradient(x0, y0, r0, x1, y1, r1),
shadowBlur: (ctx, { value }) => (ctx.shadowBlur = value),
shadowColor: (ctx, { value }) => (ctx.shadowColor = value),
shadowOffsetX: (ctx, { value }) => (ctx.shadowOffsetX = value),
shadowOffsetY: (ctx, { value }) => (ctx.shadowOffsetY = value),
filter: (ctx, { value }) => (ctx.filter = value),
clearRect: (ctx, { x, y, w, h }) => ctx.clearRect(x, y, w, h),
fillRect: (ctx, { x, y, w, h }) => ctx.fillRect(x, y, w, h),
strokeRect: (ctx, { x, y, w, h }) => ctx.strokeRect(x, y, w, h),
beginPath: (ctx) => ctx.beginPath(),
clip: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { fillRule } = parms;
    return ctx.clip(fillRule);
  }
  if (n == 2) {
    const { path, fillRule } = parms;
    return ctx.clip(path, fillRule);
  }
  throw `unhandled argc ${n} in method clip with parms ${parms}`;
},
fill: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { fillRule } = parms;
    return ctx.fill(fillRule);
  }
  if (n == 2) {
    const { path, fillRule } = parms;
    return ctx.fill(path, fillRule);
  }
  throw `unhandled argc ${n} in method fill with parms ${parms}`;
},
isPointInPath: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { x, y, fillRule } = parms;
    return ctx.isPointInPath(x, y, fillRule);
  }
  if (n == 4) {
    const { path, x, y, fillRule } = parms;
    return ctx.isPointInPath(path, x, y, fillRule);
  }
  throw `unhandled argc ${n} in method isPointInPath with parms ${parms}`;
},
isPointInStroke: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 2) {
    const { x, y } = parms;
    return ctx.isPointInStroke(x, y);
  }
  if (n == 3) {
    const { path, x, y } = parms;
    return ctx.isPointInStroke(path, x, y);
  }
  throw `unhandled argc ${n} in method isPointInStroke with parms ${parms}`;
},
stroke: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 0) {
    return ctx.stroke();
  }
  if (n == 1) {
    const { path } = parms;
    return ctx.stroke(path);
  }
  throw `unhandled argc ${n} in method stroke with parms ${parms}`;
},
drawFocusIfNeeded: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { element } = parms;
    return ctx.drawFocusIfNeeded(element);
  }
  if (n == 2) {
    const { path, element } = parms;
    return ctx.drawFocusIfNeeded(path, element);
  }
  throw `unhandled argc ${n} in method drawFocusIfNeeded with parms ${parms}`;
},
scrollPathIntoView: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 0) {
    return ctx.scrollPathIntoView();
  }
  if (n == 1) {
    const { path } = parms;
    return ctx.scrollPathIntoView(path);
  }
  throw `unhandled argc ${n} in method scrollPathIntoView with parms ${parms}`;
},
fillText: (ctx, { text, x, y, maxWidth }) => ctx.fillText(text, x, y, maxWidth),
measureText: (ctx, { text }) => ctx.measureText(text),
strokeText: (ctx, { text, x, y, maxWidth }) => ctx.strokeText(text, x, y, maxWidth),
drawImage: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { image, dx, dy } = parms;
    return ctx.drawImage(image, dx, dy);
  }
  if (n == 5) {
    const { image, dx, dy, dw, dh } = parms;
    return ctx.drawImage(image, dx, dy, dw, dh);
  }
  if (n == 9) {
    const { image, sx, sy, sw, sh, dx, dy, dw, dh } = parms;
    return ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }
  throw `unhandled argc ${n} in method drawImage with parms ${parms}`;
},
createImageData: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { imagedata } = parms;
    return ctx.createImageData(imagedata);
  }
  if (n == 2) {
    const { sw, sh } = parms;
    return ctx.createImageData(sw, sh);
  }
  throw `unhandled argc ${n} in method createImageData with parms ${parms}`;
},
getImageData: (ctx, { sx, sy, sw, sh }) => ctx.getImageData(sx, sy, sw, sh),
putImageData: (ctx, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { imagedata, dx, dy } = parms;
    return ctx.putImageData(imagedata, dx, dy);
  }
  if (n == 7) {
    const { imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight } = parms;
    return ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
  }
  throw `unhandled argc ${n} in method putImageData with parms ${parms}`;
},
lineCap: (ctx, { value }) => (ctx.lineCap = value),
lineDashOffset: (ctx, { value }) => (ctx.lineDashOffset = value),
lineJoin: (ctx, { value }) => (ctx.lineJoin = value),
lineWidth: (ctx, { value }) => (ctx.lineWidth = value),
miterLimit: (ctx, { value }) => (ctx.miterLimit = value),
getLineDash: (ctx) => ctx.getLineDash(),
setLineDash: (ctx, { value }) => ctx.setLineDash(value),
direction: (ctx, { value }) => (ctx.direction = value),
font: (ctx, { value }) => (ctx.font = value),
textAlign: (ctx, { value }) => (ctx.textAlign = value),
textBaseline: (ctx, { value }) => (ctx.textBaseline = value),
arc: (ctx, { x, y, radius, startAngle, endAngle, anticlockwise }) => ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise),
arcTo: (ctx, { x1, y1, x2, y2, radius }) => ctx.arcTo(x1, y1, x2, y2, radius),
bezierCurveTo: (ctx, { cp1x, cp1y, cp2x, cp2y, x, y }) => ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y),
closePath: (ctx) => ctx.closePath(),
ellipse: (ctx, { x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise }) => ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise),
lineTo: (ctx, { x, y }) => ctx.lineTo(x, y),
moveTo: (ctx, { x, y }) => ctx.moveTo(x, y),
quadraticCurveTo: (ctx, { cpx, cpy, x, y }) => ctx.quadraticCurveTo(cpx, cpy, x, y),
rect: (ctx, { x, y, w, h }) => ctx.rect(x, y, w, h),

};

