function insertSort(arr) {
    let length = arr.length;
    for(let i = 1; i < length; i++) {
        let temp = arr[i];
        let j = i;
        for(; j > 0; j--) {
            if(temp >= arr[j-1]) {
                break;      // 当前考察的数大于前一个数，证明有序，退出循环
            }
            arr[j] = arr[j-1]; // 将前一个数复制到后一个数上
        }
        arr[j] = temp;  // 找到考察的数应处于的位置
    }
    return arr;
}
// InsertSort example
let arr1 = [2,5,10,7,10,32,90,9,11,1,0,10]
console.log('insertSort :['+insertSort(arr1)+']'); //[0,1,2,5,7,9,10,10,10,11,32,90]



function merge(leftArr, rightArr){  
    var result = [];  
    while (leftArr.length > 0 && rightArr.length > 0){  
        if (leftArr[0] < rightArr[0])  
            result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
        else   
            result.push(rightArr.shift());  
    }   
    return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array){  
    if (array.length == 1) return array;  
    var middle = Math.floor(array.length / 2);       //求出中点  
    var left = array.slice(0, middle);               //分割数组  
    var right = array.slice(middle);  
    return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  

var arr2 = mergeSort([32,12,56,78,76,45,36]);
console.log('mergeSort :['+arr2+']');   // [12, 32, 36, 45, 56, 76, 78]


var quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    var pivot = arr.splice(pivotIndex, 1)[0];  //基准数
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};
console.log('quickSort :['+quickSort(arr2)+']') // [12, 32, 36, 45, 56, 76, 78]