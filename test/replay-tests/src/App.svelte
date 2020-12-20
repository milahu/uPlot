<script>

// TODO why ctx.clearRect(0, 0, 1920, 600) // 0  
//   .. when canvas size is only 300 x 150 pixel?
// TODO update_canvas: why is beginPath in path2d commands?? bug in jest-canvas-mock?
// TODO use https://github.com/milahu/svelte-layout-resizable
// TODO auto-scroll event log
// TODO properly compare the expected/actual event logs -> align same events, hightlight diff events
// TODO auto-play event history with configurable frame rate (FPS)
// show canvas state? width, height, current transform matrix, ..

import { onMount } from 'svelte';

// chota: lightweight UI widgets
import "chota";
import { Input, Button, Card, Modal, Field, Row, Col } from "svelte-chota";

import actualResultMap from '../../__snapshots__/just-a-start.test.js.actual.js';
import expectedResultMap from '../../__snapshots__/just-a-start.test.js.snap';



import ctxEventHandler from './ctxEventHandler/interface.js';
import { format_canvas_event, show_expected_uplot } from './helpers.js';
import { update_canvas } from './update_canvas.js';



let expectedKeysRest = new Set(Object.keys(expectedResultMap));

const snapshotIdList = {};
snapshotIdList.failed = Object.keys(actualResultMap);
snapshotIdList.passed =
  Object.keys(expectedResultMap)
  .filter(snapshotId => !(snapshotId in actualResultMap));



// canvas state object
let canvas = {};

canvas.left = {};
canvas.left.canvas = null;
canvas.left.eventHistory = [];
canvas.left.eventsLog = 'TODO';
canvas.left.textarea = null;
canvas.left.data = { events: [] };
canvas.left.logMessageElement = [];

canvas.right = {};
canvas.right.canvas = null;
canvas.right.eventHistory = [];
canvas.right.eventsLog = 'TODO';
canvas.right.eventsLogElement = null;
canvas.right.data = { events: [] };
canvas.right.logMessageElement = [];

canvas.frames = {};
canvas.frames.count = 100;
canvas.frames.last = -1;
canvas.frames.current = 0;



let snapshotId;

function setSnapshotId() {

  if (snapshotId == undefined) return;

  canvas.left.data = JSON.parse(expectedResultMap[snapshotId]);
  canvas.right.data = JSON.parse(actualResultMap[snapshotId]);

  canvas.frames.count = Math.max(
    canvas.left.data.events.length,
    canvas.right.data.events.length,
  );

  if (1) {

    // sample: 300 x 150
    canvas.left.canvas.width = canvas.left.data.canvas.width;
    canvas.left.canvas.height = canvas.left.data.canvas.height;

    canvas.right.canvas.width = canvas.right.data.canvas.width;
    canvas.right.canvas.height = canvas.right.data.canvas.height;

  }
  else {

    // not working
    // too large? sample: 1920 x 600

    canvas.left.canvas.width = 1920;
    canvas.left.canvas.height = 600;

    canvas.right.canvas.width = 1920;
    canvas.right.canvas.height = 600;

  /* data.uplot.opts must be saved to snapshot in just-a-start.test.js
    canvas.left.canvas.width = canvas.left.data.uplot.opts.width;
    canvas.left.canvas.height = canvas.left.data.uplot.opts.height;

    canvas.right.canvas.width = canvas.right.data.uplot.opts.width;
    canvas.right.canvas.height = canvas.right.data.uplot.opts.height;
  */
  }

  console.log(`canvas size left ${canvas.left.canvas.width}x${canvas.left.canvas.height}   right ${canvas.right.canvas.width}x${canvas.right.canvas.height}`)

}

// react to change in snapshotId
$: snapshotId, setSnapshotId();



let expected_uplot_container;

onMount(() => { // html is loaded

  canvas.left.ctx = canvas.left.canvas.getContext("2d");
  canvas.right.ctx = canvas.right.canvas.getContext("2d");

  console.log(`scale ${window.devicePixelRatio}`);
  canvas.left.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  canvas.right.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  snapshotId = Object.keys(actualResultMap)[0];

  show_expected_uplot(expected_uplot_container);



  //console.dir({ canvas_left: canvas.left.canvas });
  //console.dir({ canvas_right: canvas.right.canvas });

  // DEBUG
  canvas.left.canvas.width = 400;
  canvas.left.canvas.height = 300;
  canvas.right.canvas.width = 400;
  canvas.right.canvas.height = 300;

  // DEBUG at least this should work

  const ctx = canvas.right.ctx;
  window.ctx = ctx;
  window.canvas = canvas.right.canvas;

  window.handler = ctxEventHandler;

  // this works (paste in JS console)
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 100, 100);
  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 100, 100);

  // this works (paste in JS console)
  handler['fillStyle'](ctx, { value: 'rgb(200, 0, 0)' });
  handler['fillRect'](ctx, { x: 10, y: 10, w: 100, h: 100 });
  handler['fillStyle'](ctx, { value: 'rgba(0, 0, 200, 0.5)' });
  handler['fillRect'](ctx, { x: 30, y: 30, w: 100, h: 100 });

});



