import '../css/colormap.css';
import { loadAndProcessData } from './loadAndProcessData';
import { colorLegend } from './colorLenged';
import {choroplethMap} from './choroplethMap';

import { select,scaleOrdinal,schemeSpectral
  ,geoMercator,geoOrthographic, format} from 'd3';

const svg = select('svg');
//const projection = geoMercator();//球面墨卡托投影.
//const projection = geoOrthographic();//方位角正投影.
const choroplethMapG = svg.append('g');
const colorLegendG = svg.append('g')
    .attr('transform', `translate(40,310)`);

const colorScale = scaleOrdinal();
const colorValue = d => d.properties.economy;

let selectedColorValue;
let features;

const onClick = d => {
  selectedColorValue = d;
  render();
};

loadAndProcessData().then( countries =>{
  features = countries.features;
  render();
});

const render = () => {
  colorScale
    .domain(features.map(colorValue))
    .domain(colorScale.domain().sort().reverse())
    .range(schemeSpectral[colorScale.domain().length]);

  colorLegendG.call(colorLegend, {
    colorScale,
    circleRadius: 8,
    spacing: 20,
    textOffset: 12,
    backgroundRectWidth: 235,
    onClick,
    selectedColorValue
  });

  choroplethMapG.call(choroplethMap, {
    features,
    colorScale,
    colorValue,
    selectedColorValue
  });
}

