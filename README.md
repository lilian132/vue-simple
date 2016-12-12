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
<pre>
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
</pre>

##使用到的相关技术
基础框架：vue2.1.0

项目框架：vue-cli webpack-simple

路由：vue-router

HTTP: vue-resource

状态管理：vue-vuex

组件库：mint-ui

数据模拟：mockjs

router resource vuex mint-ui等模块vue-cli webpack-simple模板中不包含，需要自己cnpm安装

##项目分析

###项目启动与打包
项目执行通过 npm run dev 命令；
```shell
npm run dev
```

项目打包通过 npm run build 命令；
```shell
npm run build
```

dev关键字是在package.json中的script属性配置：
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}

--open 自动打开默认浏览器 --inline --hot 热加载

###项目入口

####webpack.config.js 配置

```
entry: './src/main.js',
output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production'?'./dist/':'/dist/', //开发环境必须为绝对路径才支持热更新，发布可以改成相对路径
    filename: 'build.js'
  }  
```

1.webpack打包项目默认会执行根目录下的index.html页面，并且js入口为entry配置，即src目录下的main.js

2.output中配置打包文件：path为入口js文件存放地址，这里放在dist发布路径下；publicPath为其它打包资源发布地址（如css模块中的图片），开发模式下改成相对路径就可以支持项目直接本地运行而不需要服务器，当然这个配置不是必须的；filename是入口文件名称，这里直接用build.js

####入口页面和入口js

[入口index.html]:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-simple</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <!--<link rel="stylesheet" type="text/css" href="static/css/base.css"/>-->
    <!--<script type="text/javascript" src="static/js/zepto.js"></script>-->
  </head>
  <body>
    <div id="app" v-cloak>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
    <script src="dist/build.js"></script>
  </body>
</html>
```

1.head中特意引用了两个加注释的外链仅仅作为演示如何绕过webpack这种构建工具引用外部文件，static放的静态资源都是和webpack无关。在后面的项目分析中，全部是通过webpack打包的。

2.id为app的元素即为vue的顶层实例挂载元素

3.dist/build.js为webpack将入口main.js自动打包出来的入口文件

当npm run dev时，该页面自动被默认浏览器以http://localhost:8080/打开（端口号如被占用自动变成其它端口号）

[入口main.js]:

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex'
import routes from './routers'
import './assets/css/base.css'
// 也可以用commonjs写法 require('./assets/css/base.css');
import './assets/css/common.css'
import appFooter from './components/footer'

Vue.use(VueRouter)
// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
  el: '#app',
  router,
  store,
  components: { appFooter }
})

```

实际上这里就是初始化了顶级VUE实例，挂载在id为app的标签上，同时使用路由和vuex，还加载了一个footer的组件。具体语法参照ES6和VUE2.0

###Vue-router

routers.js：

```
import Home from './views/index.vue'
// import Gift from './views/gift.vue'

const routers = [{
    path: '/',
    name: 'home',
    component: Home
},  {
    path: '/gift',
    name: 'gift',
    //component: Gift
    component(resolve) {
        // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
        require.ensure(['./views/gift.vue'], () => {
            resolve(require('./views/gift.vue'));
        });
    }
}, {
    path: '*',
    component: Home
}];

export default routers;

```

这里主要配置了两个路由，一个主页加载home组件，一个礼包页加载gift组件
require.ensure是webpack懒加载的方法，如果你希望一次性打包所有组件，可以参照注释中的代码

详细用法：https://router.vuejs.org/zh-cn/

由于path: '/'配置的路由地址为组件Home，所以在main.js中，会自动将Home组件加载进
<router-view></router-view>标签中

###Vuex

vuex.js：

```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const homeNavIndex = new Vuex.Store({
    state: {
        index: ''
    },
    getters: {
        getIndex(state) {return state.index;}
    },
    mutations: {
        setIndex(state, index) {state.index = index;}
    },
    actions: {
        setIndex({ commit }, index) {commit('setIndex', index);}
    }
});

const store = {
    homeNavIndex
}

export default store

```

