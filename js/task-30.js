// var reverse=a=>{
//     for(var i=a.length-1;i>=0;i--)
//     {
//      console.log(a[i]) ;  
//     }
// }
// reverse('aswin');

var rev =str=>{
    var r='';
    for(var i=str.length-1;i>=0;i--){
     r=r+str[i];
    }
    return r;
}
console.log(rev('apple'));
