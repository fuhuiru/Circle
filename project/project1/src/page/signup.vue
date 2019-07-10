<template>
  <div>
    <div class="container">
      <h2>用户注册</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" class="form-control" v-model="current.username">
          <span v-if="error.username">{{error.username}}</span>
        </div>
        <div class="form-group">
          <label>密 码</label>
          <input type="text" class="form-control" v-model="current.password">
          <span v-if="error.password">{{error.password}}</span>
        </div>
        <div class="form-group">
          <label>重复密码</label>
          <input type="text" class="form-control" v-model="current.password2">
          <span v-if="error.password2">{{error.password2}}</span>
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-block btn-primary" value="注册">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
export default {
  data() {
    return {
      current: {},
      error: {
        username: "",
        password: "",
        password2:'',
      }
    };
  },
  methods: {
    signup() {
      if (!this.validate()) return;
      api("user/create", this.current).then(r => {
        if (!r.success) return;

        this.$router.push("/login");
      });
      this.validate(this.current);
      console.log(1321324);
    },
    validate() {
      let e = this.error;
      let current = this.current;
      let username = current.username;
      let password = current.password;
      let password2 = current.password2;

      if (
        !username ||
        !/[a-zA-Z0-9]{6,12}/.test(username)
      ) {
        e.username = "用户名有误，用户名长度应在6-12之间";
      } else {
        e.username = "";
      }
      if (!password || password.length < 6) {
        e.password = "密码有误，密码长度应大于6为";
      } else {
        e.password = "";
      }

      if(!password2 || password2 != password){
          e.password2 = '两次密码不一致';
      }else{
          e.password2 = null;
      }

      return !e.username && !e.password && !e.password2;
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 60px;
}
</style>
