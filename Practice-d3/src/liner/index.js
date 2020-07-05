import '../css/liner.css'
import { 
    select,
    csv,
    extent,
    scaleLinear,
    scaleTime,
    axisLeft,
    axisBottom,
    line,
    area,
    curveBasis,
    max,
    format
} from 'd3'

    const svg = select('#first');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const title = 'Temperature in San Farancisco'
    const render = data => {
        const xValue = d=>d.timestamp;
        const xAxisLabel = 'Time';
        const yValue = d=>d.temperature;
        const yAxisLabel = 'Temprature';
        const circleRadius = 6;
        const margin = {top:60,right:40,left:100,bottom:77};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain(extent(data,xValue))
            .range([0,innerWidth]);

        const yScale = scaleLinear()
            .domain(extent(data,yValue))
            .range([innerHeight,0])
            .nice();

        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);

        const xAxis = axisBottom(xScale)
            .ticks(8)
            .tickSize(-innerHeight)
            .tickPadding(8);

        const xAxisG = g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`);
        xAxisG.selectAll('.domain').remove();
        xAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',40)
            .attr('x',innerWidth / 2)
            .attr('fill','black')
            .text(xAxisLabel);

        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(10);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
        yAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',-35)
            .attr('x',-innerHeight/2)
            .attr('fill','black')
            .attr('transform',`rotate(-90)`)
            .attr('text-anchor','middle')
            .text(yAxisLabel);

        /*  SP
            g.selectAll('circle').data(data)
            .enter().append('circle')
                .attr('cy',d => yScale(yValue(d)))
                .attr('cx',d => xScale(xValue(d)))
                .attr('r',circleRadius);  */

        const lineGenerator = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(curveBasis);

        g.append('path')
            .attr('class','line-path1')
            .attr('d',lineGenerator(data));

        svg.append('text')
            .attr('class','title')
            .attr('x',width/2)
            .attr('y',50)
            .text(title);
    }
    csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then(data =>{
        data.forEach(d =>{
            d.timestamp = new Date(d.timestamp);
            d.temperature = +d.temperature;
        }) 
        //console.log(data);
        render(data);
    })

    const svg2 = select('#second');
    const render2 = data => {
        const title = 'World Population'
        const xValue = d=>d.year;
        const xAxisLabel = 'Year';
        const yValue = d=>d.population;
        const yAxisLabel = 'Population';
        const margin = {top:60,right:40,left:100,bottom:77};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain(extent(data,xValue))
            .range([0,innerWidth])
            .nice();

        const yScale = scaleLinear()
            .domain([0,max(data,yValue)])
            .range([innerHeight,0])
            .nice();

        const g = svg2.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);


        const xAxis = axisBottom(xScale)
            .ticks(6)
            .tickSize(-innerHeight)
            .tickPadding(8);

        const xAxisG = g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`);
        xAxisG.selectAll('.domain').remove();
        xAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',40)
            .attr('x',innerWidth / 2)
            .attr('fill','black')
            .text(xAxisLabel);

        const yAxisTickFormat = number => format('.1s')(number)
            .replace('G','B');

        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(10)
            .tickFormat(yAxisTickFormat);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
        yAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',-35)
            .attr('x',-innerHeight/2)
            .attr('fill','black')
            .attr('transform',`rotate(-90)`)
            .attr('text-anchor','middle')
            .text(yAxisLabel);

        const areaGenerator = area() //排序能改变画布
            .x(d => xScale(xValue(d)))
            .y0(innerHeight)
            .y1(d => yScale(yValue(d)))
            .curve(curveBasis);

        g.append('path')
            .attr('class','line-path2')
            .attr('d',areaGenerator(data));

        svg2.append('text')
            .attr('class','title')
            .attr('x',width/2)
            .attr('y',50)
            .text(title);
    }
    csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv').then(data =>{
        data.forEach(d =>{
            d.year = new Date(d.year);
            d.population = +d.population;
        }) 
        //console.log(data);
        render2(data);
    })