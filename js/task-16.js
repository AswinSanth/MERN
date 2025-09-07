var a=['apple','orange','pineapple','banana'];
var b=['mango','orange','grape','strawberry'];
var c=[];
for(var i=0;i<a.length;i++){
    for(var j=0;j<b.length;j++){
        if(a[i]==b[j]){
            c.push(a[i]);
        }
    }
}
console.log(c); 
    
