
export function format_canvas_event(event, obj = 'ctx') {

return event;

  const show_keys = false;

  const { type, props, transform } = event;
  const [a, b, c, d, e, f] = transform;

  // transform is identity transform -> ignore
  const is_identity_transform = (
    a == 1 && b == 0 && c == 0 && d == 1 && e == 0 && f == 0);

  let path2d;
  const param_str = Object.keys(props).map(
    key => {
      const val = props[key];
      if (key == 'path') {
        // handle path2d array
        path2d = val; // TODO convert
        if (show_keys) return `${key} = $path2d`;
        else return `$path2d`;
      }
      if (show_keys) return `${key} = ${JSON.stringify(val).replace(/\\"/g, "'")}`;
      else return `${JSON.stringify(val).replace(/\\"/g, "'")}`;
    }).join(', ');

  if (path2d) {
    path2d = '\n$path2d =\n  ' + (path2d || []).map(
      path_event => format_canvas_event(path_event, 'path2d')
    ).join('\n  ');
  }

  // property setter
  if (Object.keys(props).length == 1 && 'value' in props) {
    return `${obj}.${type} = ${param_str}` + (
      !is_identity_transform ? ` // transform [${transform.join(' ')}]` : '') + (
      path2d ? path2d : '');
  }

  //return `${type}(${param_str})` + (
  return `${obj}.${type}(${param_str})` + (
    //!is_identity_transform ? `(transform = [${transform.join(' ')}])` : '') + (
    !is_identity_transform ? ` // transform [${transform.join(' ')}]` : '') + (
    path2d ? path2d : '');
}



// show live version of uPlot graph
import uPlot from '../../../';
import '../../../dist/uPlot.min.css';
import vals1 from '../../data/vals1.json';
import vals2 from '../../data/vals2.json';
import vals3 from '../../data/vals3.json';

//let expected_uplot_container;
export function show_expected_uplot(expected_uplot_container) {

  // uPlot/demos/points.html

  let data = [
    vals1.map((v, i) => i+1),
    vals1,
    vals2,
    vals3,
  ];

  const opts = {
    //width: 1920, height: 600,
    // DEBUG
    width: 400, height: 280,
    axis: { show: false },
    legend: { show: false },
    //title: "Points",
    scales: { x: { time: false } },
    series: [
      {},
      {
        //stroke: "green",
        stroke: "blue",
      },
      {
        //stroke: "red",
        stroke: "yellow",
        fill: "rgba(255,0,0,0.1)",
        points: { space: 0 },
      },
      {
        stroke: "blue",
        fill: "rgba(0,0,255,0.1)",
        paths: u => null,
        points: { space: 0 },
      },
    ],
  };

  //const u = new uPlot(opts, data, document.body);
  const u = new uPlot(opts, data, expected_uplot_container);
  //const ctx = u.ctx;
  //const canvas = u.ctx._canvas;
}
