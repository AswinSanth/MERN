var myFunction=(q,r,t)=>{
    q(t);
    r();
}
// var printHello=()=>console.log('hello');
// var data ='hi';
// myFunction(printHello);
// myFunction(()=>console.log('PRINt Hlo'));

myFunction(p=>console.log(p),w=>console.log('kiwi'),12)


