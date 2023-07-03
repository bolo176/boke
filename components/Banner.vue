<template>
    <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in list" :key="item">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
</template>


<script> 
import {getBanner} from '@/tools/ajax'
export default {
  name: 'Banner',
  data(){
    return{
        list:[]
    }
   
  },
  created(){

    getBanner().then(r=>{this.list = r.data})
  }
}

</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    height: 500px;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    height: 500px;
  }
  .el-carousel{
    width: 80%;
    margin: 0 auto;
    height: 500px;
  }

  .el-carousel img{
    border-radius: 30px;
  }

  .el-icon-arrow-right{
    
  }
</style>
