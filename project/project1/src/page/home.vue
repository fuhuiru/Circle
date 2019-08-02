<template>
  <div class="home">
    <div class="container">
      <div class="row main">
        <div class="col">
          <div class="push">
            <div class="form">
              <form @submit.prevent="threadCreate">
                <div class="submit">
                  <span>快来发布帖子吧</span>
                  <input type="submit" value="发布" class="btn-primary">
                </div>
                <div class="input">
                  <input type="text" placeholder="帖子标题" v-model="threadForm.title">
                </div>

                <div class="text">
                  <textarea placeholder="帖子内容" v-model="threadForm.content"></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="timeline">
            <div v-for="it in threadList" :key="it.id" class="activity">
              <div class="user">
                
                <div class="tool" v-if="user?(user.id == it.$user.id):'false'">
                  <button class="btn btn-primary" @click="threadForm = it">更新</button>
                  <button class="btn btn-primary" @click="threadDelete(it.id)">删除</button>
                </div>
              </div>
              
              <div class="title"><span>标题：</span><router-link :to="'/thread/'+it.id">{{it.title}}</router-link></div>
              <div class="content"><span>内容：</span>{{it.content}}</div>
              <div class="others">
                <span>发帖时间：{{it.created_at}}</span>
                <strong><span>用户：</span>{{it.$user?(it.$user.name || it.$user.username):"已注销"}}</strong>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import formatter from "../lib/dateFomatter";
import store from "../lib/store";
export default {
  data() {
    return {
      threadForm: {},
      error: {},
      threadList: [],
      store,
      user: store.get("user")
    };
  },
  filters:{
    cu(value){
      return value+ "111111111";
    }
  },
  mounted() {
    this.threadRead();
    console.log(this.user.id);
    // api("thread/delete",{id:7});
  },
  methods: {
    threadDelete(paid) {
      api("thread/delete", { id: paid }).then(r => {
        if (r.success) 
        this.threadRead();
      });
    },
  
    threadRead() {
      api("thread/read", { 
        with: ["belongs_to:user"],
        where:{and:{
          parent_id:null
        }}
        }).then(r => {
        // console.log(r.data[5].$user.id);
        this.threadList = r.data;
      });
    },
    threadCreate() {
      let form = this.threadForm;
      if (!form.title) {
        this.error.title = true;
        return;
      }
      form.user_id = store.get("user").id;
      console.log(form.user_id);
      form.cat_id = 1;
      form.created_at = formatter.format(new Date());
      // let url = "thread/create";
      let url = "create";
      if (form.id) {
        url = "update";
      }
      api(`thread/${url}`, form).then(r => {
        console.log(r.data);
        if (!r.success) {
          return;
        }
        this.threadForm = {};
        this.threadRead();
      });
    }
  }
};
</script>

<style scoped>
.user > * {
  display: inline-block;
}
.user {
  position: relative;
}
.user strong {
  margin-top: 3px;
}
.tool {
  position: absolute;
  right: 0px;
}
.tool button {
  margin: 0 3px;
}
.timeline {
  /* padding: 6px 8px; */
  background-color: transparent;
}
.timeline .activity {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 3.5px;
}
.timeline .user {
  padding: 6px 0;
}
.timeline .activity > * {
  margin: 6px 12px;
}
hr {
  margin-top: 0px;
}
.form .submit {
  margin-bottom: 17px;
}

.form .submit input {
  display: inline-block;
  margin-left: 440px;
  border-radius: 5px;
  padding: 3px 15px;
}
form .submit span {
  font-size: 20px;
  color: #3949ab;
  font-weight: 550;
}
.form {
  margin-top: 9px;
}
form .input input {
  width: 100%;
  border: none;
  outline: none;
  font-style: 18px;
}
.others strong{
  display: inline-block;
  margin-left: 20px;
}

.form form .input {
  padding: 4px;
  margin-bottom: 16px;
}

.form form .text,
.form form .input {
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 7px;
  border-radius: 2px;
}
.form form textarea {
  width: 100%;
  resize: none;
  height: 76px;
  vertical-align: middle;
  outline: none;
  border: none;
  font-size: 16px;
}
.timeline {
  border-radius: 3px;
}

.push {
  background-color: #fff;
  border-radius: 3px;
}
.push {
  margin-bottom: 20px;
  padding: 12px;
}
.container {
  max-width: 700px;
}
.ho {
  margin-top: 34px;
  background: #e1f5fe;
  max-width: 100%;
}
.col {
  /* height: 800px; */
  /* background-color: #fff; */
  margin-top: 105px;
  background-color: transparent;
}
.col-7 {
  background-color: transparent;
}

.home {
  /* background-image: url("../assets/home.jpg"); */
  /* background-color: #3949ab; */
  /* background-size: 100%; */
  margin-top: 0;
  /* height: 100%; */
  /* background-repeat: repeat-y; */
  background-attachment: fixed;
  background-image: url("../assets/home.jpg");
  /* background-repeat:repeat-y; */
}
.main {
  opacity: 1;
}
</style>
