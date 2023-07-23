// 使用class关键字来定义一个类
// 对象中主要包含了两个部分：属性和方法
var Person = /** @class */ (function () {
    function Person() {
        // 定义实例属
        //  直接定义的属性是实例属性，需要通过对象的实例去访问
        //  const per=new Person()
        //  per.name
        //  readonly表示只读属性
        this.name = 'sgf';
    }
    //     定义方法
    //     如果方法以static开头则方法就是类方法，可以直接通过类去调用
    Person.prototype.sayHello = function () {
        console.log('Hello 大家好');
    };
    // 在属性前使用static关键字可以定义类属性（静态属性）,可以直接通过类去访问
    // Person.age
    Person.age = 18;
    return Person;
}());
var per = new Person();
console.log(per);
console.log(per.name, Person.age);
console.log(per.sayHello());
//# sourceMappingURL=01_%E7%B1%BB%E7%9A%84%E7%AE%80%E4%BB%8B.js.map