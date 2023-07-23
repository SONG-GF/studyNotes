"use strict";
class Dog {
    // constructor 被称为构造函数
    //    构造函数会在对象创建时调用
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    back() {
        console.log(this.name);
    }
}
const dog = new Dog('小黑', 2);
const dog2 = new Dog('小白', 3);
dog.back();
