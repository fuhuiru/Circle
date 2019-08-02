<template>
  <div>
    <div class="container login">
      <h2>用户登录</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" class="form-control" v-model="current.username">
          <span class="error" v-if="error.username">{{error.username}}</span>
        </div>
        <div class="form-group">
          <label>密 码</label>
          <input type="text" class="form-control" v-model="current.password">
          <span class="error" v-if="error.password">{{error.password}}</span>
        </div>
        <span v-if="error.notExist">{{error.notExist}}</span>
        <div class="form-group">
          <input type="submit" class="btn btn-block btn-primary" value="登录">
        </div>
      </form>
      <div class="proment row">
        <div class="admin col">
          <span>管理员</span>
          <span>用户名：admin1</span>
          <span>密码:111111</span>
        </div>
        <div class="user col">
          <span>普通用户</span>
          <span>用户名：ffffff</span>
          <span>密码:ffffff</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import session from "../lib/session";
export default {
  data() {
    return {
      current: {},
      error: {
        username: "",
        password: "",
        notExist:'',
      },
      session,
      admin:{
          username:'admin1',
          password:'111111',
      }
    };
  },
  methods: {
    isAdmin(){
        if(this.current.username != this.admin.username && this.current.password != this.current.password){
            return false;
        }else{
            return true;
        }
    },
    login() {
        if(this.isAdmin){
            
        }

      console.log("fvbeqvf");
      console.log(!this.validate());
      if (this.validate()) return;

      console.log("11111111");
      let username = this.current.username;
      let password = this.current.password;
      api("user/first", {
        where: { and: { username, password } },
        except: ["password"]
      }).then(r => {
        // console.log(r.data);
        if (!r.data){
            this.error.notExist = "用户名或密码不存在"
            return;
        };
        let id = r.data.username;
        let userdata = r.data;
        this.loginsuccess(id, userdata);
      });
    },
    loginsuccess(id, userdata) {
      session.login(id, userdata);
      // this.$router.push("/");
    },
    validate() {
      let current = this.current;
      let username = current.username;
      let password = current.password;
      let e = this.error;
      if (!username) {
        e.username = "用户名为空";
      } else {
        e.username = "";
      }

      if (!password) {
        e.password = "密码为空";
      } else {
        e.password = "";
      }

      return e.username && e.password;
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 60px;
}
.error {
  color: #b10;
  font-weight: 500;
}
.login {
  max-width: 900px;
  position: relative;
  top: 40px;
}
.proment {
  padding: 10px 20px;
}
.proment .user,
.proment .admin {
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}
.proment > * > * {
  display: block;
}
</style>
