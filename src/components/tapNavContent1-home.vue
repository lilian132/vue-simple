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
        allLoaded: false,
        wrapperHeight: 0,
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
<style>

</style>
