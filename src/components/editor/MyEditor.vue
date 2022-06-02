<template>
  <div>
    <Editor v-model="contentValue" :init="init" :disabled="disabled" @onClick="onClick" />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'

// 引入富文本编辑器主题的js和css
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver/theme.min.js'

import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/anchor'  //锚点
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/autoresize'  //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave'  //自动存稿
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/code'  //编辑源码
import 'tinymce/plugins/codesample'  //代码示例
import 'tinymce/plugins/directionality'  //文字方向
import 'tinymce/plugins/emoticons'  //表情
import 'tinymce/plugins/fullpage'  //文档属性
import 'tinymce/plugins/fullscreen'  //全屏
import 'tinymce/plugins/help'  //帮助
import 'tinymce/plugins/hr'  //水平分割线
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/importcss'  //引入css
import 'tinymce/plugins/insertdatetime'  //插入日期时间
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/paste' //粘贴插件
import 'tinymce/plugins/preview'//预览
import 'tinymce/plugins/print'//打印
import 'tinymce/plugins/quickbars'  //快速工具栏
import 'tinymce/plugins/save'  //保存
import 'tinymce/plugins/searchreplace'  //查找替换
import 'tinymce/plugins/tabfocus'  //切入切出，按tab键切出编辑器，切入页面其他输入框中
import 'tinymce/plugins/table'  //表格
import 'tinymce/plugins/template'  //内容模板
import 'tinymce/plugins/textcolor'  //文字颜色
import 'tinymce/plugins/textpattern'  //快速排版
import 'tinymce/plugins/toc'  //目录生成器
import 'tinymce/plugins/visualblocks'  //显示元素范围
import 'tinymce/plugins/visualchars'  //显示不可见字符
import 'tinymce/plugins/wordcount'  //字数统计
import {postRequest} from "@/utils/api";

export default {
  name: 'MyEditor',
  components: {
    Editor
  },
  props: {
    value: {
      type: [String, Object],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons '
    },
    toolbar: {
      type: [String, Array],
      default: function (){
        return ['fullscreen undo redo | cut copy paste | bullist numlist | table image media charmap hr pagebreak preview | code selectall  visualblocks ',
          '|forecolor backcolor bold italic underline strikethrough link | blockquote  removeformat | alignleft aligncenter alignright alignjustify outdent indent |styleselect formatselect fontselect fontsizeselect | emoticons',
        ]
      }

    },
    quickbars_selection_toolbar:{
      type: [String, Object],
      default: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",

    }
  },
  data(){
    return {
      init: {
        language_url: '/tinymce/langs/zh-Hans.js',  //引入语言包文件
        language: 'zh-Hans',  //语言类型

        // skin_url: '/tinymce/skins/ui/oxide',  //皮肤：浅色
        skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色

        plugins: this.plugins,  //插件配置
        toolbar: this.toolbar,  //工具栏配置，设为false则隐藏
        menubar: false,  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px',  //字体大小
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',  //字体样式
        lineheight_formats: "0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5",  //行高配置，也可配置成"12px 14px 16px 20px"这种形式

        height: 500,  //注：引入autoresize插件时，此属性失效
        placeholder: '在这里输入文字',
        branding: false,  //tiny技术支持信息是否显示
        resize: false,  //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
        // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
        elementpath: false,  //元素路径是否显示

        content_style: "img {max-width:100%;}",  //直接自定义可编辑区域的css样式
        // content_css: '/tinycontent.css',  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

        paste_data_images: true,  //图片是否可粘贴
        images_upload_handler:async (blobInfo, success, failure) =>{
          let formData = new FormData();
          formData.append('formData', blobInfo.blob());
          let url = "/statistics/personnel/editor/uploadImage"
          let resUrl = "";
          await postRequest(url, formData).then(res=>{
            resUrl = res.obj.location
          })
          console.log(resUrl)
          success(resUrl)
          // return this.handleUploadImage(blobInfo, success, failure);
        },
        file_picker_callback: (callback, value, meta) => {
          this.handleUploadFile(callback, value, meta)
        },
        video_template_callback: data=>{
          return `<video width="745px" height="420px" controls="controls" src=${data.source} />`
        }
      },
      contentValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.contentValue = newValue
    },
    contentValue (newValue) {
      this.$emit('input', newValue)
    },
  },
  created(){

  },
  mounted(){
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    onClick(e){
      this.$emit('onClick', e, tinymce)
    },
    //清空内容
    clear(){
      this.contentValue = ''
    },
    async handleUploadImage(blobInfo, success, failure){
      let formData = new FormData();
      formData.append('formData', blobInfo.blob());
      let url = "/statistics/personnel/editor/uploadImage"
      await postRequest(url, formData).then(res=>{
        console.log(res.obj.location)
        success(res.obj.location)
      })
    },

    handleUploadFile(callback, value, meta){
      let filetype='.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
      let baseUrl ='/statistics/personnel/editor';
      let url = "";
      //为不同插件指定文件类型及后端地址
      switch(meta.filetype){
        case 'image':
          filetype='.jpg, .jpeg, .png, .gif';
          url = baseUrl + '/uploadImage';
          break;
        case 'media':
          filetype='.mp3, .mp4';
          url = baseUrl + '/uploadMedia';
          break;
        case 'file':
        default:
          url = baseUrl + '/uploadFile'
      }
      console.log(url);
      if(meta.filetype === 'media'){
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        const that = this
        input.onchange = async function(){
          const file = this.files[0];
          const isValid = await that.validateVideo(file)
          if(isValid){
            const resUrl = await that.uploadMedia(file, url);
            console.log(resUrl)
            callback(resUrl);
          }else{
            callback();
          }
        }
        input.click();
      }
    },

    async validateVideo (file){
      const isMP4 = file.type === 'video/mp4';
      const isLt10M = file.size / 1024 / 1024 < 10;
      console.log(file.size / 1024 / 1024 < 10)
      if (!isMP4){
        this.$message.error('上传视频必须为MP4格式! ');
        return false;
      }
      if (!isLt10M){
        this.$message.error('上传视频大小限制10M以内!');
        return false;
      }
      const duration = await this.getVideoDuration(file);
      if (duration > 60){
        this.$message.error('上传视频时长不能超过60秒! ');
        return false;
      }
      return true;

    },

    getVideoDuration(file){
      return new Promise(resolve => {
        const videoElement = document.createElement( 'video');
        videoElement.src = URL.createObjectURL(file)
        videoElement.addEventListener('loadedmetadata', ()=>{
          resolve(videoElement.duration)
        })
      })
    },

    async uploadMedia(file, url){
      const formData = new FormData()
      formData.append('formData', file);
      let resUrl = ""
      await postRequest(url, formData).then(res=>{
        console.log(res);
        resUrl = res.obj.location;
      })
      return resUrl;
    }
  },
}
</script>

<style scoped>

</style>