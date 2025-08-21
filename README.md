[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @mapwhit/geojson-rewind

The [GeoJSON](https://tools.ietf.org/html/rfc7946) specification is [picky about winding order](https://tools.ietf.org/html/rfc7946#section-3.1.6).

This helps you generate compliant Polygon and MultiPolygon geometries. Furthermore it lets you use [Canvas](http://www.bit-101.com/blog/?p=3702) and other drawing libraries's default behavior to color the interior rings of Polygon and MultiPolygon features.

## usage

as npm module:

    npm install --save @mapwhit/geojson-rewind
## api

`rewind(geojson, clockwise)`

Given a GeoJSON FeatureCollection, Feature, or Geometry, return a version
with inner and outer rings of different winding orders.

If `clockwise` is `true`, the outer ring is clockwise, otherwise
it is counterclockwise.

[npm-image]: https://img.shields.io/npm/v/@mapwhit/geojson-rewind
[npm-url]: https://npmjs.org/package/@mapwhit/geojson-rewind

[build-url]: https://github.com/mapwhit/geojson-rewind/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/mapwhit/geojson-rewind/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@mapwhit/geojson-rewind
[deps-url]: https://libraries.io/npm/@mapwhit%2Fgeojson-rewind
