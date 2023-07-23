"use strict";
(function () {
    //一abstract开头的类是抽象类
    // 抽象类和其他类区别不大，只是不能用来创建对象
    // 抽象类就是专门用来被继承的类
    // 抽象类中可以添加抽象方法
    class Animal {
        constructor(name) {
            this.name = name;
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
            console.log('我是狗');
            return true;
        }
    }
    const dog = new Dog('sgf', 18);
    console.log(dog.sayHello());
})();
