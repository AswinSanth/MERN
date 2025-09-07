var largest=(a)=>{
    var temp =a[0];
    for(var i=1;i<a.length;i++)
    {
     if(temp<a[i]){
         temp=a[i];

        }
    }
      return temp;  
    }
var arr=[1,2,3,44,55,66,4];
console.log(largest(arr));
//console.log(largest([10,2,3,4,5,66,7,8,9]));