let b:{name:string,age?:number}


b={name:"sgf",age:18}

// [propsName:string]:any表示任意类型的属性
let c:{name:string,[propsName:string]:any};

c= {name:'sgf',age:18,sex:'男'}

//设置函数结构的类型声明
//语法：（形参：类型，形参：类型...）=>返回值
let f:(a:number,b:number)=>number;

f=function (n1,n2){
    return n1+n2
}

//数组的类型声明 类型[],Array<类型>

let e:string[]
e=['sgf','ryy']

let g:Array<number>
g=[1,2.5]


//元组 固定长度的数组
let h :[string,string]

h=['hello','sgf']


//枚举 enum
enum Gender{
    Male,
    Female
}
let i :{name:string,gender:Gender}
i={name:'sgf',
gender:Gender.Male}
let p :{name:string,gender:Gender}
p={name:'ryy',gender:Gender.Female}

console.log(i.gender === Gender.Male)


//&表示同时
let j:{name:string} & {age:number}
j = {name:'sgf',age:22
}
//类型别名
type myType = 1|2|3|4
let k: myType;
let l:myType;
k=2;
l=3