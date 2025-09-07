var a=[12,5,4,7,99,100,67,5,44,11];
var lar=a[0];
for(var i  =1;i<a.length;i++)
{
if(a[i]>=lar){
    lar=a[i];
}
}
console.log(lar);