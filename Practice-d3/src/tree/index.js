import '../css/tree.css';
import { select,json,tree,hierarchy,linkHorizontal,zoom,event } from 'd3';
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = { top: 0, right: 50, bottom: 0, left: 75};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const treeLayout = tree().size([innerHeight, innerWidth]);
const zoomG = svg.append('g');
const g = zoomG.append('g')
  .attr('transform',`translate(${margin.left},${margin.top})`);

svg.call(zoom().on('zoom',()=>{
    g.attr('transform',event.transform);
  }));

json('../../static/treedata.json')
  .then(data => {
    const root = hierarchy(data);
    const links = treeLayout(root).links();
    const linkPathGenerator = linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    g.selectAll('path').data(links)
      .enter().append('path')
        .attr('d',linkPathGenerator);

    g.selectAll('text').data(root.descendants())
      .enter().append('text')
        .attr('x', d => d.y)
        .attr('y', d => d.x)
        .attr('dy', '0.3em')
        .attr('text-anchor', d => d.children ? 'middle' : 'start')
        .attr('font-size', d => 3.25 - d.depth + 'em')
        .text(d => d.data.data.id);
    console.log(data);
  })


