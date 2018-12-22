const geojsonArea = require('@mapwhit/geojson-area');

module.exports = function(gj, outer) {
    return rewind(gj, !!outer);
};

function rewind(gj, outer) {
    switch (gj && gj.type) {
        case 'FeatureCollection':
            gj.features = gj.features.map(f => rewind(f, outer));
            return gj;
        case 'GeometryCollection':
            gj.geometries = gj.geometries.map(g => rewind(g, outer));
            return gj;
        case 'Feature':
            gj.geometry = rewind(gj.geometry, outer);
            return gj;
        case 'Polygon':
        case 'MultiPolygon':
            return correct(gj, outer);
        default:
            return gj;
    }
}

function correct(_, outer) {
    if (_.type === 'Polygon') {
        _.coordinates = correctRings(_.coordinates, outer);
    } else if (_.type === 'MultiPolygon') {
        _.coordinates = _.coordinates.map(r => correctRings(r, outer));
    }
    return _;
}

function correctRings(_, outer) {
    _[0] = wind(_[0], outer);
    for (let i = 1; i < _.length; i++) {
        _[i] = wind(_[i], !outer);
    }
    return _;
}

function wind(_, dir) {
    return geojsonArea.ring(_) >= 0 === dir ? _ : _.reverse();
}
