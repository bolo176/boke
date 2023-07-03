<template>
  <div class="home">

 
 
    <Banner/>
  <HelloWorld/>
  <BackTop/>

  
</div>
</template>

<script>
// @ is an alias to /src getTypeOner
import Banner from '@/components/Banner.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import BackTop from '@/components/BackTop.vue'

export default {
  name: 'HomeView',
  components: {
    Banner,
    HelloWorld,
    BackTop
  },
  data(){
      return{
       
      }
  },
 
  methods:{
    
  }
}
</script>

<style scoped>
 
</style>
