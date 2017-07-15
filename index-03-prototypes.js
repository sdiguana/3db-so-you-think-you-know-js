/*
// ---------------
// example 1
var person = {
    name: "nelson",
    sayHi: function () {
        console.log("hi, my name is "+this.name);
    }
};
person.sayHi();

var person2 = {
    name: "foo",
    sayHi: person.sayHi
};

function dragDropList(parentElement) {
    var handle = document.createElement("li");
    handle.innerText = "handle";
    parentElement.appendChild(handle);
    return {
        beginDrag: function () {
            handle.innerText = "starting to drag";
        }
    };
}
var list1=dragDropList(document.getElementById("list-1"));
var list2=dragDropList(document.getElementById("list-2"));
var list3=dragDropList(document.getElementById("list-3"));
list1.beginDrag();
*/
/*
// ---------------
// example 2 - Object Prototypes (protos)

var person = {
    name: "<not set>",
    sayHi: function () {
        console.log("hi, my name is "+this.name);
    },
    raiseWage: function () {
        console.log("i cant do that");
        return false;
    }
};

var manager = {};
manager.__proto__ = person; // not good practice, but inherits sayHi
manager.name = "boss-man";
manager.sayHi();
// every js object is a bag of properties
// prototypes solve accessing properties that don't exist on the object
// js runtime does: manager.hasOwnProperty("sayHi") = false
// then it does manager.__proto__.hasOwnProperty("sayHi") = true
// since true: manager.__proto__.sayHi.call(manager)
//this is the same for toString function, but proto is 2 lvls deep to get to the true "Object" type

var ceo = {};
ceo.__proto__ = manager;
ceo.name = "CEO";
ceo.raiseWage = function() {
     console.log("RAISES FOR ALL");
     return true;
}
// the ceo when called goes up multiple levels via the proto
*/
/*
// ---------------
// example 3
var dummy = "";
dummy.__proto__.sayHi = function () { // the proto is the same for all strings, this adds the sayHi fn to all strings
    console.log(this+" hello!");
};
*/
/*
// ---------------
// example 4
var person = {
    sayHi: function () {
        console.log("say hi");
    }
};

var manager = {};
manager.__proto__ = person;
manager.sayHi();
manager.sayHi = undefined; //undefined is a value, different than undefined as in not known
manager.sayHi();
delete manager.sayHi; //this removes the fn assignment from manager

var p1 = {};
var p2 = {};
p1.__proto__ = p2;
 p2.__proto__ = p1; // circular proto - chrome at least will catch this and throw
*/
/*
// ---------------
// example 5
function add(left, right) {
    console.log(`left+right: ${left+right}`);
}
var blegh = new add(1,2);

function Person(name) {
    this.name = name;
    //this.sayHi = function () { console.log("hey"+name); };
}

Person.prototype.sayHi = function () { // comment the fn in the person obj and add it to the person fn prototype, works identically except now it is in the prototype, so up 1 lvl on hasOwnProperty
    console.log("hey "+ this.name);
};

//var p = Person("nelson");
//console.log(p); //this doesnt work
//p.sayHi();

var p = new Person("nelson"); // the new keyword is a constructor
console.log(p);
p.sayHi();

function Person_with_new(name) {
    //js internals when using "new"
    var _this = {};
    __this.__proto__ = Person.prototype;
    //our function
    _this.name = name;
    //js internals
    return _this;
}
//simulate new keyword:
var personObject = {};
personObject.__proto__ = Person.prototype;
Person.call(personObject, "nelson");
personObject.sayHi();
*/
/*
// ---------------
// example 6
function Person(name) {

}
Person.prototype.firstName = "whoa";
var person = new Person("blegh");
console.log(person.firstName);
*/
/*
// ---------------
// example 7
function add(left,right) {
    return left+right;
}
add.prototype.myProp = "hey";
var something = new add(1,2); // new can be applied to anything
console.log(something);
function Person(name) {
    this.name=name;
    return {
        firstName: name, // return is over-ridden, this will be nelson as output
        otherProp: "stuff"
    };
}
var person = new Person("nelson");
console.log(person);
*/
/*
// ---------------
// example 8
var p1 = {
    name:"nelson",
    age: 453
};
p1.__proto__ = {        //proto wont copy over when looking at the assign
    eyeColor: "green"
};
var p2 = {
    name: "blah",
    hairColor: "brown"
};

var p3 = {};
Object.assign(p3,p1,p2);
console.log(p3);
*/
/*
// ---------------
// example 9
function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function () {
    console.log("i am "+ this.name + " and i say hi");
};

var p1 = new Person("person1");
p1.sayHi();
var p2 = Object.create(Person.prototype); //this does create the person, but constructor doesn't fire off
Person.call(p2,"p2"); // this now invokes the constructor function
p2.sayHi();
*/
/*
// ---------------
// example 10
var p = {
  name: "not set",
    sayHi: function () {
        console.log("i am " +this.name);
    }
};

function myCreate(proto) {  //this is more or less Object.create()
    var obj = {};
    obj.__proto__ = proto;
    return obj;
}
var mgr = myCreate(p);
mgr.name = "bossman";
mgr.sayHi();
*/

/*
// ---------------
// example 11
function Person(name, rank) {
    this.name = name;
    this.rank = rank;
}
//Person
Person.prototype = {
    sayName: function () {
        console.log("hello i am "+this.name);
    },
    firePerson: function (person) {
        return false;
    },
    giveRaises: function () {
        return false;
    }
};

var nelson = new Person("nelson", 1);
var joe = new Person("joe",3);

console.log(nelson.firePerson(joe));
//Manager : Person
function Manager(name, rank) {
    Person.call(this,name,rank);
    //this.firePerson =  function (person) { return rank > person.rank; } // could do it this way
}
//Manager.prototype = Person.prototype;   //this is wrong way to approach
//Manager.prototype = {__proto__: Person.prototype};  // could do it this way, but we're modifying __proto__
Manager.prototype = Object.create(Person.prototype);    //Proper way to do it
Manager.prototype.firePerson = function (person) { return this.rank > person.rank; };    //this is changing the person prototype... now joe can fire nelson, but he isnt a manager

var steve = new Manager("steve",10);
steve.sayName();
console.log(steve.firePerson(joe));

//CEO : Manager
function Ceo(name, rank) {
    Manager.call(this,name,rank);
}
Ceo.prototype = Object.create(Manager.prototype); //object.create is like a object proxy that allows editing the new prototype copy without affecting its referenced prototype
Ceo.prototype.giveRaises = function () {
    console.log("raises for everyone!");
    return true;
};

var mark = new Ceo("mark",9000);

mark.sayName(); // mark.__proto__.__proto__.__proto__.hasOwnProperty("sayName") = true
mark.giveRaises();
*/

// ---------------
// example 12
class Person {
    //constructor function
    constructor(name,rank) {
        this.name = name;
        this.rank = rank;
    }
    // all other functions are added to the prototype:
    sayName() {
        console.log("hello i am " +this.name);
    }
    firePerson(person) {
        console.log("can i fire " +person + "?: " + false);
        return false;
    }
    giveRaises() {
        return false;
    }
}

var nelson = new Person("Nelson", 10);
var boo = new Person("boo",1);

class Manager extends Person {
    constructor(name,rank) {
        super(name,rank);
    }
    firePerson(person) {
        return this.rank > person.rank;
    }
}
var steve = new Manager("steve",90);

steve.firePerson(nelson);

class Ceo extends Manager {
    constructor(name,rank) {
        super(name,rank);
    }
    giveRaises() {
        return true;
    }
}

var mark = new Ceo("mark",9000);

mark.giveRaises();

