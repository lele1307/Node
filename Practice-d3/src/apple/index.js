import '../css/apple.css';
import { select,range } from 'd3';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = (selection,{fruits}) => {
    /**
    selection.data - 将元素与数据绑定.
    selection.enter - 获取需要插入的选择集(数据个数大于元素个数)的占位符.
    selection.append - 创建、添加并返回一个新的元素.
    */
    const circles = selection.selectAll('circle').data(fruits);
    
    circles.enter().append('circle')
            .attr('cx',(d,i)=> i*120+60)
            .attr('cy',height/2)
            .attr('r',50)
            .attr('fill','#c11d1d');
    /* circles.exit().attr('fill','black'); */
    circles.exit().remove();
}

const makeFruit = type => ({ type });
const fruits = range(5)//根据指定的区间生成一系列值
    .map(()=>makeFruit('apple'));

render(svg , {fruits});
//Eat an apple
setTimeout(() => {
    fruits.pop();
    render(svg , {fruits});
},5000)