// svelte reactive assignment
// react to change in canvas.frames.current
// TODO better? this should be first called after onMount
// workaround: in update_canvas, check if canvas is defined
$: canvas.frames.current, update_canvas(canvas, ctxEventHandler);



function handleKeydown(event) {
  if (event.code == 'ArrowRight' || event.key == 'f') {
    if (canvas.frames.current < canvas.frames.count) {
      canvas.frames.current++;
      event.preventDefault();
    }
  }
  else if (event.code == 'ArrowLeft' || event.key == 's') {
    if (0 < canvas.frames.current) {
      canvas.frames.current--;
      event.preventDefault();
    }
  }
  //else console.dir(event);
}

</script>

<svelte:window on:keydown={handleKeydown} />

<main>

  <div id="snapshot-selector">
    <div>
      failed test:
      {#each snapshotIdList.failed as id}
        <Button on:click={() => (snapshotId = id)}>{id}</Button>
      {/each}
    </div>
  </div>

  <div id="replay">
    <Row>
      <Col>expected canvas</Col>
      <Col>actual canvas</Col>
      <Col>actual uPlot</Col>
    </Row>
    <Row>
      <Col>
        <canvas bind:this={canvas.left.canvas}></canvas>
      </Col>
      <Col>
        <canvas bind:this={canvas.right.canvas}></canvas>
      </Col>
      <Col>
        <div id="debug-uplot" bind:this={expected_uplot_container}></div>
      </Col>
    </Row>
  </div>

  <div id="control">
    <div>Frame {canvas.frames.current} of {canvas.frames.count - 1} (hint: use S/F keys)</div>
    <div>
      <!-- slider is too long. maybe a bug in svelte-chota / chota -->
      <Input
        range min="0" max="{canvas.frames.count - 1}" step="1"
        bind:value={canvas.frames.current}
      />
    </div>
  </div>

  <div>
    <Row>
      <Col>
        <div class="events-log" bind:this={canvas.left.eventsLogElement}>
          {#each canvas.left.data.events as event, index}
            <div class="canvas-event" id="left-event-{index}"
              bind:this={canvas.left.logMessageElement[index]}
              class:active={canvas.frames.current == index}
            >
              {format_canvas_event(event).split('\n')[0]} <span class="clickme" on:click={() => (canvas.frames.current = index)}>// {index}</span>
              {format_canvas_event(event).split('\n').slice(1).map(
                (line, subIndex) => `\n${line} // ${index}.${subIndex+1}`).join('')}
            </div>
          {/each}
        </div>
      </Col>
      <Col>
        <div class="events-log" bind:this={canvas.right.eventsLogElement}>
          {#each canvas.right.data.events as event, index}
            <div class="canvas-event" id="right-event-{index}"
              bind:this={canvas.right.logMessageElement[index]}
              class:active={canvas.frames.current == index}
            >
              {format_canvas_event(event).split('\n')[0]} <span class="clickme" on:click={() => (canvas.frames.current = index)}>// {index}</span>
              {format_canvas_event(event).split('\n').slice(1).map(
                (line, subIndex) => `\n${line} // ${index}.${subIndex+1}`).join('')}
            </div>
          {/each}
        </div>
      </Col>
    </Row>
  </div>

</main>

<style type="text/css">
  :global(html, body) {
    margin: 0; padding: 0;
    width: 100%; height: 100%;

    overflow: hidden; /* ugly */
  }
  main {
    margin: 0; padding: 0;
    width: 100%; height: 100%;
    display: flex;
    flex-direction: column;
    /*overflow: hidden;*/ /* FIXME slider is too long */
  }
  canvas {
    border: solid 1px grey;
  }
  #replay {
    flex-grow: 1;
  }
  .events-log {
    font-family: monospace;
    overflow: auto;
    width: 48vw; height: 30vh;
  }
  .canvas-event {
    /*white-space: nowrap;*/
    white-space: pre;
  }
  .canvas-event.active {
    color: red;
  }
  #control {
    display: flex;
    flex-direction: row;
  }
  #control > div:nth-child(2) {
    flex-grow: 1;
  }
  span.clickme {
    cursor: pointer;
  }
</style>