这里简单配置了一个homeNavIndex模块，记录的state属性index为首页数据导航栏的索引值。

组件中对store值读取和操作的方法：
```
this.$store.homeNavIndex.getters.getIndex
this.$store.homeNavIndex.dispatch('setIndex', this.selected)
```

详细用法：https://vuex.vuejs.org/zh-cn/

###组件分析

<pre>
├── components                  
│   ├── footer.vue               //底部公用导航
│   ├── swipe-home.vue           //首页轮播图
│   ├── tapNav-home.vue          //首页tap内容导航组件
│   ├── tapNavContent1-home.vue     //首页tap1内容组件 
│   ├── tapNavContent2-home.vue     //首页tap2内容组件 
│   ├── tapNavContent3-home.vue     //首页tap3内容组件 
│   └── tapNavContent4-home.vue     //首页tap4内容组件 
├── views（页面级别组件）          
│   ├── gift.vue                 //gift页面组件
│   ├── index.vue                //home页面组件
</pre>

views目录存放页面级组件，components目录存放页面中拆分出来的各个小模块的组件，并且项目是以mint-ui组件库为基础组件库，也就是说实际上在components中的组件很多依赖mint-ui的，如果不引入第三方库而是自己开发基础组件，则建议这里增加一个baseComponents目录，components中的组件是在基础组件上根据不同的项目需求扩展的组件。

*index.vue*
```
<template>
    <div id="index">
      <swipe></swipe>      
      <tapNav></tapNav>      
    </div>
</template>

<script>
import swipe from '../components/swipe-home'
import tapNav from '../components/tapNav-home'

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components: { swipe,tapNav }
}
</script>

<style>
body{
  background: #f5f5f5
}
#app{
  padding-bottom: 51px;
}
</style>
```

*gift.vue*

```
<template>
  <div id="app">
    wo shi gift
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '顶顶顶顶Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
```


*footer.vue*

```
<template>
  <div id="footer">
    <ul class="box-flex">
      <li v-for="item in items" class="box-flex-item">
        <router-link :to="{ name: item.href}" :class="{'on':item.href==curHref}">
          <i class="iconfont" :class="[item.class]"></i>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      items: [
        {name:'游戏',class:'icon-zhuye',href:'home'},
        {name:'礼包',class:'icon-kefu',href:'gift'}
      ],
      curHref:'home'
    }
  },
  watch: {
    // 如果路由有变化，会执行该方法
    '$route': 'routeChange'
  },
  methods: {
    routeChange () {
      this.curHref = this.$route.name; 
    }
  }
}
</script>

<style scoped>
...省略
</style>

```

1. 这里面使用到字体样式，是在index.vue中的common.css中，webpack将会把字体文件单独放到build文件夹中
2. style标签被标注scoped，则该CSS将只支持本组件而不会影响到其它组件样式，原理是通过增加属性样式达到CSS模块化

*swipe-home.vue*

```
<template>   
    <mt-swipe :auto="4000">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe> 
</template>

<script>
import Vue from 'vue'
import {Swipe, SwipeItem} from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'swipe',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
...省略
</style>

```

这里引用了mint-ui：http://mint-ui.github.io/docs/#!/zh-cn2

特别指出的是，这里有两种加载mint-ui的方式，一种是全部打包，一种是按需打包，本项目中使用按需打包，按需打包需要做些额外的配置工作。

按需引入

借助babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的
首先，安装 babel-plugin-component：
npm install babel-plugin-component -D
然后，将 .babelrc 修改为：
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}

详细参见 http://mint-ui.github.io/docs/#!/zh-cn2/quickstart

*tapNav-home.vue*

