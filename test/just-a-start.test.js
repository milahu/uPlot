// TODO fix writing of actual snapshot?



// TODO change this to change test
// and generate actual snapshot with `npm run test`
const change_test = 1;


//throw { uPlot: require.resolve('../') };

const uPlot = require('../');

// generate data
// run this only once
// TODO post-process JSON string to reduce line numbers?
//   -> use full width of 80 columns
if (0) {
  const fs = require('fs');
  eval(fs.readFileSync(__dirname + '/../demos/lib/randomWalk.js', 'utf8'));
  // -> function randomWalk
  function write_data(name, data_object) {
    fs.writeFileSync(
      __dirname + `/data/${name}.json`,
      JSON.stringify(data_object, null, '\t') + '\n',
      'utf8'
    );
  }
  write_data('vals1', randomWalk(50, 200, 0, 100));
  write_data('vals2', randomWalk(50, 200, 0, 100));
  write_data('vals3', randomWalk(50, 200, 0, 100));
}



const vals1 = require('./data/vals1.json');
const vals2 = require('./data/vals2.json');
const vals3 = require('./data/vals3.json');

// uPlot/demos/points.html
//import uPlot from "../dist/uPlot.esm.js";

let data = [
  vals1.map((v, i) => i+1),
  vals1,
  vals2,
  vals3,
];

const opts = {
  width: 1920,
  height: 600,
  title: "Points",
  scales: {
    x: {
      time: false,
    },
  },
  series: [
    {},
    {
      stroke: change_test ? "blue" : "green",
    },
    {
      stroke: change_test ? "red" : "yellow",
      fill: "rgba(255,0,0,0.1)",
      points: { space: 0 },
    },
    {
      stroke: change_test ? "blue" : "green",
      fill: "rgba(0,0,255,0.1)",
      paths: u => null,
      points: { space: 0 },
    },
  ],
};



const u = new uPlot(opts, data, document.body);

const ctx = u.ctx;
const canvas = u.ctx._canvas;

// needed for replay
const canvas_config = {
  canvas: {
    width: canvas.width,
    height: canvas.height,
  },
  // TODO too verbose?
  // snapshot files are commited to repo ..
  // also: functions cannot be serialized to JSON
  // -> find a better way to share uplot opts + data with replay GUI
  /*
  uplot: {
    opts,
    data,
  }
  */
};

// validate canvas state using snapshots
// https://jestjs.io/docs/en/snapshot-testing
// expect(actualValue).toMatchSnapshot();
// The first time this test is run, Jest creates a snapshot file.
// run `jest --updateSnapshot` to update

/*
test('plot size', () => {
// HANGS
throw 'asdf';

  expect(u.width).toBe(opts.width);
  expect(u.height).toBe(opts.height);
});
*/


test('canvas size', () => {

throw 'asdf';

  const size = {
    width: canvas.width,
    height: canvas.height
  };
  //console.dir({ size });

  expect({ size }).toMatchSnapshot({
    // ignore non-deterministic values
    //createdAt: expect.any(Date),
    //id: expect.any(Number),
  });

  // TODO on fail: write actual value to disk
});

test('ctx events', () => {

/*
// DEBUG
ctx.__clearEvents();
ctx.__clearDrawCalls();

ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10, 10, 150, 150);
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 250, 250);

0. fillStyle(value = "#c80000") 
1. fillRect(x = 10, y = 10, width = 150, height = 150) 
2. fillStyle(value = "rgba(0, 0, 200, 0.5)") 
3. fillRect(x = 30, y = 30, width = 250, height = 250) 
*/

  // used functions and used properties
  const events = ctx.__getEvents();
  //console.dir({ events });
  expect({ events, ...canvas_config }).toMatchSnapshot();
});


if (0) {

test('draw calls', () => {
  // successful draw calls submitted to the context
  const drawCalls = ctx.__getDrawCalls();
  //console.dir({ calls });
  expect({ drawCalls, ...canvas_config }).toMatchSnapshot();
});

/*
test('ctx clipping region', () => {
  const clippingRegion = ctx.__getClippingRegion();
  console.dir({ clippingRegion });
  expect(clippingRegion).toMatchSnapshot();
});
*/

test('last path', () => {
  // array of method calls that modified the current path (and subpath)
  /*
  ctx.beginPath();
  ctx.arc(1, 2, 3, 4, 5);
  ctx.moveTo(6, 7);
  ctx.rect(6, 7, 8, 9);
  ctx.closePath();
  */
  const path = ctx.__getPath();
  //console.dir({ path });
  expect({ path, ...canvas_config }).toMatchSnapshot();
});

}


/*
// Override default mock return value
// You can override the default mock return value in your test to suit your need. For example, to override return value of toDataURL:
canvas.toDataURL.mockReturnValueOnce(
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
);



// Clear events
ctx.__clearEvents();

// Clear draw calls
ctx.__clearDrawCalls();
*/
