```js
//	获取地图控件（包括左上控制地图zoom的加减按钮，右上控制地图旋转的按钮，右下地图attrs显示组件）
import {Attribution, Rotate, Zoom, defaults as defaultControls} from 'ol/control';

let myAttribution = new Attribution({
    collapsible: true,
    collapsed: false
});
let myRotate = new Rotate({
    tipLabel: 'my rotate',
    autoHide: false
});
let myZoom = new Zoom({
    zoomInLabel: 'In',
    zoomOutLabel: 'out'
})

new Map({
    ...
  // defaults函数控制是否使用默认配置，并返回一个collections对象，extend函数增加自定义组件配置
  controls:defaultControls({attribution:false,zoom:false,rotate:true}).extend([myAttribution, myZoom]),
	...
})
map.getControls();	// 以collections的形式，获取并返回当前地图的所有控件

```

```js
		// ZoomSlider，zoom视图限制控件
		import 'ol/ol.css';
        import {Map, View} from 'ol';
        import {OSM} from 'ol/source';
        import {Tile as TileLayer} from 'ol/layer';
        // 引入ZoomSlider控件，限制view视图大小
        import {ZoomSlider, defaults as defaultControls} from 'ol/control';
        
		let raster = new TileLayer({
            source: new OSM(),
        });

        new Map({
            layers: [raster],
            target: 'map',
            view: new View({
                center: [328627.563458, 5921296.662223],
                zoom: 2,
                // 限制视图大小的属性，范围以外的map不显示
                extent: [-572513.341856, 5211017.966314, 916327.095083, 6636950.728974]
            }),
            // 加入控件
            controls: defaultControls().extend([new ZoomSlider()])
        });
```

```js
// 自定义控件（以指北控件为例）
  var RotateNorthControl = (function (Control) {
            function RotateNorthControl(opt_options) {
                var options = opt_options || {};

                var button = document.createElement('button');
                button.innerHTML = 'N';

                var element = document.createElement('div');
                element.className = 'rotate-north ol-unselectable ol-control';
                element.appendChild(button);

                Control.call(this, {
                    // 指定控件的DOM元素
                    element: element,
                    // 如果要在view之外渲染控件，则需要指定target
                    target: options.target,
                });

                button.addEventListener('click', this.handleRotateNorth.bind(this), false);
            }

            // 确定新控件的原型链
            if (Control) RotateNorthControl.__proto__ = Control;
            // Object的create方法通过Control的原型，构建新控件类的原型
            RotateNorthControl.prototype = Object.create(Control && Control.prototype);
            // 新控件的构造函数
            RotateNorthControl.prototype.constructor = RotateNorthControl;

            //控件点击方法
            RotateNorthControl.prototype.handleRotateNorth = function handleRotateNorth() {
                this.getMap().getView().setRotation(0);
            };

            return RotateNorthControl;
        }(Control));




        new Map({
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
                rotation: 1
            }),
            controls: defaultControls().extend([new RotateNorthControl()]),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ]
        })
```

```js
// 小地图控件，并地图拖拽、旋转、窗口大小变化事件
import React from 'react';
import ReactDOM from 'react-dom';

import 'ol/ol.css';
import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';
import Tilelayer from 'ol/layer/Tile';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import {defaults as defaultControls, OverviewMap} from 'ol/control';

class LocalMap extends React.Component {
    componentDidMount() {
        let rotateWithView = document.getElementById('rotateWithView');

        // 小地图控件
        let overviewControl = new OverviewMap({
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: [
                new Tilelayer({
                    source: new OSM({
                        url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                            '?apikey=05dad0a6d26d431795b85373f004311d',
                    })
                })
            ],
            collapseLabel: 'on',
            label: 'off',
            collapsed: true
        });

        // 控制小地图是否随主地图一起旋转
        rotateWithView.addEventListener('change', (evt) => {
            overviewControl.setRotateWithView(evt.target.checked);
        });

        new Map({
            target: 'map',
            view: new View({
                center: [500000, 6000000],
                zoom: 7
            }),
            layers: [
                new Tilelayer({
                    source: new OSM()
                })
            ],
            controls: defaultControls().extend([overviewControl]),
            interactions: defaultInteractions().extend([new DragRotateAndZoom()])
        })


    }
    render() {
        return (
            <div>
                <div className='map' id='map'></div>
                <div><input type="checkbox" id="rotateWithView" />Rotate with view</div>
            </div>
        )
    }
}

ReactDOM.render(<LocalMap />, document.getElementById('root'));
```

