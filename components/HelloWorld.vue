<template>
  <div class="hello">
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
  </div>
</template>

<script>
import { getGoodList } from "@/tools/ajax";
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      num:1
    };
  },
  created() {
    getGoodList({ page: 1 }).then((r) => {
      this.list = r;
      console.log(this.list);
    });
  },

  methods: {
    load() {
      let viewHeight = window.innerHeight;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let htmlHeight = document.documentElement.offsetHeight;
      if (viewHeight + scrollTop >= htmlHeight - 10) {
        console.log(1);
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.request();
        }, 100);
      }
    },
    request() {
      this.num++
      getGoodList({ page: this.num }).then((r) => {
      this.list.push(...r);
      console.log(this.list);
    });
    },
    gotoPage(i){
      console.log(i);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.load);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.load);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
