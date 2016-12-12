# 基于vueCli的webpack-simple模板创建的VUE组件化单页面案例  

> my demo

##需要安装准备的东西：
1.node.js环境（npm管理器）：官网下载 https://nodejs.org/en/
2.cnpm npm淘宝镜像：在命令行中输入 npm install -g cnpm --registry=http://registry.npm.taobao.org
3.vue-cli脚手架构建工具：cnpm install -g vue-cli

##使用vue-cli创建项目模板
1.打开控制台进入项目存放目录，我的项目存储路径为D:\git\

2.创建项目模板，其中webpack-simple为模板类型，vue-simple为项目名称
```shell
vue init webpack-simple vue-simple
```

创建成功后，将在git文件夹下看到vue-simple文件夹，这就是vue-cli帮我们搭建的项目模板

3.安装所有依赖
```shell
cnpm install
```

4.执行项目
```shell
npm run dev
```
在模板中，有两个已经配置好的命令可以执行，一个是dev用作项目开发，一个是build用作生产环境，配置代码在package.json文件中的script属性。

执行成功后，浏览器自动打开http://localhost:8080/，并且支持热更新。

##目录结构
<pre>
.
├── README.md 
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 组件
│   ├── App.vue        // 顶层组件│  
│   └── main.js        // Webpack 预编译入口
</pre>

在基础目录之上，我的扩展目录为：
├── README.md 
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 组件
│   ├── libs           // 核心js模块
│   ├── views          // 页面级组件│  
│   ├── main.js        // Webpack 预编译入口
│   ├── router.js      // 路由文件
│   └── vuex.js        // vuex配置
├── static             // 不需要webpack打包的静态资源（非必须）

##使用到的相关技术
基础框架：vue2.1.0
项目框架：vue-cli webpack-simple
路由：vue-router
HTTP: vue-resource
状态管理：vue-vuex
组件库：mint-ui
数据模拟：mockjs

##项目分析

###项目入口
项目执行通过 npm run dev 命令；dev关键字是在package.json中的script属性配置：
```shell
npm run dev
```




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
