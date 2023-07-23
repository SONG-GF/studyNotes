webpack笔记

[(22条消息) webpack使用教程_webpack的使用_前端徐老师的博客-CSDN博客](https://blog.csdn.net/qq_40096030/article/details/114362529)

[webpack超详细教程！入门一篇就够了 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1493790)

### webpack是什么

![微信图片_20230322200057](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322200057.png)

```text
本质上，webpack 是一个用于现代 JavaScript 应用程序的_静态模块打包工具_。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。
```

### 为什么要使用webpack

我们在平常开发过程中可能经常遇到以下问题

1. 浏览器不支持less sass语法(缺乏样式编译功能)
2. 不支持es6/es7(缺乏babel编译功能，把es6转成es5)
3. 开发的时候要是我们修改一下代码保存之后浏览器就自动更新就好了(缺乏热更新功能)
4. 本地请求远程接口会产生跨域问题(缺乏请求代理功能)
5. 项目要上线了，要是能一键压缩代码啊图片什么的就好了（缺乏自动压缩打包功能）

webpack就是为了解决以上种种问题的

### webpack 如何运行？

1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
2. webpack 就会去项目的根目录中，查找一个叫做 `webpack.config.js` 的配置文件
3. 找到配置文件后，webpack 就会解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中，导出的配置对象
4. 当 webpack 拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建
5. 如果 webpack 发现既没有 webpack 命令 ，也没有配置文件，他就会报错

### webpack的五个核心概念

1.**入口(entry)**：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

2.**出口(output)**：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中

3.**loader**:loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

4.**插件(plugins)**:loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务

5.**模式**:通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
新的改变

### 开始使用

```
1.使用 npm init 初始化一个项目，并安装webpack
2.npm i webpack webpack-cli -g // 全局安装
3.npm i webpack webpack-cli -D //写入到package.json的开发依赖中
```

4.按如下结构创建文件

```
 |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

index.js文件

```js
function add(x,y){
    return x+y
}
console.log(add(1,2))
```

运行下面的指令就打包完成了

```
npx webpack
```

html文件引入打包后的main.js文件
html文件放在dist目录下

5.下面验证一下json文件是否能正常打包

src目录下新建data.json文件，内容如下

```json
{
    "name":"小明",
    "age":18
}
```

index.js

```js
import data from "./data.json";
console.log(data)
function add(x,y){
    return x+y
}
console.log(add(1,2))
```

重新打包

```
npx webpack
```

执行结果没有问题

6.下面验证css文件是否能正常打包
`src目录下新建index.css,内容如下`

```js
html,body{
    height: 100%;
    background-color: pink;
}
```

index.js

```js
import "./index.css"
import data from "./data.json";
console.log(data)
function add(x,y){
    return x+y
}
console.log(add(1,2))
```

重新打包

```
npx webpack
```

打包会报错，说明webpack不能处理css/img资源

### 打包样式资源

```
前面我们说过webpack无法处理样式资源，如果要处理，需要引入loader，写loader我们需要先写一下webpack的配置文件，配置一下webpack 作用就是指挥webpack怎么干活，干哪些活
webpack的配置文件要求必须在根目录下，名称必须为webpack.config.js
```

在根目录下创建webpack.config.js

```js
//resolve是用来拼接绝对路径的方法，path是node自带的模块可以直接引入
const {resolve} =require("path")
module.exports={
    //入口，指示webpack从哪个文件开始打包
    entry:"./src/index.js",
    //出口，定义webpack的输出
    output:{
    	//最终打包后输出的文件名
        filename:"bundle.js",
        //最终打包好的文件输出的位置 ，__dirname是node的一个变量，代表当前文件的目录的绝对路径
        path:resolve(__dirname,"dist")
    },
    //loader的配置
    module:{   
    //定义规则，遇到什么类型的文件应该调用 什么loader去处理
        rules:[
            {
                //匹配哪些文件
                test:/\.css$/,
                //使用哪些loader进行处理
                //use数组中loader执行顺序，从右到左，从下到上，依次执行
                use:[
                    //style-loader的作用是创建一个标签，将js中的css样式资源插入进去，添加到页面中的head中生效
                    'style-loader',
                    //css-loader的作用是将css文件以字符串的形式变成common.js的模块加载到js中，内容是样式字符串
                    'css-loader'
                   
                ]
            }
        ]
    },
    //plugins的配置
    plugins:[

    ],
    //模式
    mode:"development"
}
```

我们这里用到了css-loader和style-loader两个包,所以需要下载这两个包

```
npm i css-loader style-loader -D
```

重新打包，运行成功

这个时候dist目录下生成了一个bundle.js文件默认是main.js但是因为我们改了配置所以生成了bundle.js改一下html的引入文件，访问html文件，发现样式生效了

2.那么是否能解析less文件呢

src目录下新建index.less

```
#title{
    color:yellow
}
```

src--index.js

```
import "./index.css"
import "./index.less"
```

打包–报错，因为没有配置less的loader
webpack.config.js配置一下，然后安装less-loader和less

```
npm i less-loader -D
npm i less -D
```

配置文件做如下修改

![微信图片_20230322201335](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322201335.png)

index.html

```
<div id="title">hello
</div>
```

重新打包，文字样式已经生效说明，less文件成功执行

### 插件

先安装插件

```
npm i html-webpack-plugin -D
```

引入webpack插件
功能:默认会创建一个新的html文件，自动引入打包输出的所有资源(js/css)；可以简化HTML文件的创建，并且可以将你指定的打包的文件自动插入到页面中去

webpack.config.js添加如下配置，其他配置不用动

```js
	const HtmlWebpackPlugin=require("html-webpack-plugin")
  //plugins的配置
    plugins:[
		new HtmlWebpackPlugin()
    ],
