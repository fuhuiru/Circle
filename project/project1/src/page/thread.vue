<template>
  <div>
    <div class="container">
      <div class="main">
        <div class="thread">
          <div class="activity">
            <div class="user">
              <span>楼主：</span>
              {{currentThread.$user?currentThread.$user.username||currentThread.$user.name:"已注销"}}
            </div>

            <div class="title">
              <span>帖子标题：</span>
              {{currentThread.title}}
            </div>
            <div class="content">
              <span>帖子内容：</span>
              {{currentThread.content}}
            </div>
            <hr>
            <div class="reply row">
              <div class="col-6">
                <button class="share">转发</button>
              </div>
              <div class="col-6">
                <button class="comment" @click="isComment = !isComment">跟帖</button>
              </div>
            </div>
          </div>
          <div class="commentForm" v-if="isComment">
            <div class="commentContent">
              <form @submit.prevent="submitReplyThread">
                <div>
                  <textarea v-model="replyThread.content"></textarea>
                </div>
                <div>
                  <input type="submit" value="发送" class="btn btn-primary">
                </div>
              </form>
            </div>
          </div>
          <div class="allReplyComment">
            <div class="replyComment" v-for="it in replyList" :key="it.id">
                <div class="replyUsername">用户：{{it.$user.username}}</div>
               <div class="replyContent">跟帖：{{it.content}}</div>
               <div class="replyContent">发布于：{{it.created_at}}</div>
            <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import dateFomatter from "../lib/dateFomatter"
import store from "../lib/store"

export default {
  data() {
    return {
      currentThreadId: this.$route.params.id,
      currentThread: {},
      replyThread: {},
      replyList:[],
      isComment:false,
    };
  },
  methods: {
    submitReplyThread(){
      this.replyThread.created_at = dateFomatter.format(new Date);
      // console.log(this.replyThread.created_at)
      this.replyThread.cat_id = 1;
      this.replyThread.parent_id = this.currentThreadId;
      this.replyThread.user_id = store.get("user").id;
    
      api("thread/create",this.replyThread).then(r=>{
        if(r.success){
          this.replyThread = {};
          this.loadAllReplyComment();
        }
      })
    },
    loadMainUser(){
      api("thread/first", {
      with: ["belongs_to:user"],
      where: {
        and: { id: this.currentThreadId }
      }
    }).then(r => {
      console.log(r.data);
      this.currentThread = r.data;
    });
    console.log(this.$route.params);
    },
    loadAllReplyComment(){
      api("thread/read",{
        with:["belongs_to:user"],
        where:{and:{parent_id:this.currentThreadId}}}).then(r=>{
        if(r.success){
          this.replyList = r.data;
        }
      })
    }
  },
  mounted() {
    this.loadMainUser();
    this.loadAllReplyComment();
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
  /* padding: 6px 8px; */
}
/* .reply button{
  background: #fff;
  outline: none;
  border: none;
  display: inline-block;
  margin-left: 590px;
  padding: 6px 10px
}
.reply button:hover{
  background: rgba(0,0,0,0.1);
} */
.activity hr {
  margin-bottom: 0px;
}
.activity .reply button {
  display: inline-block;
  padding: 7px 50px;
  width: 100%;
}
.reply .col-2 span {
  text-align: center;
  height: 30px;
}
/* .reply .col{
  background: #fff;
  /* border: none; */
/* }  */

.activity .row {
  margin-left: 0;
  margin-right: 0;
}
.reply .col-6 {
  padding-left: 0;
  padding-right: 0;
}
.reply .col-6 button {
  border: none;
  background: transparent;
  outline: none;
}
.reply .col-6 button:hover {
  background: rgba(0, 0, 0, 0.058);
}

.reply .col-6 .share {
  border-right: solid 0.7px rgba(0, 0, 0, 0.15);
}

.reply .col-6 .comment {
  border-left: solid 0.7px rgba(0, 0, 0, 0.15);
}
.commentForm {
  position: relative;
  top: 40px;
  background: #fff;
  padding: 14px 16px;
  border-radius: 3px;
}
/* .commentForm .commentContent{
  border: 1.3px solid rgba(0,0,0,0.2);
  border-radius: 3px;
  padding: 4px 4px;
} */
.commentForm .commentContent form textarea {
  border: 1.3px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 4px 4px;
  width: 100%;
  outline: none;
  resize: none;
}
form input {
  display: inline-block;
  margin-left: 580px;
  /* text-align: right; */
}
.allReplyComment .replyComment{
  position: relative;
  top: 68px;
  background: #fff;
  border-radius: 3px;
  padding: 14px 16px;
}
.allReplyComment hr{
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  margin: 0;

}
.allReplyComment .replyComment .replyUsername{
  font-weight: 600;
  margin-bottom: 10px;

}
.allReplyComment .replyComment .replyContent{
  margin-bottom: 10px;
}



</style>
