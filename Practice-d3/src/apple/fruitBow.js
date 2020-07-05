import { scaleOrdinal } from 'd3';
const colorScale = scaleOrdinal()
.domain(['apple','lemon'])
.range(['#c11d1d','yellow']);

const radiusScale = scaleOrdinal()
.domain(['apple','lemon'])
.range([50,30]);

const xPosition = (d,i)=> i*120+60;

export const fruitBowl = (selection,{fruits,height}) => {
    /**
    selection.data - 将元素与数据绑定.
    selection.enter - 获取需要插入的选择集(数据个数大于元素个数)的占位符.
    selection.append - 创建、添加并返回一个新的元素.
    */
    
    const groups = selection.selectAll('g')
        .data(fruits,d=>d.id);

    const groupsEnter = groups.enter().append('g');
    groupsEnter
        .merge(groups)
            .attr('transform',(d,i)=>{
                `translate(${xPosition},${height/2})`
            });
    groups.exit().remove();

    groupsEnter
        .append('circle')
            .attr('cx',xPosition)
            .attr('cy',height/2)
            .attr('r',0)
        .merge(groups.select('circle'))
            .attr('fill',d=>colorScale(d.type))
        .transition().duration(1000)
            .attr('cx',xPosition)
            .attr('r',d=>radiusScale(d.type));

    groupsEnter
        .append('text')
            .attr('x',xPosition)
            .attr('y',height/2+80)
        .merge(groups.select('text'))
            .text(d=>d.type)
        .transition().duration(1000)
            .attr('x',xPosition);

}