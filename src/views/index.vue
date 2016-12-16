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
