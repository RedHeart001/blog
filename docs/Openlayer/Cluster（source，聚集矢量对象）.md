## Cluster（source，聚集矢量对象）

```js
        import 'ol/ol.css';
        import Feature from 'ol/Feature';
        import {Map, View} from 'ol';
        import {
            Circle as CircleStyle,
            Fill,
            Stroke,
            Style,
            Text,
        } from 'ol/style';
        import {Point} from 'ol/geom';
        // 聚合矢量对象的数据源
        import {OSM, Cluster, Vector as VectorSource} from 'ol/source';
        import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


 		let distance = document.getElementById('distance');

        let count = 20000;
        let features = new Array(count);
        let e = 4500000;
        for (let i = 0; i < count; ++i) {
            let coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
            // 使用一个geom对象新建一个要素（feature），类似于GeoJSON
            features[i] = new Feature(new Point(coordinates));
        }

        let source = new VectorSource({
            features: features,
        });


        // 矢量源创建聚合要素源
        let clusterSource = new Cluster({
            distance: parseInt(distance.value, 10),
            source: source,
        });



        let styleCache = {};
        let clusters = new VectorLayer({
            source: clusterSource,
            // 自定义样式
            style: function (feature) {
                let size = feature.get('features').length;
                let style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#fff',
                            }),
                            fill: new Fill({
                                color: '#3399CC',
                            }),
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff',
                            }),
                        }),
                    });
                    styleCache[size] = style;
                }
                return style;
            },
        });

        let raster = new TileLayer({
            source: new OSM(),
        });

        new Map({
            layers: [raster, clusters],
            target: 'map',
            view: new View({
                center: [-100, -100],
                zoom: 2,
            }),
        });

        distance.addEventListener('input', function () {
            clusterSource.setDistance(parseInt(distance.value, 10));
        });
```

