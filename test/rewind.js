const test = require('node:test');
const fs = require('node:fs');

const rewind = require('../');

function f(_) {
  return JSON.parse(fs.readFileSync(_, 'utf8'));
}

function fixture(t, file, title) {
  const name = `${__dirname}/fixture/${file}.input.geojson`;
  const outputName = name.replace('.input.', '.output.');

  const result = rewind(f(name));
  const expect = f(outputName);
  t.assert.deepEqual(result, expect, title);
}

test('rewind', t => {
  fixture(t, 'featuregood', 'feature-good');
  fixture(t, 'flip', 'flip');
  fixture(t, 'collection', 'feature-collection');
  fixture(t, 'geomcollection', 'geometry-collection');
  fixture(t, 'multipolygon', 'multipolygon');
  fixture(t, 'rev', 'rev');
});

test('passthrough', t => {
  t.assert.equal(rewind(null), null);
});
