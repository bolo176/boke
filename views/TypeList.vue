<template>
  <div>
    <ul class="titlelist">
      <li v-for="(ite, t) in skipList" :key="ite" class="lit">
        <h1 :id="'a' + t">{{ ite }}</h1>
        <ul class="shoplist">
          <li v-for="(item, i) in list" :key="i" v-if="ite == item.type_two">
            <router-link :to="'/detail?id='+item.Id">
            <img v-lazy="item.imageUrl" alt="" @click="chan" />
            <h3>{{ item.title }}</h3>
            <a>￥{{ item.priceStr }}</a>
            <a v-html="item.mack" class="ria"></a>
          </router-link>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="skip">
      <li v-for="(item, i) in skipList" :key="i">
        <a @click="changeHash('#' + 'a' + i)">{{ item }}</a>
      </li>
    </ul>

    <BackTop/>
  </div>
</template>


<script>
import { getGoodList } from "@/tools/ajax";
import shangpinglist from "@/components/shangpinglist.vue";
import BackTop from '@/components/BackTop.vue'
export default {
  name: "TypeList",
  components:{
    BackTop
  },
  data() {
    return {
      list: [],
      skipList: [],
      ss: "",
    };
  },
  watch: {
    $route(newRoute) {
      console.log(newRoute.query.name);
      this.ss = newRoute.query.name;

      this.chan();
    },
  },
  created() {
    this.chan();
  },
  methods: {
    chan() {
      this.skipList = [];
      getGoodList({ type_one: `${this.$route.query.name}` }).then((r) => {
        this.list = r;

        for (let i = 0; i < this.list.length; i++) {
          this.skipList.push(this.list[i].type_two);
        }

        this.skipList = Array.from(new Set(this.skipList));
        console.log(this.skipList);
      });
    },
    changeHash(idname) {
      document.querySelector(idname).scrollIntoView(true);
    },
    onload(){
      var lis = document.querySelectorAll('.lit')
      var lists = document.querySelectorAll('.skip li a')
      console.log(lists);
      for (let i = 0; i < lis.length; i++) {
        var t = lis[i].offsetTop
        var h = document.documentElement.scrollTop || document.body.scrollTop
     

        if(t <= h+ window.innerHeight/2 +50 && t + lis[i].offsetHeight >= h+ window.innerHeight/2){
          lists[i].style.color="red"
        }else{
          lists[i].style.color="black"
        }
      }
    }
  },
  mounted(){
    window.addEventListener('scroll',this.onload)
  },
  beforeDestroy(){
    this. onload = null
  }
};
</script>


<style scoped>
.titlelsist {
  width: 80%;
  margin: 0 auto;
}
.shoplist {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 30px;
}
.shoplist li {
  width: 220px;
  border: 1px solid #d3d3d3;
  margin-bottom: 20px;
  text-align: left;
}
.shoplist li img {
  width: 100%;
}
.shoplist li h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: black;
}
.shoplist li a {
  color: red;
  font-size: 18px;
}

.skip {
  width: 200px;
  background-color: aqua;
  position: fixed;
  top: 220px;
  border-radius: 20px;
}
.skip li {
  height: 40px;
  line-height: 40px;
}

a{
  cursor: pointer;
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