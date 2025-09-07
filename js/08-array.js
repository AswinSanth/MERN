var a=['apple','orange','mango',45];
// var b=[...a];
var b=a;
var c=[...a ,...b ]
a.push('banana');
//for (var el of a){
  //  console.log(el);
//} 
console.log(b);

