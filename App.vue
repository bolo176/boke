<template>
  <div id="app">
    <div class="wid">

    <div class="topbox">
    <el-row :gutter="20" class="bt">
      <el-col :span="8">
        <div class="grid-content bg-purple">
        <img src="./assets/logon.png" width="188px" alt="" />
      </div>
    </el-col>
    <div class="boxx">
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-input v-model="input" placeholder="请输入内容">
        </el-input> 
      </div></el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <router-link :to="'/search?key='+input">
          <button @click="changeSearch">搜索</button>
        </router-link>
      </div>
    </el-col>
  </div>
    </el-row>


    <el-row :gutter="20" v-if="!this.$store.state.isLogin">
      <el-col :span="3"><div class="grid-content bg-purple">
        <router-link to="/">首页</router-link> 
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <router-link to="/login">登录</router-link>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <router-link to="/resgit">注册</router-link>
      </div></el-col>
    </el-row>

    <el-row :gutter="20" v-else>
      <el-col :span="3"><div class="grid-content bg-purple">
        <router-link to="/">首页</router-link> 
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <router-link to="/shop">购物车</router-link>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <a @click="changeLogin">退出登录</a>
      </div></el-col>
    </el-row>
  </div>
    <hr>
  </div>
  <div class="chang"></div>

    <ul class="typelist" v-show="$route.meta.istrun">
      <li v-for="item,i in typeList" v-if="i<9"  @click="gotoPage(item)"  :key="i" >
        {{item}}
      </li>
    </ul>

    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
   
  </div>
</template>

<script>
import {getTypeOner} from '@/tools/ajax'
  export default {
    data(){
      return{
        input:'',
        typeList:[],
        istrun:true
      }
    },
    methods:{
      changeSearch(){
        console.log(1);
      },
      gotoPage(item){
        this.$router.replace(this.$route.path).catch(err => err)
      this.$router.push({path: '/typeList', query: {name: item}});
      
    },
    changeLogin(){
      console.log(this.$store.state.isLogin);
      this.$store.commit('clearLogin',this.$store.state.isLogin,false)
      localStorage.removeItem('token')
      this.$router.push('/')

    },
    handleScroll(){
      let h = document.body.scrollTop || document.documentElement.scrollTop
    console.log(h);
    var boxx = document.querySelector('.boxx');
      // if(h > 140){
      //     boxx.style.position = 'fixed'
      //     boxx.style.left = 1000+'px'
      // }else{
      //   boxx.style.position = 'absolute'
      //   boxx.style.left = 1000+'px'
      // }
    }
    } ,
    created(){
    getTypeOner().then(res=>{
      this.typeList = res;
      console.log(this.typeList);
      console.log(this.$store.state.isLogin);
    });
    
  },
  watch:{
    $route(){
      this.input=''
    }
  },
  mounted(){
   window.addEventListener('scroll',this.handleScroll)
  }
  }
</script>

<style>
*{
  margin: 0;padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul{
  list-style: none;
}
a{
  text-decoration: none;
  cursor: pointer;
}

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bt{
    line-height: 100px;
  }
</style>


<style scoped>
.wid{
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #fff;
}
.chang{
  width: 100%;
  height: 210px;
}
  button{
    width: 100px;
    height: 40px;
  }

  hr{
    box-shadow: 0px 0px 1px black;
  }

  .topbox{
    width: 80%;
    height: 210px;
    margin: 0 auto;
  }
  .typelist{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
   }
   .typelist li{
    height: 50px;
    font-size: 20px;
    color: black;
    line-height: 50px;
    cursor: pointer;
   }

</style>
