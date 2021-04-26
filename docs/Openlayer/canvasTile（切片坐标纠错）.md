## canvasTile（切片坐标纠错）

The displayed tile coordinates are the XYZ tile coordinates.

##### main.js

```js
    import 'ol/ol.css';
    import {Map, View} from 'ol';
    import {OSM, TileDebug} from 'ol/source';
    import {Tile as TileLayer} from 'ol/layer';

    new Map({
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2,
            minZoom: 2
        }),
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            new TileLayer({
                source: new TileDebug()
            })
        ]
    });
```

