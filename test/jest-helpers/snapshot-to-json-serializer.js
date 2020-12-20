let result = null;

// use this serializer?
function test(something) {
  try {
    result = JSON.stringify(something, null, ' ');
    return true;
  }
  catch (error) {
    console.log('NOTE could not serialize object to JSON');
    console.dir({ error });
    return false;
  }
}

// serialize
function print(object) {
  return result;
}

module.exports.test = test;
module.exports.print = print;
