import '../css/colormap.css';
import { loadAndProcessData } from './loadAndProcessData';
import { colorLegend } from './colorLenged';
import { select,geoNaturalEarth1,geoPath,zoom,event,scaleOrdinal,schemeSpectral
  ,geoMercator,geoOrthographic, format} from 'd3';

const svg = select('svg');
//const projection = geoMercator();//球面墨卡托投影.
//const projection = geoOrthographic();//方位角正投影.
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);//创建一个新的地理路径生成器.
const choroplethMapG = svg.append('g');
const colorLegendG = svg.append('g')
    .attr('transform', `translate(40,310)`);

const colorScale = scaleOrdinal();
const colorValue = d => d.properties.economy;

  choroplethMapG.append('path')
  .attr('class','sphere')
  .attr('d',pathGenerator({type:'Sphere'}));

  svg.call(zoom().on('zoom',()=>{
    g.attr('transform',event.transform);
  }));


loadAndProcessData().then( countries =>{

  colorScale
    .domain(countries.features.map(colorValue))
    .domain(colorScale.domain().sort().reverse())
    .range(schemeSpectral[colorScale.domain().length]);

  colorLegendG.call(colorLegend, {
    colorScale,
    circleRadius: 8,
    spacing: 20,
    textOffset: 12,
    backgroundRectWidth: 235,
  });

  choroplethMapG.selectAll('path').data(countries.features)
    .enter().append('path')
      .attr('class','country')
      .attr('d',pathGenerator)
      .attr('fill',d=>colorScale(d.properties.name))
    .append('title')
      .text(d => d.properties.name + ':' + colorValue(d));
});