```

运行打包 npx webpack
会发现多了一个html文件

![微信图片_20230322201604](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322201604.png)

目前输出的是一个空的html文件，如果我需要一个有结构的html文件应该怎么办，
修改一下配置

![微信图片_20230322201750](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322201750.png)

这样重新打包，webpack生成的html会自动复制src里面的index.html的内容，并自动引入打包输出的所有资源(js/css)

### 打包图片资源

src目录下新建img文件夹，放入一张图片
src--index.html

![微信图片_20230322201944](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322201944.png)

src--index.css

![微信图片_20230322202024](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202024.png)

运行 npx webpack打包会发现报错了

报错的原因正是因为我们引入的那种图片 ，因为webpack不能处理图片资源
所以我们需要对图片进行处理，同样也是用loader

1.先下载两个loader

```
npm i url-loader file-loader -D
```

2.修改webpack.config.js

![微信图片_20230322202133](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202133.png)

运行打包 npx webpack
如果图片大于8kb会发现是正常打包的，如果图片小于8kb，会被base64处理，但是这种情况处理不了img标签引入的图片，因为打包之后文件名都变了，所以你引入的那个文件就找不到了

再加入一个loader

```
npm i html-loader -D
```

![微信图片_20230322202239](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202239.png)

运行打包，发现还是不行，引入的路径是个对象

问题：

url-loader默认使用es6模块解析，
但是html-loader使用的是common.js,解析会出问题
解决：关闭url-loader的es6模块化，使用commonjs解析

![微信图片_20230322202332](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202332.png)

重新运行 npx webpack就没问题了
如果嫌打包之后的图片名字太长，可以进行处理

### devServer自动打包

目前我们的每次修改都需要重新打包，不然总是显示之前的效果。此时我们需要创建一个服务器帮助我们解决这个问题

1.先下载这个服务

```
npm i webpack-dev-server -D
```

2.webpack.config.js编写配置

![微信图片_20230322202503](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202503.png)

3.启动服务器

```
npx webpack  serve
```

此时如果修改别的文件，会发现页面自动就更新了不需要重新打包

### 打包优化

目前我们打包的html文件 css文件 img文件 js文件都直接存放到dist根目录了，很乱，能不能按照文件夹归类好

![微信图片_20230322202617](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202617.png)

webpack.config.js

js输出优化：直接在filename后面加上文件夹的名字重新打包即可

![微信图片_20230322202659](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202659.png)

img输出优化

![微信图片_20230322202741](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202741.png)

css不需要优化，因为css都嵌入到js中了
重新运行npx webpack即可完成打包，就能看到打包好的文件就已经分类好了

### 提取css文件

1.首先下载插件

```js
npm i mini-css-extract-plugin -D
```

2.修改配置vue.config.js

```js
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
```

![微信图片_20230322202907](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202907.png)

3.删除style-loader 替换为我们的loader
因为style-loader的作用是创建style标签插入样式，但是我们现在是一个单独的css文件不需要style标签

![微信图片_20230322202946](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322202946.png)

4.运行打包
如果报错，加一个下面的配置

![微信图片_20230322203033](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322203033.png)

### 压缩css

1.下载插件

```
npm i optimize-css-assets-webpack-plugin -D
```

2.更改配置 webpack.config.js

```js
const OptimizeCssAssetsWebpackPlugin=require("optimize-css-assets-webpack-plugin") 
```

![微信图片_20230322203135](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322203135.png)

```
npx webpack 
```

就能看到css代码经过了压缩

### 性能优化

开发环境优化
优化打包构建速度
示例
`新建a.js和b.js文件，分别导出一个函数`

![微信图片_20230322203221](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322203221.png)

在index.js文件中引入并调用

![微信图片_20230322203254](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322203254.png)

------

此时发现控制台输入了a和b，如果此时我修改了a.js文件的输出，那么会发现整个页面重新刷新了，b页面也重新执行了一次，那么问题来了，如果我这个项目有一百个js文件，当我修改了其中一个文件之后，其他99个文件并没有修改但也是重新执行了，这种效率肯定很浪费。



引入一个新的东西来解决这个问题叫**HMR**

HMR:hot module replacement 热模块替换

作用：一个模块发生变化，只会重新打包这一个模块而不是所有模块
极大提升构建速度

使用方法，只需要在服务器配置加入hot：true就可以，注意需要重启服务

![微信图片_20230322203457](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322203457.png)

接下来修改js文件，改变a文件的输出，发现整个页面还是被重新加载了。
因为js文件默认不能使用HMR功能
添加支持HMR功能的代码

html文件也不能使用hmr功能（也不需要使用），并且也不能热更新，修改html文件并不会直接更新界面
解决：修改entry入口，将html文件引入,但是hmr还是不生效，因为我们的项目html文件
就只有一个，所以当html更改，这个文件一定会更新，不像是js文件有多个，可以单独
更新某一个

### 处理 ES6 的高级语法

在 `webpack` 中，默认只能处理一部分 ES6 的语法，一些更高级的 ES6 语法 语法或者 ES7 语法，webpack 是处理不了的；这时候，就需要借助于第三方的 loader ，来帮助 webpack 处理这些高级的语法，而第三方的 loader 把高级语法转为低级语法之后，会把结果交给 webpack 去打包到我们要打包的文件中

而我们通过 Babel，可以帮我们将高级的语法转换为低级的语法

在 `webpack` 中，必须装两套包，才能实现将高级语法转为为低级语法的功能

1. 第一套

- `babel-core` 、 `babel-loader` 、 `babel-plugin-transform-runtime`

1. 第二套

- `babel-preset-env` 、 `babel-preset-stage-0`

```
npm i babel-core babel-loader babel-plugin-transform-runtime -D
npm i babel-preset-env babel-preset-stage-0 -D
```

webpack.config.js

![微信图片_20230322204443](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322204443.png)

注意：

- 在配置 babel 的 loader 规则的时候，必须把 `node_modules` 目录，通过 `exclude` 选项排除掉，原因有两个：
- 如果不排除 `node_modules` ，则会把 `node_modules` 中所有的第三方 JS 文件都打包编译，这样会非常消耗CPU，同时，打包速度非常慢；
- 如果不加上，最终，Babel 把 所用 `node_modules` 中的 JS 转换完毕了，但是项目依然是无法正常运行的

而后，我们必须还要在项目的根目录中，新建一个叫做 `.babelrc` 的 `Babel` 配置文件，这个配置文件，属于 **JSON** 格式，所以，在写 `.babelrc` 配置的时候，必须符合 JSON 语法规范；不能写注释，字符串必须用双引号，而该文件中写如下内容：

```json
{
    "presets": ["env","stage-0"],
    "plugins": ["transform-runtime"]
}
```

### 在 webpack 中使用网页中的Vue

在 webpack 中，使用 `import Vue from vue` 导入的 Vue 构造函数功能不完整，只提供了 runtime-only 的方式，并没有提供网页中那样的使用方法；

安装

```javascript
npm i vue -D
```

 使用

首先在 `main.js` 中引用 vue， `import Vue from'vue'`

而后打开 `webpack.config.js` 在其中加入一个 `resolve` 同级的对象，其中加入一个 `alias` 对象，写入 `'vue$':'vue/dist/vue.min.js'` ，它检查到这句话，就会将我们 vue 指向的文件为：`vue.min.js` ，而不是它默认的指向文件 `vue.runtime.common.js`

```
const path = require('path');
const webpack = require('webpack');
const htmlWebPackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: path.join(__dirname,'./src/main.js'),//入口文件
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js' //指定输出的名称
    },
    plugins:[
        new htmlWebPackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module: {   // 这个节点，用于配置所有第三方模块加载器
        rules:[ // 所有第三方模块 匹配规则
            {
                test: /\.css$/,     // 匹配以.css文件结尾的文件
                use: ['style-loader','css-loader'] // 指定要处理的.css文件的加载器
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use:'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve:{
        alias:{ // 设置 vue 导入包中的 文件
            'vue$': 'vue/dist/vue.min.js'
        }
    }
}
```

### 如何使用 vue.runtime.common.js

在 src 目录中创建一个后缀名为 `.vue` 的文件 ，其实它就是一个组件

![微信图片_20230322204927](C:\Users\13593\Desktop\webpack笔记\笔记中用到的图片\微信图片_20230322204927.png)

但是如果运行还是会报错的，我们还必须安装 vue-loader

注意：

使用 `vue.runtime.common.js` 要把刚刚在 `webpack.config.js` 中配置的 `resolve` 对象给删除掉才行

### 在 webpack 中配置 vue-loader

安装

```
npm i vue-loader vue-template-compiler -D
```

### 如何在 webpack 使用 vue-router

```
npm i vue-router -D
```

