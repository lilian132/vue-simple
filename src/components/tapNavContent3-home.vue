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
<!-- <div>dddd</div> -->
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
    mounted() {
      console.log(this.selected);
      //this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      // for (let i = 1; i <= 20; i++) {
      //   this.list.push(i);
      // }      
    },
    computed: {
      scrollDisabled(){
        return (!this.selected||this.loading)
      }
    },
    methods: {
      loadMore() {        
        var _this = this;
        //console.log(this.loading);
        if(this.loading)return;
        this.loading = true;    
        console.log('3333333333');
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
        //console.log(this.list.length);
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
