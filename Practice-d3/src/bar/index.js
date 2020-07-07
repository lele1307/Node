import '../css/bar.css'
import { 
    select,
    csv,
    max,
    scaleLinear,
    scaleBand,
    axisLeft,
    axisBottom,
    format //formatting example to choose format
} from 'd3'

    const svg = select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const render = data => {
        const xValue = d=>d.population;
        const yValue = d=>d.country;
        const margin = {top:50,right:40,left:200,bottom:70};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleLinear()
            .domain([0,max(data,xValue)])
            .range([0,innerWidth]);

        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0,innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);

        const xAxisTickFormat = number => format('.3s')(number)
            .replace('G','B');

        const xAxis = axisBottom(xScale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight+4);

        const xAxisG = g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`);
        xAxisG.selectAll('.domain').remove();
        xAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',40)
            .attr('x',innerWidth / 2)
            .attr('fill','black')
            .text('[Population]');

        const yAxisG = g.append('g').call(axisLeft(yScale));
        yAxisG.selectAll('.domain,.tick line').remove();
        yAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',innerHeight / 2)
            .attr('x', -70)
            .attr('fill','black')
            .text('[Countries]');

        g.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y',d => yScale(yValue(d)))
                .attr('width',d=>xScale(xValue(d)))
                .attr('height',yScale.bandwidth()); 

        g.append('text')
            .attr('class','title')
            .attr('y',-10)
            .text('Top 10 Most Populous Countries');
    }
    csv('../../static/data.csv').then(data =>{
        data.forEach(d =>{
            d.population = +d.population * 1000
        })
        render(data);
    })