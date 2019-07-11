<template>
  <div>
    <div class="title">
      <h3>用户安全设置</h3>
      <button class="btn-primary" @click="click()"><span v-if="edit">取消</span>编辑</button>
    </div>
    <form v-if="edit" @submit="changePassword">
      <div class="input">
        <label>旧密码:</label>
        <input type="text" v-model="currentPassword.old">
        <span v-if="errorPassword.old">!旧密码错误</span>
      </div>
      <div class="input">
        <label>新密码:</label>
        <input type="text" v-model="currentPassword.new">
        <span v-if="errorPassword.new">!新密码格式错误</span>
      </div>
      <div class="input">
        <label>重复密码:</label>
        <input type="text" v-model="currentPassword.new2">
        <span v-if="errorPassword.new2">!重复密码不一致</span>
      </div>
      <input type="submit" class="btn btn-block btn-primary">
    </form>
    <h3 v-if="changePasswordSucceed" class="change">修改密码成功!!!</h3>
  </div>
</template>
<script>
import store from "../lib/store"
import api from "../lib/api"
export default {
  data(){
    return{
      edit:false,
      currentPassword:{},
      errorPassword:{
        old:false,
        new:false,
        new2:false,
      },
      changePasswordSucceed:false,
    }
  },
  methods: {
    click(){
      this.edit = !this.edit;
       this.changePasswordSucceed = false;
    },
    changePassword(){
      let user = store.get("user");
      let password = this.currentPassword;
      let error = this.errorPassword;
      api("user/find",{id:user.id,only:["password"]}).then(r=>{
        console.log(r);
        if(password.old != r.data.password){
          error.old = true;
          return;
        }
        error.old = false;
        if(this.validateNewPassword()){
          error.new = true;
          return;
        }
        error.new = false;
        if(password.new != password.new2){
          error.new2 = true;
          return;
        }
        error.new2 = false;
        api("user/update",{id:user.id,password:password.new}).then(r=>{
          console.log(r);
          console.log("修改");
          this.edit = false;
          this.changePasswordSucceed = true;
        })
        
      })
    },
    validateNewPassword(){
      return this.currentPassword.new.length < 6;
    }
  },
};
</script>
<style scoped>
.title > * {
  display: inline;
  vertical-align: top;
}
.title button {
  margin-left: 30px;
  padding: 4px 10px;
  border-radius: 8px;
}
.title {
  margin-bottom: 20px;
}
.input{
  margin-top: 20px;
}
.change{
  color: #0277bd 
}
h3{
  vertical-align: center;
  text-align: center;
  padding: 80px 20px;
}
form{
  margin-top: 40px;
}
input[type="submit"]{
  margin-top: 20px;
}
.input label{
  min-width: 90px;
}
.input input{
  border-radius: 6px;
  outline: none;
  border: 1px solid rgba(0,0,0,0.3);
  padding: 6px 10px;
  width: 260px;
}
.input span{
  display: inline-block;
  margin-left: 20px;
  color: #b10;
}
</style>
