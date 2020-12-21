

// this file was auto-generated with ts-types-parser

// source file: node_modules/typescript/lib/lib.dom.d.ts
// main type: CanvasRenderingContext2D

module.exports = {

canvas: (target, { value }) => `${target}.canvas = ${value}`,
restore: (target) => `${target}.restore()`,
save: (target) => `${target}.save()`,
getTransform: (target) => `${target}.getTransform()`,
resetTransform: (target) => `${target}.resetTransform()`,
rotate: (target, { angle }) => `${target}.rotate(${angle})`,
scale: (target, { x, y }) => `${target}.scale(${x}, ${y})`,
setTransform: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { transform } = parms;
    return `${target}.setTransform(${transform})`;
  }
  if (n == 6) {
    const { a, b, c, d, e, f } = parms;
    return `${target}.setTransform(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
  }
  throw `unhandled argc ${n} in method ${target}.setTransform with parms ${parms}`;
},
transform: (target, { a, b, c, d, e, f }) => `${target}.transform(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`,
translate: (target, { x, y }) => `${target}.translate(${x}, ${y})`,
globalAlpha: (target, { value }) => `${target}.globalAlpha = ${value}`,
globalCompositeOperation: (target, { value }) => `${target}.globalCompositeOperation = ${value}`,
imageSmoothingEnabled: (target, { value }) => `${target}.imageSmoothingEnabled = ${value}`,
imageSmoothingQuality: (target, { value }) => `${target}.imageSmoothingQuality = ${value}`,
fillStyle: (target, { value }) => `${target}.fillStyle = ${value}`,
strokeStyle: (target, { value }) => `${target}.strokeStyle = ${value}`,
createLinearGradient: (target, { x0, y0, x1, y1 }) => `${target}.createLinearGradient(${x0}, ${y0}, ${x1}, ${y1})`,
createPattern: (target, { image, repetition }) => `${target}.createPattern(${image}, ${repetition})`,
createRadialGradient: (target, { x0, y0, r0, x1, y1, r1 }) => `${target}.createRadialGradient(${x0}, ${y0}, ${r0}, ${x1}, ${y1}, ${r1})`,
shadowBlur: (target, { value }) => `${target}.shadowBlur = ${value}`,
shadowColor: (target, { value }) => `${target}.shadowColor = ${value}`,
shadowOffsetX: (target, { value }) => `${target}.shadowOffsetX = ${value}`,
shadowOffsetY: (target, { value }) => `${target}.shadowOffsetY = ${value}`,
filter: (target, { value }) => `${target}.filter = ${value}`,
clearRect: (target, { x, y, width, height }) => `${target}.clearRect(${x}, ${y}, ${width}, ${height})`,
fillRect: (target, { x, y, width, height }) => `${target}.fillRect(${x}, ${y}, ${width}, ${height})`,
strokeRect: (target, { x, y, width, height }) => `${target}.strokeRect(${x}, ${y}, ${width}, ${height})`,
beginPath: (target) => `${target}.beginPath()`,
clip: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { fillRule } = parms;
    return `${target}.clip(${fillRule})`;
  }
  if (n == 2) {
    const { path, fillRule } = parms;
    return `${target}.clip(${path}, ${fillRule})`;
  }
  throw `unhandled argc ${n} in method ${target}.clip with parms ${parms}`;
},
fill: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { fillRule } = parms;
    return `${target}.fill(${fillRule})`;
  }
  if (n == 2) {
    const { path, fillRule } = parms;
    return `${target}.fill(${path}, ${fillRule})`;
  }
  throw `unhandled argc ${n} in method ${target}.fill with parms ${parms}`;
},
isPointInPath: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { x, y, fillRule } = parms;
    return `${target}.isPointInPath(${x}, ${y}, ${fillRule})`;
  }
  if (n == 4) {
    const { path, x, y, fillRule } = parms;
    return `${target}.isPointInPath(${path}, ${x}, ${y}, ${fillRule})`;
  }
  throw `unhandled argc ${n} in method ${target}.isPointInPath with parms ${parms}`;
},
isPointInStroke: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 2) {
    const { x, y } = parms;
    return `${target}.isPointInStroke(${x}, ${y})`;
  }
  if (n == 3) {
    const { path, x, y } = parms;
    return `${target}.isPointInStroke(${path}, ${x}, ${y})`;
  }
  throw `unhandled argc ${n} in method ${target}.isPointInStroke with parms ${parms}`;
},
stroke: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 0) {
    return `${target}.stroke()`;
  }
  if (n == 1) {
    const { path } = parms;
    return `${target}.stroke(${path})`;
  }
  throw `unhandled argc ${n} in method ${target}.stroke with parms ${parms}`;
},
drawFocusIfNeeded: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { element } = parms;
    return `${target}.drawFocusIfNeeded(${element})`;
  }
  if (n == 2) {
    const { path, element } = parms;
    return `${target}.drawFocusIfNeeded(${path}, ${element})`;
  }
  throw `unhandled argc ${n} in method ${target}.drawFocusIfNeeded with parms ${parms}`;
},
scrollPathIntoView: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 0) {
    return `${target}.scrollPathIntoView()`;
  }
  if (n == 1) {
    const { path } = parms;
    return `${target}.scrollPathIntoView(${path})`;
  }
  throw `unhandled argc ${n} in method ${target}.scrollPathIntoView with parms ${parms}`;
},
fillText: (target, { text, x, y, maxWidth }) => `${target}.fillText(${text}, ${x}, ${y}, ${maxWidth})`,
measureText: (target, { text }) => `${target}.measureText(${text})`,
strokeText: (target, { text, x, y, maxWidth }) => `${target}.strokeText(${text}, ${x}, ${y}, ${maxWidth})`,
drawImage: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { image, dx, dy } = parms;
    return `${target}.drawImage(${image}, ${dx}, ${dy})`;
  }
  if (n == 5) {
    const { image, dx, dy, dw, dh } = parms;
    return `${target}.drawImage(${image}, ${dx}, ${dy}, ${dw}, ${dh})`;
  }
  if (n == 9) {
    const { image, sx, sy, sw, sh, dx, dy, dw, dh } = parms;
    return `${target}.drawImage(${image}, ${sx}, ${sy}, ${sw}, ${sh}, ${dx}, ${dy}, ${dw}, ${dh})`;
  }
  throw `unhandled argc ${n} in method ${target}.drawImage with parms ${parms}`;
},
createImageData: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 1) {
    const { imagedata } = parms;
    return `${target}.createImageData(${imagedata})`;
  }
  if (n == 2) {
    const { sw, sh } = parms;
    return `${target}.createImageData(${sw}, ${sh})`;
  }
  throw `unhandled argc ${n} in method ${target}.createImageData with parms ${parms}`;
},
getImageData: (target, { sx, sy, sw, sh }) => `${target}.getImageData(${sx}, ${sy}, ${sw}, ${sh})`,
putImageData: (target, parms) => {
  const n = Object.keys(parms).length;
  if (n == 3) {
    const { imagedata, dx, dy } = parms;
    return `${target}.putImageData(${imagedata}, ${dx}, ${dy})`;
  }
  if (n == 7) {
    const { imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight } = parms;
    return `${target}.putImageData(${imagedata}, ${dx}, ${dy}, ${dirtyX}, ${dirtyY}, ${dirtyWidth}, ${dirtyHeight})`;
  }
  throw `unhandled argc ${n} in method ${target}.putImageData with parms ${parms}`;
},
lineCap: (target, { value }) => `${target}.lineCap = ${value}`,
lineDashOffset: (target, { value }) => `${target}.lineDashOffset = ${value}`,
lineJoin: (target, { value }) => `${target}.lineJoin = ${value}`,
lineWidth: (target, { value }) => `${target}.lineWidth = ${value}`,
miterLimit: (target, { value }) => `${target}.miterLimit = ${value}`,
getLineDash: (target) => `${target}.getLineDash()`,
setLineDash: (target, { segments }) => `${target}.setLineDash(${segments})`,
direction: (target, { value }) => `${target}.direction = ${value}`,
font: (target, { value }) => `${target}.font = ${value}`,
textAlign: (target, { value }) => `${target}.textAlign = ${value}`,
textBaseline: (target, { value }) => `${target}.textBaseline = ${value}`,
arc: (target, { x, y, radius, startAngle, endAngle, anticlockwise }) => `${target}.arc(${x}, ${y}, ${radius}, ${startAngle}, ${endAngle}, ${anticlockwise})`,
arcTo: (target, { x1, y1, x2, y2, radius }) => `${target}.arcTo(${x1}, ${y1}, ${x2}, ${y2}, ${radius})`,
bezierCurveTo: (target, { cp1x, cp1y, cp2x, cp2y, x, y }) => `${target}.bezierCurveTo(${cp1x}, ${cp1y}, ${cp2x}, ${cp2y}, ${x}, ${y})`,
closePath: (target) => `${target}.closePath()`,
ellipse: (target, { x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise }) => `${target}.ellipse(${x}, ${y}, ${radiusX}, ${radiusY}, ${rotation}, ${startAngle}, ${endAngle}, ${anticlockwise})`,
lineTo: (target, { x, y }) => `${target}.lineTo(${x}, ${y})`,
moveTo: (target, { x, y }) => `${target}.moveTo(${x}, ${y})`,
quadraticCurveTo: (target, { cpx, cpy, x, y }) => `${target}.quadraticCurveTo(${cpx}, ${cpy}, ${x}, ${y})`,
rect: (target, { x, y, width, height }) => `${target}.rect(${x}, ${y}, ${width}, ${height})`,

};

