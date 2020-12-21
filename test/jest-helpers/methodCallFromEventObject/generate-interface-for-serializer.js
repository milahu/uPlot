// auto-generate interface functions (glue code) from typescript *.d.ts types file

const use_apply = false; // use o.f.apply(o, a) instead of o.f(...a)

const TSTypesParser = require('ts-types-parser');
const parser = new TSTypesParser();

// input + output file
parser.setSource('node_modules/typescript/lib/lib.dom.d.ts');
parser.setTarget('interface-for-serializer.js');

// entry point
parser.mainType('CanvasRenderingContext2D');

const result = {};

parser.on('level-up', ({ name, path, type, parameters }) => {
  if (parameters) {
    // method

    const parm_names = parameters.map(p => p.name);

    // WORKAROUND for a bug in jest-canvas-mock 
    // https://github.com/hustcc/jest-canvas-mock/pull/74
    /*
    if (name == 'setLineDash') {
      let i = parm_names.indexOf('segments');
      parm_names[i] = 'value';
    }
    */

    // WORKAROUND
    for (let i = 0; i < parm_names.length; i++) {
      /*
      if (name == 'setLineDash') {
        let i = parm_names.indexOf('segments');
        parm_names[i] = 'value';
      }
      */
      if (parm_names[i] == 'w') parm_names[i] = 'width';
      if (parm_names[i] == 'h') parm_names[i] = 'height';
    }

    if (name in result) result[name].push(parm_names);
    else result[name] = [ parm_names ];
  }
  else result[name] = null; // property
});

parser.on('done', () => {
  if (console._log) {
    // restore output
    console.log = console._log;
    console.warn = console._warn;
  }
  // file header
  parser.write(`// this file was auto-generated with ts-types-parser\n`);
  if (parser._sources.length == 1)
    parser.write(`// source file: ${parser._sources[0]}`);
  else {
    parser.write(`// source files:`);
    parser._sources.forEach(s => {
      parser.write(`//   ${s}`);
    });
  }
  parser.write(`// main type: ${parser._mainType}`);
  parser.write(`\nmodule.exports = {\n`);

  Object.keys(result).forEach(name => {
    const parameters_variants = result[name];
    if (Array.isArray(parameters_variants)) {
      // method
      if (parameters_variants.length == 1) {
        // no overloads
        const v = parameters_variants[0];
        if (v.length == 0) {
          parser.write(name+': (target) => `${target}.'+name+'()`,');
        }
        else {
          const parm_keys = v.join(', ');
          const parm_values = v.map(p => '${'+p+'}').join(', ');
          parser.write(name+': (target, { '+parm_keys+' }) => `${target}.'+name+'('+parm_values+')`,');
        }
      }
      else {
        // multiple method signatures
        parser.write(`${name}: (target, parms) => {`);
        parser.write(`  const n = Object.keys(parms).length;`);
        parameters_variants.sort((a, b) => (a.length - b.length));
        parameters_variants.forEach(v => {
          parser.write(`  if (n == ${v.length}) {`);
          if (v.length == 0) {
            parser.write('    return `${target}.'+name+'()`;');
          } else {
            const parm_keys = v.join(', ');
            const parm_values = v.map(p => '${'+p+'}').join(', ');
            parser.write(`    const { ${parm_keys} } = parms;`);
            parser.write('    return `${target}.'+name+'('+parm_values+')`;');
          }
          parser.write(`  }`);
        });
          parser.write('  throw `unhandled argc ${n} in method ${target}.'+name+' with parms ${parms}`;');
        parser.write(`},`);
      }
    }
    else {
      // property setter
      // TODO property getter?
      parser.write(name+': (target, { value }) => `${target}.'+name+' = ${value}`,');
    }
  });
  parser.write(`\n};`);
})

if (1) {
  // disable output from parser.run
  console._log = console.log;
  console._warn = console.warn;
  console.log = () => {};
  console.warn = () => {}; 
}

parser.run();
