var a=[1,2,2,4,8,6,2,44,2,44,66,7,10];
var b=2;
for(var i=0;i<a.length;i++){
    if(a[i]==b){
        a.splice(i,1);
        i--;
    }
}
console.log(a);