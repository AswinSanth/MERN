var vowels=(a='')=>{
    var count = 0 ;
        
    for(var i=0;i<a.length;i++){
        if(a[i]=='a'||a[i]=='e'||a[i]=='i'||a[i]=='o'||a[i]=='u')
        {
            
            count++;
        }
        }
       return count;}

     var str='apple aeiou';
     console.log(vowels(str));
         