## OpenLayer

### 切片图层（TileLayer）

```js
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';

new Map({
  // 容器
  target: 'map-container',
  // 图层
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      })
    })
  ],
  // 视图
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2
  })
});
```

### 矢量图层（VectorLayers）

- 基础配置

  ```js
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  const url = './data/countries.json';
  const source = new VectorSource({
    url,
    format: new GeoJSON()
  });
  const map = new Map({
    target: 'map-container',
    layers: [],
    view: new View({
      center: [0, 0],
      zoom: 3
    })
  });
  const layer = new VectorLayer({
    source
  });
  map.addLayer(layer);
  ```

- 异步渲染图层

  ```js
  import sync from 'ol-hashed';
  
  // 常规配置
  
  sync(map);
  ```

- 拖拽JSON数据渲染地图

  ```js
  import DragAndDrop from 'ol/interaction/DragAndDrop';
  
  // 常规配置
  
  map.addInteraction(new DragAndDrop({
    source,
    formatConstructors: [GeoJSON]
  }));
  ```

- 允许修改图层

  ```js
  import Modify from 'ol/interaction/Modify';
  
  // 常规配置
  
  map.addInteraction(new Modify({
    source
  }));
  ```

- 绘制图形

  ```js
  import Draw from 'ol/interaction/Draw';
  import GeometryType from 'ol/geom/GeometryType';
  
  // 常规配置
  
  map.addInteraction(new Draw({
    // 此处绘制多边形
    type: GeometryType.POLYGON,
    source
  }));
  ```

- 下载，清除图层

  ```js
  // 获取“清除”按钮，点击清空图层
  const clear = document.getElementById('clear');
  clear.addEventListener('click', () => {
    source.clear();
  });
  // 获取
  const format = new GeoJSON({featureProjection: 'EPSG:3857'});
  const download = document.getElementById('download');
  source.on('change', () => {
    const features = source.getFeatures();
    const json = format.writeFeatures(features);
    download.href = 'data:text/json;charset=utf-8,' + json;
  });
  ```

- 自定义图层样式

  ```js
  // 引入style模块定义样式，fill填充色块，stroke描边
  import {Style, Fill, Stroke} from 'ol/style';
const style1 = new Style({
    fill: new Fill({
      color: 'red'
    }),
    stroke: new Stroke({
      color: 'green'
    })
  });
  const style2 = new Style({
    fill: new Fill({
      color: 'blue'
    }),
    stroke: new Stroke({
      color: 'red'
    })
  });
  const layer = new VectorLayer({
    source,
    // 动态样式
    style: (feature, resolution) => {
      const name = feature.get('name').toUpperCase();
      return name < 'N' ? style1 : style2;
    }
  });
  map.addLayer(layer);
  ```
  
  ```js
  import {getArea} from 'ol/sphere';
  import colormap from 'colormap';
  const min = 1e8; // the smallest area
  const max = 2e13; // the biggest area
  const steps = 50;
  const ramp = colormap({
    colormap: 'blackbody',
    nshades: steps
  });
  
  function clamp(value, low, high) {
    return Math.max(low, Math.min(value, high));
  }
  
  function getColor(feature) {
    const area = getArea(feature.getGeometry());
    const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
    const index = Math.round(f * (steps - 1));
    return ramp[index];
  }
  const layer = new VectorLayer({
    source,
    // 根据国家名渲染图层样式
    style: (feature) => {
      return new Style({
        fill: new Fill({
          color: getColor(feature)
        }),
        stroke: new Stroke({
          color: 'rgba(255,255,255,0.8)'
        })
      });
    }
  });
  map.addLayer(layer);
  ```
  
  

