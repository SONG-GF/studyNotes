let a :10;

//可以使用| 来连接多个类型（联合类型)
let  b :"male" | "female";

let c :string | boolean;

c=true;
c="sgf"


//unknown 表示未知类型的值
let e :unknown;

e=1;
e='hello'

//s=e这是不允许的，
// unknown实际上就是一个安全类型的any
//不能直接赋值给其他变量
if(typeof e === 'string'){
   let s =e;
}


//类型断言,可以用来告诉解析器变量的实际类型
let s =e as string;

function fn():void{//函数没有返回值
//    ===undefined
}

//never从来不会有返回值
function fn2(message):never{//函数没有返回值
//    ===undefined
    throw new Error(message)
}