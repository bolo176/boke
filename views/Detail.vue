<template>
  <div class="home">
    <h1>
      <el-row>
        <el-button plain @click="backPage" class="bbb">返回</el-button>
      </el-row>
    </h1>
    <!-- {{ this.$route.query.id }} -->
    <div class="leftBox">
      <div class="leftBox-top">
        <!-- <img :src="imgArray[0]" alt="" /> -->
        <cjy-magnify
          :width="268"
          :url="imgurl || imgArray[0]"
          :type="'square'"
          :scale="3"
        />
      </div>
      <img
        v-for="(item, i) in imgArray"
        :src="item"
        alt=""
        :key="i"
        v-if="i > 0"
        class="img"
        @click="changeImg(item)"
      />
    </div>

    <div class="rightBox">
      <h1>{{ list.title }}</h1>
      <p>{{ list.supplier }}</p>
      <a>￥{{ list.priceStr }}</a>
      <!-- <img v-for="(item) in xinglist" src="../assets/星星.png" alt="" :key="item" width="20px">
       <img v-for="(item) in xingslist" src="../assets/星星 (1).png" alt="" :key="item" width="20px">
      <a>3.7分</a> -->
      <el-row>
        <el-button type="danger" @click="addShopList(list.Id)">加入购物车</el-button>
      </el-row>
    </div>

    <div class="common">
      <h1>相似商品推荐</h1>
      <ul class="shoplist">
        <li v-for="(item, i) in commonlist" :key="i">
          <router-link :to="'/detail?id=' + item.Id">
            <img v-lazy="item.imageUrl" alt="" />
            <h3>{{ item.title }}</h3>
            <a>￥{{ item.priceStr }}</a>
            <a v-html="item.mack" class="ria"></a>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 商品详细信息 -->
    <h1 class="shoptitle">商品信息</h1>
    <ul class="deformlist">
      <li v-for="item,i in deform" :key="i">
        {{ item }}
      </li>
    </ul>

    <img v-for="(item, i) in imgarr" :src="item" alt="" :key="i"  width="80%"/>

    <img src="../assets/页脚.png" alt="" width="80%">


    <el-button :plain="true" @click="open2" class="tishi">成功</el-button>
    <BackTop />
  </div>
</template>


<script>
import { getDetail, getsameList,getAdd } from "@/tools/ajax";
import BackTop from "@/components/BackTop.vue";

export default {
  components: {
    BackTop,
  },
  data() {
    return {
      id: 0,
      list: [],
      imgarr: [],
      imgArray: [],
      commonlist: [],
      imgurl: "",
      deform:[],
      token:localStorage.getItem('token'),

      xinglist:['a','b','c'],
      xingslist:['a','b']
    };
  },
  methods: {
    getimg(a, b) {
      a.split("[")[1]
        .split("]")[0]
        .split(",")
        .forEach((item) => {
          b.push(item.split('"')[1]);
        });
    },
    get() {
      this.imgArray = [];
      this.imgarr = [];
      this.imgurl = "";
      //   this.list=[]

      // imgs
      getDetail({ goodId: this.id }).then((r) => {
        this.list = r[0];
        // 获取详情页图片

        this.getimg(this.list.descriptionImage, this.imgarr);

        // 获取切换图片
        this.getimg(this.list.imgs, this.imgArray);
        console.log(r);

        // 获取商品详细信息
        var cc = r[0].description.split('[')[1].split(',').length
        for (let i = 0; i < cc; i++) {
          this.deform.push(r[0].description.split('[')[1].split(',')[i].split('\\n')[1]);
        }
        console.log(this.deform);
        
        
       

        console.log(this.list);
        getsameList({ supplier: this.list.supplier }).then((r) => {
          this.commonlist = r;
        });
      });
    },
    show() {
      this.$viewerApi({
        list: this.list,
      });
    },
    changeImg(item) {
      // this.$forceUpdate()
      //  bigImg.src= this.imgArray[0]
      this.imgurl = item;
      //  bigImgs.style.backgroundImage= url(item)
    },
    backPage() {
      this.$router.go(-1);
    },
    addShopList(a){
           console.log(a,this.token);
           if(this.token){
            getAdd({
            token:this.token,
            goodId:a
           }).then(r=>{
            console.log(r);
            this.open2()

           })
           }else{
            console.log(1);
            alert('请先登录');
            this.$router.push('/login')
           }
           
    },
    open2() {
        this.$message({
          message: '加入购物车成功',
          type: 'success'
        });
      },
  },
  created() {
    this.id = this.$route.query.id;
    // this.imgurl = this.imgArray[0]

    this.get();
  },
  watch: {
    $route(newRouter) {
        console.log(111);
      this.id = newRouter.query.id;
      this.get();
     
    },
  },
};
</script>


<style scoped>
.home {
  width: 80%;
  margin: 0 auto;
}
.leftBox {
  width: 50%;
  display: inline-block;
}
.leftBox-top {
  width: 600px;
  margin-bottom: 30px;
  text-align: center;
}
.leftBox-top img {
  width: 500px;
  height: 400px;
}
.img {
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
.rightBox {
  width: 40%;
  height: 300px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
  margin-top: 60px;
  padding-left: 30px;
}
.rightBox p {
  margim-top: 30px;
}
.rightBox a {
  font-size: 22px;
  color: red;
}
.rightBox img {
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
  width: 160px;
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
}
.shoplist li a {
  color: red;
  font-size: 18px;
}

.ria {
  font-size: 16px;
  display: inline-block;
  float: right;
  margin-right: 2px;
}
.ria span:nth-child(1) {
  width: 142px;
}

.deformlist{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
.deformlist li:nth-child(2n+1),
.deformlist li:nth-child(2n){
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom:1px dotted gray;
  margin-bottom: 10px;
  text-align: left;
}
.deformlist li:nth-child(2n+1){
  width: 25%;
}
.deformlist li:nth-child(2n){
  width: 75%;
}
.shoptitle{
  text-align: left;
  margin-top: 50px;
}


.bbb{
  float: left;
}


</style>