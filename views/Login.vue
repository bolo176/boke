<template>
  <div class="login">
    <h1>登录页</h1>

    <form class="fm">
      <label for="">用户名：</label>
      <input type="text" placeholder="请输入用户名" v-model="user" />
      <br />
      <label for="">密&nbsp;&nbsp; 码：</label>
      <input type="password" placeholder="请输入用户名" v-model="pwd" />
      <br />
      <el-button type="text" @click="open">登录</el-button>
    </form>
  </div>
</template>


<script>
import { getLogin } from "@/tools/ajax";
export default {
  data() {
    return {
      user: "",
      pwd: "",
    };
  },
  methods: {
    open() {
      getLogin({
        userName: this.user,
        password: this.pwd,
      }).then((r) => {
        console.log(r);
        if (r.code == 1) {
          this.$alert("恭喜您", "登陆成功", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
         console.log(r);

         localStorage.setItem('token',r.token)
        //  this.$store.state.isLogin = true
        this.$store.commit('setLogin',this.$store.state.isLogin,true)
        console.log(this.$store.state.isLogin);
          this.$router.push('/')

        }else{
            this.$alert("用户名或密码错误", "登陆失败", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
        }
      });

      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${ action }`
      //     });
      //   }
      // });
    },
  },
};
</script>


<style scoped>
.login {
  width: 80%;
  margin: 0 auto;
}
.fm {
  width: 440px;
  margin: 0 auto;
  text-align: left;
}
.fm input {
  height: 40px;
  width: 330px;
  margin-top: 30px;
}
.fm label {
  font-size: 20px;
}
.el-button {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
  border: 1px solid aqua;
  margin-top: 30px;
}
</style>