<template>
  <div class="about">
    <div v-show="haveShop">
      <h1>这是购物车</h1> <button @click="ggg">随便逛逛</button>
    </div>
    <div v-show="!haveShop">
         <ul class="list">
      
          <li v-for="item,i in list" :key="i">
            <input type="checkbox"  v-model="item.ischeck" :value="item.Id" @click="changeOne(i)">
            <img :src="item.imageUrl" alt=""/>
            <a>{{item.title}}</a>
           
            <div>
              <p>￥{{item.priceStr}}</p>
              <i class="el-icon-delete" @click="delShop(item.Id)"></i>
              <!-- <el-input-number v-model="item.count" @change="handleChange(item)"
               :min="1" :max="10000" label="描述文字"></el-input-number> -->
               <button @click="removeShop(item)" class="btn"><i class="el-icon-remove"></i></button>
               <input type="text" v-model="item.count" class="numin" disabled>
               <button @click="addShop(item)" class="btn"><i class="el-icon-circle-plus"></i></button>
            </div>
           
          </li>
         </ul>
    </div>
    
    <div class="botbox">
      <div class="ban">
      <input type="checkbox" v-model="allcheck" @click="changeAll">全选false
    </div>
      总价 :{{ monery }}
    </div>
  </div>
</template>


<script>
import {getShopList,getAdd,getDel,getRemove} from '@/tools/ajax'

 export default {
      data(){
        return{
          haveShop:false,
          list:[],
          count: 0,
          token:localStorage.getItem('token'),
          price:0,
          section:[],
          allcheck: false,
            monery: 0
        }
      },
      computed:{
        // total(){
        //     let sum= 0;
            
        //    this.section.forEach(id => {
        //     var goods = this.list.find(goods =>{
        //       return goods.Id ==id
        //     })
        //     if(goods){
        //       sum += goods.priceStr * goods.count
        //     }
        //     })
            
        //     return sum
        // }
      },
      methods:{
        // 计数器
        addShop(a){
          a.count++
          getAdd({
            token:this.token,
            goodId:a.Id
           }).then(r=>{
            console.log(r);
            this.total()
           })

      },
      removeShop(a){
        
        if(a.count == 1){
          alert('不能再继续减少了')
        }else{
          a.count--
          getRemove({
            token:this.token,
            goodId:a.Id
           }).then(r=>{
            console.log(r);
            this.total()
           })
        }
         
          //  this.money(a)
      },

      // 删除商品
      delShop(a){
             console.log(a);
             getDel({
            token:this.token,
            goodId:a
           }).then(r=>{
            console.log(r);
            getShopList({token:localStorage.getItem('token')}).then(r=>{this.list= r})
           })
      },

      // 删除提示框

      // 计算总价
      // money(aa){
      //   console.log(aa);
        
      //   console.log(event.target);
      //   if(event.target.checked){
      //     this.price += aa.count * aa.priceStr
      //   }else{
      //     this.price -= aa.count * aa.priceStr
      //   }
      // },
      ggg(){
        this.$router.push('/')
      },

      
        all() {
            let _index = this.list.findIndex(item => {
                return !item.ischeck
            })
            if (_index == -1) {
                this.allcheck = true
            } else {
                this.allcheck = false
            }
        },
        //点击购物车数据中单选框改变ischeck事件
        changeOne(index) {
            this.list[index].ischeck = !this.list[index].ischeck
            //调用判断
            this.all()
            this.total()

        },

        changeAll() {
            //取反
            this.allcheck = !this.allcheck
            // 遍历数组list
            this.list.forEach(item => {
                item.ischeck = this.allcheck
            })
            this.total()
        },
        total() {
            let sum = 0;
            this.list.forEach(item => {
                console.log(item);
                if (item.ischeck) {
                    sum += item.priceStr * item.count;
                }
                this.monery = sum
                
            })

        }

      },
      created(){
        
        getShopList({
          token:localStorage.getItem('token')
        }).then(r=>{
          console.log(r);
          if(r.length == 0){
            console.log(r.length);
            this.haveShop = true
          }else{
              this.list= r
          }
          
        })
      }
 }
</script>


<style scoped>

.list{
  width: 60%;
  margin: 0 auto;
}
.list li{
  width: 100%;
  height: 140px;
  font-size: 22px;
  margin: 30px 0;
  border: 1px solid #d3d3d3;;
}
.list li img{
  height: 140px;
  float: left;
  margin-left: 50px;
}
.list li a{
  display: inline-block;
  line-height: 140px;
}
.list li div{
  display: inline-block;
  width: 200px;
  height: 100%;
  vertical-align: top;
  float: right;
}
.list li div{
  height: 50%;
}
.list li p{
  width: 150px;
  display: inline-block;
  color: red;
  height: 70px;
  line-height: 70px;
}
.list li i{
  cursor: pointer;
}

.btn{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-icon-remove,
.el-icon-circle-plus{
  transform: scale(2.6);
}
.numin{
  width: 50px;
  height: 50px;
  font-size: 26px;
  text-align: center;
  margin: 0 20px;
}

.botbox{
  width: 100%;
  height: 100px;
  background-color: #F5F5DC;
  position: fixed;
  bottom: 0;
  line-height: 100px;
}

.ban{
  position: absolute;
  left: 200px;
}
</style>