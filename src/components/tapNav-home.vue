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
.mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
}
</style>
<style>
.mint-tab-item .mint-tab-item-label{
  font-size: 14px;
  color: #666;
}
.mint-tab-item.is-selected .mint-tab-item-label{
  color: #26a2ff;
}

/*tapNavContent*/
.mint-tab-container-item li{
  height: 50px;
  padding: 10px;
  background:#fff;
  margin-top: 5px
}
.mint-tab-container-item img{
  width: 50px;
  height: 50px;
  float: left;
}
.game-text p{
  line-height: 25px;
  padding-left: 62px;
}
.game-text p.small{
  font-size: 12px;
  color: #666;
}
</style>
