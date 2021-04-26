## Select（选中矢量图层，高亮）

```js
import React from 'react';
import ReactDOM from 'react-dom';

import 'ol/ol.css';
import {Map, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
// interaction =》影响，作用
// select用于选择一个矢量图层（vector features），并且高亮显示
import {Select} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as Vectorlayer} from 'ol/layer';


class Localmap extends React.Component {
    constructor() {
        super();
        this.state = {
            selectRegions: []
        }
    }

    componentDidMount() {
        let re = this;
        const vectorSource = new VectorSource({
            url: 'data/geojson/countries.geojson',
            format: new GeoJSON()
        });
        const map = new Map({
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
                constrainRotation: 16,
            }),
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new Vectorlayer({
                    source: vectorSource
                })
            ]
        })

        // map增加响应事件
        let select = new Select();
        map.addInteraction(select);

        let selectedFeatures = select.getFeatures();

        selectedFeatures.on(['add', 'remove'], function () {
            let names = selectedFeatures.getArray().map(function (feature) {
                return feature.get('name');
            });
            console.log(names);
            if (names.length > 0) {
                re.setState({selectRegions: names});
            } else {
                re.setState({selectRegions: ['No countries selected']});
            }
        });
    }

    render() {
        const {selectRegions} = this.state;
        let regions = selectRegions.join(',');
        return (
            <div>
                <div id='info'>
                    {regions}
                </div>
                <div className='map' id='map'>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Localmap />, document.getElementById('root'));
```

