import { scaleOrdinal } from 'd3';
export const fruitBowl = (selection,{fruits,height}) => {
    /**
    selection.data - 将元素与数据绑定.
    selection.enter - 获取需要插入的选择集(数据个数大于元素个数)的占位符.
    selection.append - 创建、添加并返回一个新的元素.
    */
    const circles = selection.selectAll('circle')
        .data(fruits,d=>d.id);
    const colorScale = scaleOrdinal()
        .domain(['apple','lemon'])
        .range(['#c11d1d','yellow']);
    const radiusScale = scaleOrdinal()
        .domain(['apple','lemon'])
        .range([50,30]);

    const xPosition = (d,i)=> i*120+60;

    circles
        .enter().append('circle')
            .attr('cx',xPosition)
            .attr('cy',height/2)
            .attr('r',0)
        .merge(circles)
            .attr('fill',d=>colorScale(d.type))
        .transition().duration(1000)
            .attr('cx',xPosition)
            .attr('r',d=>radiusScale(d.type));

    /*circles //自己本身就是update
        .attr('r',d=>radiusScale(d.type))
        .attr('fill',d=>colorScale(d.type));*/

    /* circles.exit().attr('fill','black'); */
    circles.exit()
    .transition().duration(1000)
        .attr('r',0)
    .remove();
}