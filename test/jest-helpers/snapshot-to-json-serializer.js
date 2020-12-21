const methodCallFromEventObject = require('./methodCallFromEventObject/interface-for-serializer.js');

// use this serializer?
function test(something) {
  return true; // use for all snapshots
}



// DEBUG in jest, we cannot print to terminal -> write to logfile
const fs = require('fs');
const logfile = __dirname + `/debug.${new Date().toLocaleString('af')
  .replace(/:/g, '-').replace(' ', '_')}.log`;
//console.dir({ logfile });
const log_stream = fs.createWriteStream(logfile, { flags: 'a' });
log_stream.write(`hello\n`);


function serialize_event_list(event_list, depth = 0) {

  // WORKAROUND for some stupid bug ....
  if (event_list == '__pathvar__') return event_list + '\n';

  // depth 0: target is `ctx`
  // depth 1+: target is `path${depth}`

  const indent = Array(depth * 2).fill(' ').join('');
  let result = '';

  for (let i = 0; i < event_list.length; i++) {

    const event = event_list[i];
    let props = { ...event.props }; // copy object to mutate
    // jest-canvas-mock is sharing objects between snapshots
    // mutating these objects would cause trouble in future calls to print()

    // DEBUG
    //log_stream.write('event = '+JSON.stringify(event)+'\n');

    if (depth > 0 && event.type == 'beginPath') continue;
    // ignore false method call
    // ctx.beginPath() is valid, but not path2d.beginPath()
    // WORKAROUND for bug in jest-canvas-mock
    // https://github.com/hustcc/jest-canvas-mock/pull/77

    if (props.path) {
      // encode Path2D events
      result += `${indent}  var path${depth+1} = new Path2D()\n`;
      // recurse
      result += serialize_event_list(props.path, depth+1);
      props.path = '__pathvar__'; // magic value for path variable
    }

    // WORKAROUND for a bug in jest-canvas-mock
    // https://github.com/hustcc/jest-canvas-mock/pull/74
    if (event.type == 'setLineDash' && props.value) {
      props = { segments: props.value };
    }

    const props_str = Object.keys(props).reduce(
      (acc, key) => {
        const val = props[key];
        if (key == 'path' && val == '__pathvar__') {
          acc[key] = 'path'+(depth+1); // TODO?
        } else {
          acc[key] = JSON.stringify(val)
        }
        return acc;
      }, {}
    );

    result += indent + methodCallFromEventObject[event.type](
      depth == 0 ? 'ctx' : ('path'+depth),
      props_str
    ) + '\n';

  }
  return result;
}



// serialize
function print(object) {

  if (object.events) {
    // expect({ events, canvas: { width, height } }).toMatchSnapshot();
    return (
      '// canvas events\n' +
      '//! var canvas = document.createElement("canvas")\n' +
      `//! canvas.width = ${object.canvas.width}\n` +
      `//! canvas.height = ${object.canvas.height}\n` +
      '//! var ctx = canvas.getContext("2d")\n' +
      serialize_event_list(object.events)
    );
  }

  if (object.drawCalls) {
    // expect({ drawCalls, canvas: { width, height } }).toMatchSnapshot();
    return (
      '// canvas draw calls\n' +
      '//! var canvas = document.createElement("canvas")\n' +
      `//! canvas.width = ${object.canvas.width}\n` +
      `//! canvas.height = ${object.canvas.height}\n` +
      '//! var ctx = canvas.getContext("2d")\n' +
      serialize_event_list(object.drawCalls)
    );
  }

  if (object.path) {
    // expect({ path, canvas: { width, height } }).toMatchSnapshot();
    return (
      '// canvas path\n' +
      '//! var canvas = document.createElement("canvas")\n' +
      `//! canvas.width = ${object.canvas.width}\n` +
      `//! canvas.height = ${object.canvas.height}\n` +
      '//! var ctx = canvas.getContext("2d")\n' +
      serialize_event_list(object.path)
    );
  }

  // fallback
  return JSON.stringify(object, null, ' ');
}

module.exports.test = test;
module.exports.print = print;
