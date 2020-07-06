import '../css/map.css';
import { feature } from 'topojson';
import { select,json,tsv,geoNaturalEarth1,geoPath,zoom,event,
  geoMercator,geoOrthographic} from 'd3';

const svg = select('svg');
//const projection = geoMercator();//球面墨卡托投影.
//const projection = geoOrthographic();//方位角正投影.
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);//创建一个新的地理路径生成器.
const g = svg.append('g');
g.append('path')
  .attr('class','sphere')
  .attr('d',pathGenerator({type:'Sphere'}));

svg.call(zoom().on('zoom',()=>{
  g.attr('transform',event.transform);
}));

Promise.all([
  tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  json ('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData,topoJSONData]) => {
  //console.log(tsvData);
  /*const countryName = {};
  tsvData.forEach(d => {
      countryName[d.iso_n3] = d.name;
  }); */
  //console.log(topoJSONData);
  const countryName = tsvData.reduce((accumulator,d)=>{
    accumulator[d.iso_n3] = d.name;
    return accumulator;
  },{});
  const countries = feature(topoJSONData,topoJSONData.objects.countries);
    g.selectAll('path').data(countries.features)
      .enter().append('path')
        .attr('class','country')
        .attr('d',pathGenerator)
      .append('title')
        .text(d => countryName[d.id]);
});