```
<template>  
<div>
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">热门</mt-tab-item>
    <mt-tab-item id="2">新上架</mt-tab-item>
    <mt-tab-item id="3">资讯</mt-tab-item>
    <mt-tab-item id="4">新开服</mt-tab-item>
  </mt-navbar>
  <!-- tab-container -->
  <mt-tab-container v-model="selected" :swipeable='true'>
    <mt-tab-container-item id="1">
      <tapNavContent1 :selected="selected=='1'"></tapNavContent1>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <tapNavContent2 :selected="selected=='2'"></tapNavContent2>
    </mt-tab-container-item>
    <mt-tab-container-item id="3">
      <tapNavContent3 :selected="selected=='3'"></tapNavContent3>
    </mt-tab-container-item>
    <mt-tab-container-item id="4">
      <tapNavContent4 :selected="selected=='4'"></tapNavContent4>
    </mt-tab-container-item>
  </mt-tab-container>
</div> 
</template>

<script>
import Vue from 'vue'
import { Navbar, TabItem } from 'mint-ui'
import { TabContainer, TabContainerItem } from 'mint-ui'
import tapNavContent1 from './tapNavContent1-home'
import tapNavContent2 from './tapNavContent2-home'
import tapNavContent3 from './tapNavContent3-home'
import tapNavContent4 from './tapNavContent4-home'

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
  name: 'swipe',
  data () {
    return {
      selected: '1'
    }
  },
  mounted(){
    var index = this.$store.homeNavIndex.getters.getIndex;
    if(index){
      this.selected = index;
    }
  },
  watch: {
    selected:function(val, oldVal){
      //将索引变化值记录到store
      this.$store.homeNavIndex.dispatch('setIndex', this.selected);
    }
  },
  components: { 
    tapNavContent1,
    tapNavContent2,
    tapNavContent3,
    tapNavContent4
  }
}
</script>

<style scoped>
...省略(父样式)
</style>
```

1. 这里data中的selected记录了用户选择的当前tap索引（这里以1作为第一个tap）;当用户选择tap切换的时候，使用watch方法监听并且同步到store当中去；因为当页面切换时home组件会被销毁导致用户选择的tap被重置，保存索引当home组件重新加载的时候执行mounted函数，selected值还原。
2. 这里面分别引用了4个tapNavContent组件，之所以是4个是因为每个content区域业务逻辑都不相同，通过绑定动态属性（参照父子组件数据props沟通方式），告诉tapNavContent子组件你是否被选中。

*tapNavContent1-home.vue*
```
<template>  
<ul
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="scrollDisabled"
  infinite-scroll-distance="30">
  <li v-for="item in list">
    <div>
      <img :src="item.icon"/>
    </div>   
    <div class="game-text">
      <p>{{item.title}}</p>
      <p class="small">{{item.brief_intro}}</p>      
    </div>
  </li>
</ul>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui'
import data from '../libs/data'

Vue.use(InfiniteScroll);

export default {
    data() {
      return {
        list: [],
        loading: false,
        page:1
      };
    },
    props:['selected'],  
    computed: {
      scrollDisabled(){
        return (!this.selected||this.loading)
      }
    },
    methods: {
      loadMore() {
        var _this = this;
        if(this.loading)return;
        this.loading = true;    
        console.log('1111111111');
        data.getHotGames(this.page).then((response) => {          
            var data = eval('('+response.data+')').data;           
            for (let i = 0; i < data.length; i++) {                       
              this.list.push(data[i]);
            }
            this.page += 1;
            setTimeout(function(){_this.loading = false;},2000)            
        }, (response) => {
            // 响应错误回调
        });
      }
    },
    watch: {
      selected(val){ 
        if(this.selected && this.list.length == 0){          
          this.loadMore();
        }
      }
    }
    
  };
</script>

<style scoped>

</style>

```

import data from '../libs/data'：所有和http所有操作统一放在lib目录中的data.js模块中，组件需要发起http请求只能调用data对象的方法，并且data.getHotGames(this.page)返回的是一个promise对象。

data.js(使用了mockjs做数据模拟):

```
import Vue from 'vue'
import resource from 'vue-resource'
import mock from './mock'

Vue.use(resource);
var vue = new Vue()

module.exports = {
    getHotGames:function(page){     
        return vue.$http.get('http://web.11h5.com:4600/api',{           
            page: page,
            pageSize: 10
        })
    }
}
```
