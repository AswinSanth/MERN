// var arr=['aaple','oarnge','mango','grape','kiwi'];
// var [a,b,...c]=arr;
// // var[a,b,c,d,k=20]=arr;
// //var a=20;
// console.log(c);

var person = {
  firstname: 'David',
  lastnamae: 'Laid',
  age: 25,
  place: 'kochi',
};
var { firstname, lastname, age, place, gender = 'male' } = person;
console.log(gender);
