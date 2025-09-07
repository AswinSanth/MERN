var a=4
var flag=0;
for(var i=2;i<=a/2;i++)
{
     if(a%i==0 || a<0)
    {
        flag=1;
        break;
    }

}
if(flag==1){
console.log(' notprime');
}
else{
    console.log('prime');
}
