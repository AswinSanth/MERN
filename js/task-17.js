var a=[11,22,11,11,11,47,446,45,99,66,33,11,47];
for(var i=0;i<a.length;i++){
    for(var j=i+1;j<a.length;j++){
        if(a[i]==a[j]){
            a.splice(i,1);
            j--;
        }
        }
}
console.log(a);