var a=[1,5,8,9,44,66,77,103,7,56];
var temp=a[0];
for(var i=1;i<a.length;i++){
    if(temp<a[i]){
        temp=a[i];
    }

}
console.log(temp);