<template>
  <div>
    <div class="title">
      <h3>用户设置</h3>
      <button class="btn-primary" @click="edit = !edit">
        <span v-if="edit">取消</span>编辑
      </button>
    </div>
    <form @submit.prevent="submit">
      <fieldset :disabled="updatepedding">
        <div class="input">
          <label>昵称：</label>
          <span v-if="!me.name && !edit">---</span>
          <input type="text" v-model="me.name" :readonly="!edit">
        </div>
        <div class="input">
          <label>用户名：</label>
          <span v-if="!me.username && !edit">---</span>
          <input type="text" v-model="me.username" :readonly="!edit">
          <span v-if="error.usernameva">用户名格式有误，长度应在6-12位之间</span>
          <span v-if="error.username">用户名已存在！！！</span>
        </div>
        <div class="input">
          <label>个人介绍：</label>
          <span v-if="!me.info && !edit">---</span>
          <input type="text" v-model="me.info" :readonly="!edit">
        </div>
        <input type="submit" class="btn btn-primary btn-block" v-if="edit" value="提交">
      </fieldset>
    </form>
  </div>
</template>
<script>
import store from "../lib/store";
import api from "../lib/api";

export default {
  data() {
    return {
      me: {},
      meSaved: {},
      edit: false, //是否为编辑模式
      updatepedding: false,
      error: {
        username: false,
        usernameva: false
      }
    };
  },
  methods: {
    validateUsername() {
      return /[a-zA-Z0-9]{6,12}/.test(this.me.username);
    },
    submit() {
      this.updatepedding = true;
      console.log(this.me);
      // api("user/read").then(r=>{
      //   console.log(r.data);
      // })
      // console.log(this.validateUsername());
      if (!this.validateUsername()) {
        this.error.usernameva = true;
        this.updatepedding = false;
        return;
      }
      this.error.usernameva = false;

      api("user/exists", {
        where: { and: { username: this.me.username } }
      }).then(r => {
        let usernameChanged = this.me.username !== this.meSaved.username;
        if (r.data && usernameChanged) {
          this.error.username = true;
          this.updatepedding = false;
          return;
        }

        api("user/update", this.me).then(r => {
          if (r.success) {
            this.updatepedding = false;
            this.error.username = false;
            this.edit = false;
          }
        });
      });
      // api("user/update",this.me).then(r=>{
      //   this.edit = false;
      //   this.updatepedding = false;

      // })
    }
  },
  mounted() {
    api("user/find", { id: store.get("user").id }).then(r => {
      let data = r.data;
      this.me = data;
      this.meSaved = { ...data };

      // this.me.username ? this.use
    });
  }
};
</script>

<style scoped>
form span {
  margin-left: 14px;
}
.input {
  margin-top: 20px;
  margin-bottom: 20px;
}

[disabled] {
  opacity: 0.5;
}

label {
  width: 90px;
}

fieldset {
  margin: 0;
  padding: 0;
}

input {
  border-radius: 6px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 6px 10px;
  width: 260px;
}
input[type="submit"] {
  margin-top: 30px;
}

input[readonly] {
  border: 0;
  background-color: #e1f5fe;
}
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

.form-control[readonly] {
  background-color: #e1f5fe;
  border: 0;
  padding: 0;
}
</style>
