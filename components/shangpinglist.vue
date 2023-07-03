<template>
    <div>
        <ul class="shoplist">
            <li v-for="(item, i) in list" :key="i">
              <img :src="item.imageUrl" alt="" />
              <h3>{{ item.title }}</h3>
              <a>￥{{item.priceStr}}</a>
            </li>
          </ul>
    </div>
</template>

<script>
import {getGoodList} from '@/tools/ajax'
export default  {
    name:'TypeList',
    data(){
        return{
            list:[]
        }
    },
    created(){
        console.log(this.name);
        getGoodList({ type_one: `${this.$route.query.name}` }).then((r) => {
      this.list = r;
      console.log(this.list);
    });
    }
}
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