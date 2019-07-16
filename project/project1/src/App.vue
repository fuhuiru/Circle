<template>
  <div id="app">
    <Nav></Nav>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
  
</template>

<script>
import Nav from "./components/Nav";
import Footer from './components/Footer'

export default {
  name: "app",
  components: {
    Nav,
    Footer,
  }
};
</script>
<style scoped>
.app{
  background-color: bisque;
}
.main{
  background-attachment: fixed;
  height: 625px;
 background-image: url("assets/home.jpg");
}
Footer{
  margin-bottom: 0px;
}
</style>

