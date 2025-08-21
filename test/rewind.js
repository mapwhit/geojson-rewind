import fs from 'node:fs';
import test from 'node:test';
import rewind from '../index.js';

function f(_) {
  return JSON.parse(fs.readFileSync(_, 'utf8'));
}

function fixture(t, file, title) {
  const name = `${import.meta.dirname}/fixture/${file}.input.geojson`;
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
