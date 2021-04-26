

```js
const styles = [
            new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 3,
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)',
                }),
            }),
            new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: 'orange',
                    }),
                }),
                // 根据feature渲染几何图形
                geometry: function (feature) {
                    // return the coordinates of the first ring of the polygon
                    const coordinates = feature.getGeometry().getCoordinates()[0];
                    return new MultiPoint(coordinates);
                },
            })
        ];

		// 渲染四个多边形，坐标为环路
        const geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:3857',
                },
            },
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-5e6, 6e6],
                                [-5e6, 8e6],
                                [-3e6, 8e6],
                                [-3e6, 6e6],
                                [-5e6, 6e6]]],
                    },
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-2e6, 6e6],
                                [-2e6, 8e6],
                                [0, 8e6],
                                [0, 6e6],
                                [-2e6, 6e6]]],
                    },
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [1e6, 6e6],
                                [1e6, 8e6],
                                [3e6, 8e6],
                                [3e6, 6e6],
                                [1e6, 6e6]]],
                    },
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-2e6, -1e6],
                                [-1e6, 1e6],
                                [0, -1e6],
                                [-2e6, -1e6]]],
                    },
                }],
        };

        const source = new VectorSource({
            features: new GeoJSON().readFeatures(geojsonObject),
        });

        const layer = new VectorLayer({
            source: source,
            style: styles,
        });


        const map = new Map({
            target: 'map',
            layers: [
                layer
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
```

