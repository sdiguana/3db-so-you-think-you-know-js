/*
// ----------------------
// example 1: always says baz/4
// ----------------------
var people = ["nelson", "foo", "bar", "baz"];
var peopleList = document.getElementById("people-list");

for(var i=0; i<people.length;i++) {
    var person = people[i];
    var elm = document.createElement("li");
    elm.innerText = person;
    //todo
    elm.addEventListener("click", function () {
        alert(`you clicked on ${person}, at index ${i}`);
    })
    peopleList.appendChild(elm);
}
*/
/*
// ----------------------
//example 2
// ----------------------
var a = 42;
var b = 57;
function ex2() {
    var a = b = 10;
}
console.log(`A:${a},B:${b}`);
ex2();
console.log(`A:${a},B:${b}`);
function ex2_clear() {
    var a=10;   // note that this is creating a var again
    b = 10;     //note that this is *assigning* b to 10
}
*/
/*
// ----------------------
//example 3 : by not using the var keyword, variables are being attached to the global scope
//global items are attached to the window object (global context) if a browser, or 'global' in Node
// ----------------------
function ex3_otherFunction() {
    for(i=0; i<5;i++) {
        console.log(`${i}*30 = ${i*30}`);
    }
}
function ex3() {
    i=1;
    j=1;
    ex3_otherFunction();
    console.log(`1+1= ${2*i}`);
}
ex3();
*/
/*
// ----------------------
//example 4 :
// ----------------------
var a = 42;
var b = 57;
function ex4() {
    var a=10;
    var b=10;
    // alternate: var a=10,b=10
    console.log(`A:${a},B:${b}`);
}
ex4();
console.log(`A:${a},B:${b}`);
*/
/*
// ----------------------
//example 5 :
// ----------------------

var a = 10;

function ex5() {
    var a = 20;
    function inner() {
        a = 30;
        console.log(`inner:${a}`);
    }
    inner();
    console.log(`outer:${a}`);
}
ex5();
console.log(`global:${a}`);
*/
/*
// ----------------------
//example 6 :
// ----------------------
var a = 30;
function ex6(a) {
    a=20;
    console.log("ex6: "+a);
}
ex6(a);
console.log("global: "+a);
*/

