<template>
  <div class="main">
    <el-form :model="form" label-position="right" class="demo-form-inline">
      <el-form-item label="主题" :inline="true" required label-width="120px" >
        <el-input maxlength="40" show-word-limit v-model="form.subject" placeholder="主题" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="收件人邮箱" label-width="120px" required>
        <el-input maxlength="40" show-word-limit v-model="form.mail" placeholder="邮箱" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="内容" required label-width="120px">
      </el-form-item>
      <el-form-item  style="margin-left: 5%" >
        <my-editor :toolbar="toolbar" v-model="form.content"></my-editor>
      </el-form-item>
    </el-form>
    <div class="on_button">
      <el-button type="goon" @click="send">发送</el-button>
    </div>
  </div>
</template>

<script>
import {postRequest} from "@/utils/api";
import MyEditor from "@/components/editor/MyEditor";

export default {
  name: "SendMail",
  components:{
    myEditor:MyEditor
  },
  data(){
    return{
      toolbar:['fullscreen undo redo | cut copy paste | bullist  | table charmap hr pagebreak preview| styleselect | formatselect | emoticons ',
        'bold italic underline strikethrough blockquote  removeformat  | alignleft aligncenter alignright alignjustify outdent indent |forecolor backcolor  | fontselect | fontsizeselect  '],
      form:{
        subject:'',
        mail:'',
        content:''
      }
    }
  },
  methods:{
    send(){
      let url = "/statistics/personnel/editor/sendMail?subject="+this.form.subject+"&mail="+this.form.mail+"&content="+this.form.content;
      if(this.checkForm()){
        postRequest(url)
        this.$message.success("发送成功");
        this.$router.push({
           name:'Home'
         })
      }
    },
    checkForm(){
      let verify = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      let res = verify.test(this.form.mail)
      if(this.form.subject === ''){
        this.$message.error("请输入邮件主题")
        return false
      }else if(this.form.mail === ''){
        this.$message.error("请输入收件人邮箱")
        return false

      }else if(!res){
        this.$message.error("请输入正确的邮箱")
        return false
      }else if(this.form.content ===''){
        this.$message.error("请输入邮件内容")
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.main{
  width: 95%;
}
.on_button{
  width: 80px;
  margin: 0 auto;
}
.el-button--goon {
  color: #FFF;
  background-color: #20B2AA;
  border-color: #20B2AA;
}
.el-button--modify {
  color: #FFF;
  background-color: #206eb2;
  border-color: #20b2aa;
}
</style>