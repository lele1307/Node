import '../css/apple.css';
import {fruitBowl} from './fruitBow';
import { select,range } from 'd3';

const svg = select('svg');
const makeFruit = type => ({ 
    type,
    id:Math.random()
});
let fruits = range(5)//根据指定的区间生成一系列值
    .map(()=>makeFruit('apple'));
let selectedFruit = null;

const onClick = id => {
    selectedFruit = id;
    render();
}

const setSelectedFruit = id => {
    selectedFruit = id;
    render();
}

const render = () => {
    console.log('selectedFruit: '+selectedFruit);
    fruitBowl(svg,{
        fruits,
        height:+svg.attr('height'),
        onClick,
        selectedFruit,
        setSelectedFruit
    })
};

render();

//Eat an apple
setTimeout(() => {
    fruits.pop();
    render();
},1000);

//update apple to lemon
setTimeout(() => {
    fruits[2].type = 'lemon';
    render();
},2000);

//Eat 2nd apple
setTimeout(() => {
    fruits = fruits.filter((d,i) => i!==1);
    render();
},3000);






