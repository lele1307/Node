import '../css/map.css';
import { feature } from 'topojson';
import { select,json,geoPath,geoMercator} from 'd3';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const projection = geoMercator();//球面墨卡托投影.
const pathGenerator = geoPath().projection(projection);//创建一个新的地理路径生成器.

json ('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data=>{
    const countries = feature(data,data.objects.countries);
    console.log(countries);

    const paths = svg.selectAll('path')
      .data(countries.features);
    paths.enter().append('path')
      .attr('d',d => pathGenerator(d));
  })