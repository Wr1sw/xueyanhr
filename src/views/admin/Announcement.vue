<template>
  <div class="main">
    <el-form :model="form" :disabled="readOnly" label-position="right" class="demo-form-inline">
      <el-form-item label="文章标题" :inline="true" required label-width="120px" >
        <el-input maxlength="20" show-word-limit v-model="form.title" placeholder="标题" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="是否紧急" label-width="120px">
        <el-select v-model="form.isUrge" placeholder="请选择">
          <el-option
              v-for="item in urgeList"
              :key="item.key"
              :label="item.value"
              :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" required label-width="120px">
      </el-form-item>
      <el-form-item :disabled="readOnly" style="margin-left: 5%">
        <my-editor v-model="form.content"></my-editor>
      </el-form-item>
      <el-form-item label="发布人" v-show="readOnly" label-width="120px">
        <el-input v-model="form.reporter"  placeholder="标题" style="width: 320px"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" v-show="readOnly" label-width="120px">
        <el-input v-model="form.time"  placeholder="标题" style="width: 320px"></el-input>
      </el-form-item>
    </el-form>
    <div class="on_button">
      <el-button type="goon" :disabled="readOnly" @click="onSubmit">提交</el-button>
      <el-button :disabled="!readOnly" type="modify" @click="onModify">修改</el-button>
      <el-button :disabled="!readOnly" type="danger" @click="onDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import {postRequest} from "@/utils/api";
import MyEditor from "@/components/editor/MyEditor";

export default {
  name: "Announcement",
  components:{
    myEditor: MyEditor,
  },
  data(){
    return{
      readOnly: false,
      toolbar:'',
      urgeList:[
        {key:0, value:'常规'},
        {key:1, value:'紧急'},
      ],
      form: {
        content: '<h1 style="text-align: center">发布您的公告</h1>',
        title: '',
        isUrge: 0,
        reporter:'',
        time:'',
        id:0,
      }
    }
  },

  created() {
    let id =  this.$route.params.id ;
    if(id === -1){
      this.readOnly = false;
    }else{
      this.readOnly = true;
      this.id = id;
    }
  },
  mounted() {
    if(this.readOnly){
      this.getAnnouncement(this.id);
    }
  },
  methods:{
    onSubmit(){
      if(this.checkForm()){
        this.submitData();
      }
    },
    checkForm(){
      if(this.form.title === ''){
        this.$message.error("请输入标题");
        return false
      }else if(this.form.content === ''){
        this.$message.error("请输入公告内容");
        return false
      }
      return true
    },
    getAnnouncement(id){
      let url = "/statistics/record/selectByPrimaryKey?id="+id
      postRequest(url).then(res=>{
        this.form = res.obj;
      })
    },
    onModify(){
      this.readOnly = false;
    },
    submitData(){
      let session = JSON.parse(window.sessionStorage.getItem('user'))
      this.form.reporter = session.name
      if(this.form.id === 0){
        postRequest("/statistics/record/insert", this.form).then(res=>{
          if(res){
            this.showMessage("插入成功",true );
            this.$router.push({
              name:'Home'
            })
          }

        })
      }else{
        postRequest("/statistics/record/update", this.form).then(res=>{
          if(res){
            this.showMessage("更新成功",true );
            this.$router.push({
              name:'Home'
            })
          }
        })
      }
    },
    onDelete(){
      let url = "/statistics/record/delete?id="+this.form.id;
      postRequest(url).then(res=>{
        if(res.obj === 1){
          this.showMessage("删除成功", true);
          this.$router.push({
            name:'Home'
          })
        }else{
          this.showMessage("删除失败", false)
        }
      })
    },
    showMessage(message, flag){
      if(flag){
        this.$message({
          message: message,
          type: 'success'
        });
      }else{
        this.$message({
          message: message,
          type: 'error'
        });
      }
    },
  }
}
</script>

<style scoped>
.main{
  width: 95%;
}
.on_button{
  width: 240px;
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
