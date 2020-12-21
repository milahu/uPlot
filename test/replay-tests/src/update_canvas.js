import { format_canvas_event } from './helpers.js';
import { tick } from 'svelte';

export async function update_canvas(canvas, ctxEventHandler) {

  if (!canvas.left.canvas || !canvas.right.canvas) return;

  //console.log(`old ${canvas.frames.last}   new ${canvas.frames.current}`);

  if (canvas.frames.current < canvas.frames.last) {
    // rewind to old position
    console.log('clear canvas');

    // clearing works

    // clear canvas + keep transform matrix
    canvas.left.ctx.save();
await tick();
    canvas.left.ctx.setTransform(1, 0, 0, 1, 0, 0);
await tick();
    canvas.left.ctx.clearRect(
      0, 0, canvas.left.canvas.width, canvas.left.canvas.height);
await tick();
    canvas.left.ctx.restore();

    canvas.right.ctx.save();
await tick();
    canvas.right.ctx.setTransform(1, 0, 0, 1, 0, 0);
await tick();
    canvas.right.ctx.clearRect(
      0, 0, canvas.right.canvas.width, canvas.right.canvas.height);
await tick();
    canvas.right.ctx.restore();

await tick();

/* this works ....

// EXCEPT: ctx.fillText("context test", 40, 40, null);
// maxWidth null -> not working

// DEBUG
// this works
console.log('test draw');
const ctx = canvas.right.ctx;
ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10, 10, 100, 100);
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 100, 100);

// test path2d - this works
const path2d = new Path2D();
path2d.moveTo(10, 10)
path2d.arc(20, 20, 2, 0, 5, false)
path2d.moveTo(20, 20)
path2d.arc(30, 30, 1, 0, 5, false)
path2d.moveTo(40, 40)
path2d.arc(50, 50, 1, 0, 5, false)
ctx.stroke(path2d);


handler['font'](ctx, { value: '20px sans-serif' });
handler['fillStyle'](ctx, { value: 'yellow' });
handler['textAlign'](ctx, { value: 'center' });
handler['textBaseline'](ctx, { value: 'top' });
//handler['fillText'](ctx, { text: "handler test", x: 40, y: 40, maxWidth: null });
handler['fillText'](ctx, { text: "handler test", x: 80, y: 40 });

ctx.font = "20px sans-serif";
ctx.fillStyle = "#00ff00";
ctx.textAlign = "center";
ctx.textBaseline = "top";
//ctx.fillText("context test", 40, 40, null);
ctx.fillText("context test", 80, 80);

*/

    canvas.frames.last = -1;
  }

  // loop frames
  for (
    let frame = canvas.frames.last + 1;
    frame <= canvas.frames.current;
    frame++
  ) {

    //console.log(`replay frame ${frame}`);

    // left canvas
    if (frame < canvas.left.data.events.length) {
      var canvas_event = canvas.left.data.events[frame];
      var { type, props, transform } = canvas_event;
//console.log(format_canvas_event(canvas_event) + ' // left '+frame);
      if (!(type in ctxEventHandler)) {
        console.log(`TODO implement ctxEventHandler for event.type ${type}`);
      } else {

        if (props.path && props.path.length > 0) {
          // import path2d from jest-canvas-mock snapshot
//console.log(`left: import path2d len ${props.path.length}`)
          const path2d = new Path2D();
          props.path.forEach(({ type, props, transform }) => {
            // note. shadowed variables: type, props, transform

            if (type == 'beginPath') return;
            // TODO why is beginPath in path2d commands?? bug in jest-canvas-mock?

            // send event to path
            ctxEventHandler[type](path2d, props);
          });
          // send event to context
          ctxEventHandler[type](
            canvas.left.ctx, { ...props, path: path2d }, transform);
await tick();
          // dont mutate props.path
          // we need the snapshot format for format_canvas_event
        }
        else {
          // send event to context
          ctxEventHandler[type](
            canvas.left.ctx, props, transform);
await tick();
        }
      }
    }

    // right canvas
    if (frame < canvas.right.data.events.length) {
      const canvas_event = canvas.right.data.events[frame];
      var { type, props, transform } = canvas_event;
//console.log(format_canvas_event(canvas_event) + ' // right '+frame);
      if (!(type in ctxEventHandler)) {
        console.log(`TODO implement ctxEventHandler for event.type ${type}`);
      } else {
        if (props.path && props.path.length > 0) {
          const path2d = new Path2D();
          props.path.forEach(({ type, props, transform }) => {
            if (type == 'beginPath') return;
            ctxEventHandler[type](path2d, props);
          });
          ctxEventHandler[type](
            canvas.right.ctx, { ...props, path: path2d }, transform);
await tick();
        }
        else {
          ctxEventHandler[type](
            canvas.right.ctx, props, transform);
await tick();
        }
      }
    }

    // scroll event log
    try {
      canvas.left.eventsLogElement.scrollTop =
        canvas.left.logMessageElement[frame].offsetTop -
        canvas.left.eventsLogElement.offsetTop -
        canvas.left.eventsLogElement.offsetHeight*0.5 +
        20 // scrollbar
      ;
      canvas.right.eventsLogElement.scrollTop =
        canvas.right.logMessageElement[frame].offsetTop -
        canvas.right.eventsLogElement.offsetTop -
        canvas.right.eventsLogElement.offsetHeight*0.5 +
        20 // scrollbar
      ;
    }
    catch (error) {}
    // FIXME throws when update_canvas() is called before onMount

  }
  canvas.frames.last = canvas.frames.current;
}
