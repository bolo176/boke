<template>
  <div>
    <ul class="shoplist">
      <li v-for="(item, i) in list" :key="i" @click="gotoPage(item.Id)">
        <router-link :to="'/detail?id='+item.Id">
        <img v-lazy="item.imageUrl" alt="" />
        <h3>{{ item.title }}</h3>
        <a>￥{{item.priceStr}}</a>
        <a v-html="item.mack" class="ria"></a>
        </router-link>
      </li>
    </ul>
    <BackTop /> 
  </div>
</template>

<script>
import { getSearch } from "../tools/ajax";
import BackTop from "@/components/BackTop.vue";
export default {
  components:{
    BackTop 
  },
  data(){
    return{
      name:'',
      list:[]
    }
  },
  methods:{
    get(){
      getSearch( {word:this.name} ).then(r => {
      console.log(r);
      this.list = r
    });
    }
  },
  created() {
    this.name = this.$route.query.key
   this.get()
  },
  watch:{
    $route(){
      this.name = this.$route.query.key
      this.get()
      console.log(111);
    }
  }
};
</script>


<style scoped>
.shoplist{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  margin-top:30px;
}
.shoplist li{
  width: 220px;
  border: 1px solid #d3d3d3;
  margin-bottom: 20px;
  text-align: left;
}
.shoplist li img{
  width: 100%;
}
.shoplist li h3{
  font-size: 16px;
  margin-bottom: 10px;
  color:black
}
.shoplist li a{
  color: red;
  font-size: 18px;
}

.ria{
  font-size: 16px;
  display: inline-block;
  float: right;
  margin-right: 10px;
  
}
.ria span:nth-child(1){
  width: 142px;
}
</style>