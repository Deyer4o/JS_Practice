// JS comment
//console.log('Hi I\'m here');

var old = 1;
let names = 'Josh';             // you could also not type let, but in strict mode it throws ReferenceError
const unchangableValue = 3;

console.log(names);


//Primitives / Value Types:
let string_value = 'this is a string';
let number_value = 30;
let boolean_value = true;
let undefind_value = undefined; //Undefined type
let null_value = null;          //Object type

//JS is Dynamically assigning types
let f = 'John';
console.log(f);
console.log(typeof(f));
f = 15.3;                       //There's no float and int all numbers are of type number
console.log(f);
console.log(typeof(f))

// Reference Types
// - Object:
let person = {
    name: 'Johnny',
    age: 3
};
person.name = 'Mimi';           // Dot notation
person['name'] = 'Kiki';        // Bracket notation - when you don't know the property name until run-time
let selection = 'name';
person[selection] = 'Kiki';

console.log(person);

// - Array:
let selectedColors = ['red', 'blue'];
selectedColors[2] = 0;
selectedColors.push('pushed last');
console.log(selectedColors)
selectedColors.pop("popped last"); 
console.log(selectedColors)

// - Function:
function greet(name, lastname) { //parameter
    if(lastname === undefined){
        console.log('Greetings ' + name + '!');
    }
    else{
        console.log('Greetings', name, lastname + '!');
    }
}
greet('Pencho');
greet('Johnny', 'Bravo'); //function with multiple arguments

function square(num){
    return num * num;
}

console.log(square(2));