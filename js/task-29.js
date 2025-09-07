var calculateSum=(a,b,cb)=>cb(a+b)
// { var add=b+c;
// cb(add);}
// var sum=(x,y)=> console.log(x+y);
calculateSum(10,5,sum=>console.log(sum));