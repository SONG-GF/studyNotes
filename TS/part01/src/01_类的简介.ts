
// 使用class关键字来定义一个类
// 对象中主要包含了两个部分：属性和方法

class Person{
   // 定义实例属
   //  直接定义的属性是实例属性，需要通过对象的实例去访问
   //  const per=new Person()
   //  per.name
   //  readonly表示只读属性
    readonly name:string ='sgf';
    // 在属性前使用static关键字可以定义类属性（静态属性）,可以直接通过类去访问
    // Person.age
    static age:number=18;

//     定义方法
//     如果方法以static开头则方法就是类方法，可以直接通过类去调用
    sayHello(){
        console.log('Hello 大家好')
    }

}

const  per = new Person();
console.log(per)
console.log(per.name,Person.age)
console.log(per.sayHello())
