## 自定义触发时间（interaction）

```js
import React from 'react';
import ReactDOM from 'react-dom';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import {Fill, Icon, Stroke, Style} from 'ol/style';
import {LineString, Point, Polygon} from 'ol/geom';
import {
    Pointer as PointerInteraction,
    defaults as defaultInteractions,
} from 'ol/interaction';
import {TileJSON, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

class LocalMap extends React.Component {
    componentDidMount() {
        // 点击事件（down），获取当前点击的要素（feature）和该要素的坐标（corrdinate）
        function handleDownEvent(evt) {
            var map = evt.map;
            // 获取像素对应的feature，回调函数的第二个参数为feature所在的layer
            var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                return feature;
            });
            if (feature) {
                this.coordinate_ = evt.coordinate;
                this.feature_ = feature;
            }
            return !!feature;
        }

        // 拖动事件，实时更新要素和光标的坐标
        function handleDragEvent(evt) {
            var deltaX = evt.coordinate[0] - this.coordinate_[0];
            var deltaY = evt.coordinate[1] - this.coordinate_[1];

            var geometry = this.feature_.getGeometry();
            geometry.translate(deltaX, deltaY);

            this.coordinate_[0] = evt.coordinate[0];
            this.coordinate_[1] = evt.coordinate[1];
        }

        function handleMoveEvent(evt) {
            if (this.cursor_) {
                var map = evt.map;
                var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature;
                });
                // 获取map所在的element
                var element = evt.map.getTargetElement();
                if (feature) {
                    if (element.style.cursor !== this.cursor_) {
                        this.previousCursor_ = element.style.cursor;
                        element.style.cursor = this.cursor_;
                    }
                } else if (this.previousCursor_ !== undefined) {
                    element.style.cursor = this.previousCursor_;
                    this.previousCursor_ = undefined;
                }
            }
        }

        //拖动事件结束
        function handleUpEvent() {
            this.coordinate_ = null;
            this.feature_ = null;
            return false;
        }

        // 自定义拖拽事件类型，寄生组合继承Pointer类型
        const Drag = (function (PointerInteraction) {
            function Drag() {
                PointerInteraction.call(this, {
                    handleDownEvent: handleDownEvent,
                    handleDragEvent: handleDragEvent,
                    handleMoveEvent: handleMoveEvent,
                    handleUpEvent: handleUpEvent,
                });
                this.coordinate_ = null;
                this.cursor_ = 'pointer';
                this.feature_ = null;
                this.previousCursor_ = undefined;
            }

            if (PointerInteraction) Drag.__proto__ = PointerInteraction;
            Drag.prototype = Object.create(PointerInteraction && PointerInteraction.prototype);
            Drag.prototype.constructor = Drag;

            return Drag;
        })(PointerInteraction);

        var pointFeature = new Feature(new Point([0, 0]));

        var lineFeature = new Feature(
            new LineString([
                [-1e7, 1e6],
                [-1e6, 3e6]])
        );

        var polygonFeature = new Feature(
            new Polygon([
                [
                    [-3e6, -1e6],
                    [-3e6, 1e6],
                    [-1e6, 1e6],
                    [-1e6, -1e6],
                    [-3e6, -1e6]]])
        );

        var key = 'pk.eyJ1IjoicmVkaGVhcnQwMDciLCJhIjoiY2tmamdvbnl0MWkzcjJybzNzbGMwb3A0NiJ9.wtcv6q8dlmvIblWWOTI2LA';

        var map = new Map({
            interactions: defaultInteractions().extend([new Drag()]),
            layers: [
                new TileLayer({
                    source: new TileJSON({
                        url:
                            'https://a.tiles.mapbox.com/v4/aj.1x1-degrees.json?secure&access_token=' +
                            key,
                    }),
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [pointFeature, lineFeature, polygonFeature],
                    }),
                    style: new Style({
                        image: new Icon({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.95,
                            src: 'data/icon.png',
                        }),
                        stroke: new Stroke({
                            width: 3,
                            color: [255, 0, 0, 1],
                        }),
                        fill: new Fill({
                            color: [0, 0, 255, 0.6],
                        }),
                    }),
                })],
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });


    }
    render() {
        return (
            <div className='map' id='map'></div>
        )
    }
}

ReactDOM.render(<LocalMap />, document.getElementById('root'));
```

