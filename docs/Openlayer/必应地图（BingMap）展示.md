## 必应地图（BingMap）展示

```js
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';

let styles = [
    'RoadOnDemand',
    'Aerial',
    'AerialWithLabelsOnDemand',
    'CanvasDark',
    'OrdnanceSurvey'];
let layers = [];

for (let index = 0; index < styles.length; index++) {
    layers.push(new TileLayer({
        visible: false,
        preload: Infinity,
        source: new BingMaps({
            // 必应地图 key
            key: 'AkVauXK8fqkHlDvf122vg-71w24VoS58EdHAZku4KbER7wnEYdt5mxOglK32ARyY',
            imagerySet: styles[index]
        })
    }))
}
new Map({
    target: 'map',
    layers: layers,
    view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 2
    })
});

// 改变selection下拉框中的选项时，只显示选中的图层
var select = document.getElementById('layer-select');
function onChange() {
    var style = select.value;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        layers[i].setVisible(styles[i] === style);
    }
}
select.addEventListener('change', onChange);
onChange();

```