/*
// ----------------------
//example 7 : blocks don't create scopes in javascript. Functions DO. using 'let' does
// in example below "i" is not scoped to For. test & "i" are scoped to ex7
// ----------------------
function ex7() {
    for(var i=0;i<10;i++) {
        if(i>5) {
            var test = i*10;
        }
    }
    console.log(`i:${i}, test: ${test}`);
}
ex7();
*/
/*
// ----------------------
//example 8 : 3 ways to make a function
// ----------------------
function ex8a() {
    console.log("8a: function declaration");
    //
}
var ex8b = function () {
    console.log("8b: function expression");
    // must be ahead of usage, similar to any other variable.
    //Note the ; at the END of the function }
};
var ex8c = function ex8c_blah() {
    console.log("8c: Named function expression");
    //misbehaves in IE8 and below
    // cant execute the ex8c_blah(), must use the var. Can be accessed within the function itself
    //*this CAN be used for recursion*
    //Note the ; at the END of the function }
};
*/
/*
// ----------------------
//example 9 :
function myPrivateFunction() {      //this is in the global scope
    console.log("you shouldnt be able to call me outside this function.");
}
*/
/*
// ----------------------
//example 10 : Hiding myPrivateFunction is now hidden in ex10, but ex10 is not private.
//the problem with this is that ex10 is named, if called again it resets i to 10 in a new block of memory
function ex10() {
    i=10;
    function myPrivateFunction() {      //this is in the global scope
        console.log("i am private.");
    }
    window.public1 = function () {
        console.log("public1, i is: "+ i++);
        myPrivateFunction();
    }
    window.public2 = function () {
        console.log("public2");
    }
}
ex10();
*/
/*
// ----------------------
//example 11 :
//wrapping the function in () makes it a function-expression
(function (thing) {
    console.log("This is an IIFE (Immediately Invoked Function Expression");
    console.log(thing);
    function privateFn() {
        console.log("i am private.");
    }
    window.public1 = function () {
        privateFn();
        console.log("in public 1");
    }
})("this is the thing var being passed in"); //adding the 2nd set of parens causes it to invoke the function immediately
*/
/*
// ----------------------
//example 12 :
//LH expression reference, walk up scope chain & attach to first match, or create in global, ex: a=10
//RH Expression, walk up chain and throw error if not found
// ----------------------
function ex12a() {
    console.log(a); //a is used prior to declaration: reference error
    console.log("end of fn");
}
function ex12b() {
    console.log(a); //runs, but undefined
    console.log("end of fn");
    var a;
}
function ex12c() {
    console.log(a); //runs, but undefined (still)
    console.log("end of fn");
    var a=10; //var a is attached to the scope of ex12c, which is executed out of scope (Hoisted)
    //the assignment side is processed inline, so since a=10 is last, it is still undefined.
    //ex12c_compilerVersion is the function that the compiler sees
}

function ex12c_compilerVersion() {
    var a;  //hoisted to scope of the function
    console.log(a);
    console.log("end of fn");
    a=10;
}

function ex12c_2() {    //shows the if block doesnt affect scope, and var a is still hoisted
    console.log(a);
    console.log("end of fn");
    if(false) {var a = 10;}
}
*/
/*
// ----------------------
//example 13 : Demonstrating function hoisting
function ex13a() { // inner is hoisted to run even though it is in unreachable code
    console.log("i am function");
    inner();
    return;
    function inner() {
        console.log("inner");
    }
}
function ex13b() {      //inner is a function-expression, this is an uncaught type error
    console.log("i am function");
    inner();
    return;
    var inner = function inner() {
        console.log("inner");
    };
}
function ex13b_compilerVersion() {
    var inner;
    console.log("i am function");
    inner();
    //return;   comment return to eliminate unreachable code error -doesnt affect example
    inner = function inner() {
        console.log("inner");
    };
}
*/
/*
// ----------------------
//example 15
//js is a statically / lexically scoped, but dynamically typed

//static/lexical scope vs dynamic scope
//static scope: compiler knows what var goes to what scope by reading the file

//returns 30 & 30, compiler doesnt know if 15b will be invoked in 15a
//if we move 15b to be declared inside 15a, then 15b will return 20
function ex15b() {
    console.log(a);
}
function ex15a() {
    var a = 20;
    ex15b();
}
var a = 30;
ex15a();
ex15b();
*/
/*
// ----------------------
//example 16: never do this. Note "with" isnt even allowed in strict mode any longer
function ex16(obj) {
    var a = 100;
    with(obj) {     //with keyword opens a dynamic scope: overrides anything outside it
        console.log("inside dyn scope: " + a);
    }
    console.log("outside dyn scope: " + a);
}
ex16({a:42});
ex16({a:26});
ex16({});
*/
/*
// ----------------------
//example 17: higher order function (defined as fn that takes in fns)
function ex17(callback) {
    callback(1);
    callback(2);
    callback(3);
}
ex17(function (arg) {
    console.log(arg);
});
*/
/*
// ----------------------
//example 18: example higher order function & closure intro
function filterArray(array, predicate) {
    var result = [];
    for(var i=0; i<array.length;i++) {
        var item = array[i];
        if(!predicate(item))
            continue;
        result.push(item);
    }
    return result;
}
var array = [1,2,3,4,5,6,7];
var result = filterArray(array, function (item) {
    return item < 4;
});
console.log(result);

function lessThanFilter(lessThan) { // less than is bound to lessThanFilter param
    return function (item) {        // item is bound to the param of the closure (this is a closure)
        return item < lessThan;     // when we call it more than once, you're getting instances of the closure
    };
}
var lessThan5 = lessThanFilter(5);
console.log(lessThan5(3), lessThan5(10));
console.log(filterArray(array,lessThanFilter(2)));
*/
/*
// ----------------------
//example 19:
function validatePassword(password) {
    var calledCount = 0;
    return function (attempt) {
        calledCount++;
        console.log(`validator of ${password} called ${calledCount} times.`);
        return attempt === password;
    };
}

var validateA = validatePassword("passworda");
var validateB = validatePassword("passwordb");
//invoke from console 3x: validate("invalid")
//invoke proper pw in valb
//invoke proper pw on vala
//the instance of the validatePassword closure is carried with the vars
//closures are common sources of memory leaks - validateA would need set to null to GC the closure.
*/
/*
// ----------------------
//example 20:
function ex20() {
    var a = 20;
    return inner1();
    function inner1() {
        var b = 30;
        return inner2();

        function inner2() {
            var c = 40;
            return function () {
                console.log(a,b,c);
            };
        }
    }
}
var closure = ex20();
closure();  // this has object access to all 3 closures
*/
//solutions for example 1
var people = ["nelson","foo","bar","baz"];
var ul = document.getElementById("people-list");
/*
// ----------------------
//example 21: solution 1
for(var i = 0; i<people.length;i++) {
    var person = people[i];
    var element = document.createElement("li");
    prepareElementForPerson(person, element);   // the function locally scopes person and elm
    ul.appendChild(element);
}
function prepareElementForPerson(person,elm) {  // these are passed by value, not reference
    elm.innerText = person;
    elm.addEventListener("click", function () {
        alert("you clicked on " +person);
    });
}
*/
/*
// ----------------------
//example 21: solution 2 =, IFFE
for(var i = 0; i<people.length;i++) {
    var person = people[i];
    var element = document.createElement("li");
    (function () {
        var person2 = person;
        element.innerText = person2;
        element.addEventListener("click", function () {
            alert("you clicked on "+person2);
        });
    })();
    ul.appendChild(element);
}
*/
/*
// ----------------------
//example 21: solution 3
function forEach(array, callback) {
    for(var i =0; i<array.length; i++ ) {
        callback(array[i]);
    }
}
forEach(people, function (person) {
    var elm = document.createElement("li");
    elm.innerText = person;
    elm.addEventListener("click", function () { // this closure is "closing over the person variable"
        alert("you clicked on "+person);
    });
    ul.appendChild(elm);
});
// Sol#3 is best, Sol #1 is 2nd best, Sol#2 is least preferred, harder to read
//note: there is a built in function of people.forEach(fn)
*/
/*
// ----------------------
// example 22: ES6 solution
function ex22a() {
    if(true) {
        var test = "whoa - var";
    }
    console.log(test);
}
ex22a();
function ex22b() {
    if(true) {
        let test = "whoa - let";  //"let" is a block-scoped variable
        console.log(test);
    }
    console.log(test);
}
ex22b();
*/
/*
// ----------------------
//example 23 - solution 4
for(let i=0; i<people.length; i++) {
    let person = people[i];
    let element = document.createElement("li");
    element.innerText = person;
    element.addEventListener("click", function () {
        alert("you clicked on " + person);
    });
    ul.appendChild(element);
}
// can compare what JS is doing by going to babeljs.io and pasting in ES6 code, it will show ES5 on RH side
*/
/*
// ----------------------
//example 24
const b = 20;
b = 10; // this throws a typeError, cant re-assign it.
const person = {name: "nelson"};
person.name = "foo";    //this is OK/permitted
console.log(person);

person = {}; // this will throw
//performance benefits for JS engine optimization of the code
*/
/*
// ----------------------
//example 23 - Using COnst
for(let i=0; i<people.length; i++) {
    const person = people[i];                     // can use here
    const element = document.createElement("li"); // can use here
    element.innerText = person;
    element.addEventListener("click", function () {
        alert("you clicked on " + person);
    });
    ul.appendChild(element);
}
*/