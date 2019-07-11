<template>
  <div>
    <div class="container">
      <h1>用户设置</h1>
      <div class="row">
        <div class="col-md-3">
          <div class="sidebar">
            <router-link to="/setting/me">用户设置</router-link>
            <router-link to="/setting/security">安全设置</router-link>
          </div>
        </div> 
        <!-- <div class="col-md-6"></div> -->
        <div class="col-me-9">
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 700px;
}
h1 {
  margin-top: 20px;
}
/* .sidebar{
    background: #e1f5f;
} */
.form-control > * {
  display: inline-block;
}
.content,
.sidebar {
  background: #e1f5fe;
  margin-top: 20px;
  min-height: 360px;
}
.content {
  margin-left: 80px;
  padding: 18px 20px;
  min-width: 400px;
}
.sidebar > * {
  text-align: center;
  display: block;
  font-size: 1.4em;
  color: #333;
  padding: 20px 5px;
}

.sidebar > *:hover {
  text-decoration-line: none;
}
</style>
