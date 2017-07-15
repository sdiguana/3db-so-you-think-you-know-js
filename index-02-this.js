// ---------------
//example 1
function ex1() {
    console.log(this);  // will show the window object
}

var person_ex1 = {
    name: "nelson",
    printThis: function () {
        console.log(this.name);  // will show the person object
    }
};
//person_ex1.printThis();


var btn = document.getElementById("button-1");
/*
// ---------------
//example 2
btn.addEventListener("click", function () {
    console.log(this); // returns the DOM Element
    this.innerText = "i was clicked";
});
*/
/*
// ---------------
//example 3
var person = {};
person.firstName = "nelson";
person.printName = function () {
    console.log(`first name: ${this.firstName}`);
    console.log(`just this: ${this}`);
};
btn.addEventListener("click", person.printName); // the button is the "this" when fired via a callback
// "this" is a part of the execution context. it can change based on how the function is invoked.
// functions are values in js
var doThing = person.printName; // stick the function in a new variable.
var person2 = {firstName: "foo"};
person2.printName = person.printName; // note that there is only one printName function, it is being attached to separate objects
person2.printName();
*/
/*
// ---------------
//example 4
var array = [1,2,3,4,5,6];
array.forEach(function (item) {
   console.log(item);
});

array.forEach(console.log); // strips away console, invokes it globally
var createElement = document.createElement;
//createElement("li"); //TypeError: 'createElement' called on an object that does not implement interface Document.
*/
/*
// ---------------
//example 5
var personDb = {
    title: "employees",
    people: ["nelson","foo","bar","baz"],
    print: function () {
        //this - solve by adding a var
        var that=this;
        this.people.forEach(function (person) {
            // != this - context is stripped in the forEach
            console.log(that.title+": "+person);    // changed this to that to make it work
        }); // foreach can take a 2nd argument, to pass in "this" or any object to behave as this
    }
};
personDb.print();
*/
/*
// ---------------
//example 6

// call / apply / bind
var person = {
    firstName: "nelson",
    printName: function () {
        console.log(this.firstName);
    }
};
var blegh = person.printName;
var person2 = { firstName: "foo" };

//call:
blegh.call(person2);    // we over-rode the this value with person2
person.printName.call(person2); // does the same thing, person now points "this" to person2
*/
/*
// ---------------
//example 7 - apply
var max = Math.max;
console.log(max(23,13,27,432,256,23423,222,55));
console.log(max.call(null,432,25,234,623,43)); // accepts as a list of params
console.log(max.apply(null,[432,25,234,623,43])); // only accepts 2 params

var person = {
    name: "nelson",
    printName: function (prefix, department) {
        console.log(`${prefix}, ${department}: ${this.name}`);
    }
};
person.printName();
var person2 = {name: "foobar"};

var myLocalPrintName = person.printName;
myLocalPrintName.call(person2,"mrs","accounting");
myLocalPrintName.apply(person2,["mrs","accounting"]);

var myAnySizeArray = [43,432,32,532,3234233,4344];
console.log(Math.max.apply(null, myAnySizeArray));  // write max from array above as single line of code
*/
/*
// ---------------
//example 8 - bind
var logCall = console.log;
logCall.call(console,"call hello"); // this works, but is inconvienent

var log = console.log.bind(console); // effectively attaches a "this" arg
log("bind hello");

var person = {
    firstName: "nelson",
    printName: function () {
        console.log(this.firstName);
    }
};
btn.addEventListener("click",person.printName.bind(person));
function callTheCallback(callback) {
    callback();
}
//callTheCallback(person.printName); // undefined - is hooked to btn
callTheCallback(person.printName.bind(person)); // now works
*/
/*
// ---------------
//example 9 - writing a poor mans bind
function myFunction(one,two) {
    console.log(arguments) // "arguments" is a property of functions
}
myFunction("one","two");
//mnemonic: "C"all "C"ounts the arguments, "A"pply uses "A"rrays of arguments
function myBind(func, thisArg) {
    return function () {
        func.apply(thisArg,arguments);
        //call: console.log(arguments)
        //apply: console.log(arguments[0], arguments[1], arguments[2], ...)
    };
}
var log = myBind(console.log, console);
log("hello world", "ball", "dog dog");
//call would give: ["hello world", "ball", "dog dog"]
//apply gives "hello world ball dog dog"
*/
/*
// ---------------
//example 10 - currying
function add(left, right) {
    return left + right;
}
var array = [1,2,3,4,5,6,7];

console.log(array.map(function (item) {
    return item+5;
}));

console.log(array.map(add.bind(null,5))); // bind is similar to call in that it takes additional args

var add5 = add.bind(undefined, 5); // prefills 5 to the 2nd param
console.log(add5(10));
console.log(add(10)); // NAN since it is only half the add function

function concat(left, mid, right) {
    console.log(left+mid+right);
}
var concatHelloWorld = concat.bind(undefined, " hello"," world ");

concatHelloWorld("test");
concat("test"); // undefineds in the fn due to lack of inputs
*/
// ---------------
//example 11 - ES6 Arrow function
var person = {
    firstName: "nelson",
    printNameDelayed: function () {
        window.setTimeout(() => {       // => is equal to binding the callback, carries forward "this"
            console.log(this.firstName);
        },500);
    }
};
person.printNameDelayed();

var myFunction = () => console.log("hello world"); //new way to do a function
var myFunction2 =  () => {
    console.log("whoa");
    console.log("stuff");
};
var myFunction3 = arg => console.log(arg);
var myFunction4 = (arg, arg2) => console.log(arg + arg2);

var addReturnResult = (left,right) => left+right; // implicitly returned
var mulReturnResult = (left,right) => {         // multi-line requires return statement
  return left * right;
};

var array = [1,2,3,4,5,6];
console.log(array.map(function (item) {
    return item*2;
}));
console.log(array.map(item => item * 4)); // cleaned up version, these are lambdas