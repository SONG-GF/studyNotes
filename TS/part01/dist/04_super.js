"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('动物在叫~');
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            //如果在子类中写了构造函数，在子类过早函数中必须对父类的构造函数调用
            //调用父类的构造函数
            super(name);
            this.age = age;
        }
        sayHello() {
            //在类的方法中super就表示当前类的父类
            super.sayHello();
        }
    }
})();
