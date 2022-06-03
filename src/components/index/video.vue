<template>
  <div>
    <div id="video">
      <el-button style="margin-left: 20px" @click="uploadVideo"><span>上传视频</span></el-button>
      <el-button style="margin-left: 20px" @click="localVideo"><span>宣传视频</span></el-button>
      <div class="player-container">
        <vue-core-video-player
                style="margin-top: 20px"
                :key="key"
                :src="newsrc"

                :autoplay="false"
                :title= "title"
                :loop="true"/>
      </div>
    </div>
    <div>
      <el-dialog title="点击上传视频" :visible.sync="dialogVisible">
        <el-upload class="uploadvideo" drag action="#" :multiple="false" :before-upload="beforeUploadVideo"
                   :http-request="getVedio">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传mp4/ogg/flv/avi/rmvb文件，上传的视频不能超过30M</div>

        </el-upload>
        <el-progress
                v-show="progressFlag"
                :percentage="loadProgress">
        </el-progress>

      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "vedio",
  props: {},
  data() {
    return {
      key:0,
      dialogVisible: false,
      progressFlag: false,
      loadProgress: 0,
      newsrc:'http://8.142.134.205:8888/group1/M00/00/00/CI6GzWKYfpqAKslaADMRyDJGcdY401.mp4',

      title : "成信大宣传片"
    }
  },
  methods:{
    beforeUploadVideo(file){
      const min30M = file.size / 1024 / 1024 < 30;
      if ([
              "video/mp4",
              "video/ogg",
              "video/flv",
              "video/avi",
              "video/wmv",
              "video/rmvb",
      ].indexOf(file.type) === -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!min30M) {
        this.$message.error("上传视频大小不能超过30MB哦!");
        return false;
      }
      this.dialogVisible = false;
    },
    localVideo(){
      this.newsrc = 'http://8.142.134.205:8888/group1/M00/00/00/CI6GzWKYfpqAKslaADMRyDJGcdY401.mp4';
      this.key += 1;
    },
    getVedio(param){
      this.progressFlag = true;
      this.loadProgress = 0;
      const interval = setInterval(() => {
        if (this.loadProgress >= 99) {
          clearInterval(interval);
          return;
        }
        this.loadProgress += 1;
      }, 20);

      var formData = new FormData();
      formData.append("file",param.file);
      this.postRequest("/video/",formData).then(resp =>{
        this.newsrc = resp;
        this.key += 1;
        this.progressFlag = false;
        this.loadProgress = 100;
        this.$message({
            type: "success",
            message: "上传成功!",
        });
          // 清空上传列表
        // this.$refs.vedio.clearFiles();
      })

    },
    uploadVideo(){
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
  #video {
    margin: 20px auto;
    width: 100% ;

    overflow: hidden;
    border-radius: 10px;
    
    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      color: #f4f4f4;
      background-color: #2e3238;
      width: 200px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
  }
.my_video {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
.uploadvideo {
    display: inline-block;
    margin-top: 10px;
    margin-left: 175px;
  }
</style>