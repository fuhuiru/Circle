<template>
  <div>
    <div class="container">
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
        <div class="form-group">
          <input type="submit" class="btn btn-block btn-primary" value="登录">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from '../lib/api'
export default {
    data(){
        return{
            current:{},
            error:{
                username:'',
                password:'',
            }
        }
    },
    methods: {
        login(){
            console.log("fvbeqvf");
            console.log(!this.validate());
           if(this.validate())
               return;

            console.log("11111111");
            let username = this.current.username;
            let password = this.current.password;
            api("user/first",{where:{and:{username,password}},except:["password"]}).then(r=>{
                // console.log(r.data);
                if(!r.data)
                return;
                

            })
        },
        validate(){
            let current = this.current;
            let username = current.username;
            let password = current.password;
            let e = this.error;
            if(!username){
                e.username = "用户名为空";
            }else{
                e.username = '';
            }

            if(!password){
                e.password = "密码为空";
            }else{
                e.password = '';
            }

            return e.username && e.password;
        },
        
    },
}
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
</style>
