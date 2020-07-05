import '../css/scatter.css'
import { 
    select,
    csv,
    extent,
    scaleLinear,
    axisLeft,
    axisBottom,
    format, //formatting example to choose format
} from 'd3'

    const svg = select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const title = 'Cars: Horsepower VS Weight'
    /**
     *  d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
     */
    const render = data => {
        const xValue = d=>d.horsepower;
        const yValue = d=>d.weight;
        const xAxisLabel = 'Horsepower';
        const yAxisLabel = 'Weight';
        const circleRadius = 10;
        const margin = {top:60,right:40,left:200,bottom:77};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleLinear()
            .domain(extent(data,xValue))
            .range([0,innerWidth])
            .nice();

        const yScale = scaleLinear()
            .domain(extent(data,yValue))
            .range([0,innerHeight])
            .nice();

        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);

        const xAxisTickFormat = number => format('.3s')(number)
            .replace('G','B');

        const xAxis = axisBottom(xScale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight+4)
            .tickPadding(15);

        const xAxisG = g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`);
        xAxisG.selectAll('.domain').remove();
        xAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',35)
            .attr('x',innerWidth / 2)
            .attr('fill','black')
            .text(xAxisLabel);

        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
        yAxisG.append('text')
            .attr('class','axis-label')
            .attr('y',-55)
            .attr('x',-innerHeight/2)
            .attr('fill','black')
            .attr('transform',`rotate(-90)`)
            .attr('text-anchor','middle')
            .text(yAxisLabel);

        g.selectAll('circle').data(data)
            .enter().append('circle')
                .attr('cy',d => yScale(yValue(d)))
                .attr('cx',d=>xScale(xValue(d)))
                .attr('r',circleRadius); 

        g.append('text')
            .attr('class','title')
            .attr('y',-15)
            .text(title);
    }
    csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data =>{
        data.forEach(d =>{
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        })
        console.log(data);
        render(data);
    })