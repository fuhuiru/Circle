<template>
<div class="row">
  <div class="Nav">
    <div class="container">
      <div class="row nav">
        <div class="col">
          <div class="logo">
            <router-link to="/">
              <img :src="logo">
            </router-link>
          </div>
        </div>
        <div class="col-8 text-right">
          <div class="search form-group">
            <input type="text" class="searchbox">
            <button class="btn btn-primary">搜索</button>
          </div>
        </div>
        <div class="col user">
          <span v-if="session.loggedIn().sessionid">
            <router-link to="/setting/me">用户：{{session.loggedIn().user.username}}</router-link>
            <a href="#" @click="logout()">退出</a>
          </span>
          <span v-else>
            <router-link to="/login">登录</router-link>
            <router-link to="/signup">注册</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import logo from "../assets/col.png";
import session from "../lib/session";
export default {
  data() {
    return {
      session,
      logo
      // userdata = [];
    };
  },
  methods: {
    logout() {
      console.log("dvdasv");
      this.session.logout();
    }
  },
  mounted() {
    console.log(this.session.loggedIn.user);
  }
};
</script>
<style scoped>
.Nav{
  /* border-top: 2px solid #ef6c00; */
  border-top: 2.5px solid #ef6c00;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 9999;
  left:0;
  right: 0;
}
.col-8{
  margin-left: 20px;
}
.searchbox {
  outline: none;
  border: 2.4px solid rgba(0, 0, 0, 0.36);
  width: 300px;
}

.text-right {
  text-align: right;
}
.nav {
  padding-top: 10px;
  padding-bottom: 10px;
}
.nav .search input,
.nav .search button {
  vertical-align: top;
  outline: none;
  height: 46px;
}
.nav .search button {
  width: 68px;
}
.nav .search input {
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 12px;
  border-radius: 10px;
}
.user {
  margin-top: 10px;
}
.user > * {
  font-size: 1.04em;
  vertical-align: middle;
}

.user span > * {
  color: #222;
  margin-right: 20px;
}

.nav .logo img {
  height: 56px;
  width: 160px;
}

span > *:hover {
  text-decoration-line: none;
}
</style>
