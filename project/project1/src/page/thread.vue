<template>
  <div>
    <div class="container">
      <div class="main">
        <div class="thread">
          <div class="activity">
            <div class="user"><span>帖子标题</span>{{currentThread.title}}</div>
            <hr>
            <div class="title"><span>帖子内容</span>{{currentThread.content}}</div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
export default {
  data() {
    return {
      currentThreadId: this.$route.params.id,
      currentThread: {}
    };
  },
  mounted() {
    api("thread/first", { 
        with:["belongs_to:user"],
        where: { 
            and: { id: this.currentThreadId } 
            } 
        
        }).then(
      r => {
        console.log(r.data);
        this.currentThread = r.data;
      }
    );
    console.log(this.$route.params);
  }
};
</script>
<style scoped>
.main {
  margin-top: 80px;
}
.thread {
  margin-top: 20px;
}
.container {
  max-width: 700px;
}
.activity {
  /* margin-bottom: 10px; */
  position: relative;
  top: 28px;
  background-color: #fff;
  border-radius: 3.5px;
  padding: 6px 8px;
}
</style>
