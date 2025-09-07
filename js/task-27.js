var dup=(a)=>{
    for(var i=0;i<a.length;i++){
        for(var j=i+1;j<a.length;j++){
            if(a[i]==a[j]){
                a.splice(j,1);
                j--;
            }
        }

    }return a;
};
console.log(dup([1,22,22,22,5,4,7,6,9,44]));