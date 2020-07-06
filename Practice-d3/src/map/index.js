import '../css/map.css';
import { feature } from 'topojson';
import { select,json,geoPath,geoMercator,geoOrthographic,geoNaturalEarth1} from 'd3';

const svg = select('svg');

//const projection = geoMercator();//球面墨卡托投影.
//const projection = geoOrthographic();//方位角正投影.
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);//创建一个新的地理路径生成器.
svg.append('path')
  .attr('class','sphere')
  .attr('d',pathGenerator({type:'Sphere'}));

json ('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data=>{
    const countries = feature(data,data.objects.countries);

    console.log(countries);
    svg.selectAll('path').data(countries.features)
      .enter().append('path')
      .attr('class','country')
      .attr('d',pathGenerator);
  })