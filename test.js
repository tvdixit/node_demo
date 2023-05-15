const app = require('./app')
// var x = '20';
// for (i = 0; i <= 15; i++) {
//     console.warn(i);
// }
const arr=[2,4,7,1,3,8,3];
// console.log(arr[0]);
console.log(app);

let result = arr.filter((item)=>{
// console.log(item);
// return item===3
// return item>4
return item>=4 
})
console.warn(result);
// console.log(__dirname);
console.log(__filename);
const fs=require('fs').writeFileSync;
fs("abc.txt","abc")
// fs.writeFileSync("code.txt","Some code");

