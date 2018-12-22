const rewind = require('../');
const fs = require('fs');
const test = require('tape');
const { hint } = require('@mapbox/geojsonhint');

function f(_) {
    return JSON.parse(fs.readFileSync(_, 'utf8'));
}

function fixture(t, file, title) {
    const name = `${__dirname}/fixture/${file}.input.geojson`;
    const outputName = name.replace('.input.', '.output.');

    const result = rewind(f(name));

    if (process.env.UPDATE) {
        const errors = hint(result);
        if (errors.length) {
            errors.forEach(
              ({ line, message, level }) => t.fail(`${outputName}line ${line} - ${message} - ${level}`)
            );
        } else {
            fs.writeFileSync(outputName, JSON.stringify(result, null, 4));
        }
    }

    const expect = f(outputName);
    t.deepEqual(result, expect, title);
}

test('rewind', function(t) {
    fixture(t, 'featuregood', 'feature-good');
    fixture(t, 'flip', 'flip');
    fixture(t, 'collection', 'feature-collection');
    fixture(t, 'geomcollection', 'geometry-collection');
    fixture(t, 'multipolygon', 'multipolygon');
    fixture(t, 'rev', 'rev');
    t.end();
});

test('passthrough', function(t) {
    t.equal(rewind(null), null);
    t.end();
});
