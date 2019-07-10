<template>
  <div>
    <div class="container">
      <div class="row nav">
        <div class="col">
          <div class="logo">
            <img src="https://dummyimage.com/56x50/000/fff">
          </div>
        </div>
        <div class="col-8 text-right">
          <div class="search">
            <input type="text">
            <button>搜索</button>
          </div>
        </div>
        <div class="col user">
          <span>
            <router-link to="/login">登录</router-link>
            <router-link to="/signup">注册</router-link>
          </span>
           <span>
            <router-link to="/login">用户名</router-link>
            <router-link to="/signup">退出</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-right {
  text-align: right;
}
.nav{
  padding-top: 10px;
  padding-bottom: 10px;
}
.nav .search input,
.nav .search button
{
  vertical-align: top;
  outline: none;
  height: 46px;
}
.nav .search input{
  padding-left: 10px;
  padding-right: 10px;
}
.user{
  margin-top: 10px;
}
.user > *{
  font-size: 1.1em;
  vertical-align: middle;
}

.user span > *{
  color: #222;
  margin-left: 8px;
}
</style>
