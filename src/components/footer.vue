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
// require('../assets/css/base.css');
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
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  border-top: 1px solid #ddd;
}
ul,li{
  height: 100%;
}
a{
  display: inline-block;
  height: 100%;
  width: 100%; 
  box-sizing: border-box;
  padding-top: 2px;
  text-align: center;
}
a.on{
  color: red;
}
</style>
