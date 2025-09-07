var prime=(a)=>
{
    for(var i=2;i<=a/2;i++){
   if(a%i==0 && a<0)
   {
var flag=1;
break;
   }
   if(flag==1){
   console.log(prime('not prime'));
}
   else{
    console.log("prime");
   }


    } 
}

prime(5);
