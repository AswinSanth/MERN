var person = {
    firstname: 'David', lastname: 'Laid', age: 24, place: 'new york', current: 'US'
};
var data={age:25};

//console.log(person.age);
//console.log(person[data]);
//console.log(person.firstname);

// delete person.place;
// person.car="audi";
// console.log(person);

// var keys= Object.keys(person);
// console.log(keys);

// var values=Object.values(person);
// var enteries=Object.entries(person);
// c/onsole.log(enteries);
// console.log(values);

// console.log(person.hasOwnProperty('age'));

// for(var i in person){
//  console.log(i);
// }

for(var i in person){
    console.log(person[i]);
   }