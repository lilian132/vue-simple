<template>
  <div id="gift">
    wo shi gift
    <div class="mydiv" v-touch:swipeUp.prevent="giftTap">dddddddd<br/>{{msg}}</div>
  </div>
</template>

<script>



export default { 
  name: 'app',
  data () {
    return {
      msg: '顶顶顶顶Welcome to Your Vue.js App'
    }
  },
  methods:{
  	giftTap:function(e){
  		alert('giftTap');
  		console.dir(e)
  		return 'giftTap'
  		//console.log(str)
  	},
  	changeMsg:function(){
  		this.msg = 'dddd';
  	},
  }
}
</script>

<style>
.mydiv{
	background: red;
	height: 2000px;
}
</style>
