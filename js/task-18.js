var a=0;
var b=1;
var l=10;
for(var i=0;i<l;i++){
    console.log(a);
    var temp=a
    a=b;
    b=temp+a;
}