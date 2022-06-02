<template>
    <div>
        <el-upload class="upload" drag action="#" multiple :http-request="httpRequest">
            <!-- :on-change="handleChange" :before-upload="beforeAvatarUpload" -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import { putRequest, postRequest } from '@/utils/api';
export default {
    name: "upload",
    props: ['id'],
    data() {
        return {
            imgUrl: "http://8.142.134.205:8888/group1/"
        }
    },
    mounted() {
        console.log(this.id);
        // let params = {
        //     username: "1335098123@qq.com",
        //     password: "wsywsywsy0408123"
        // }
        // postRequest("https://sm.ms/api/v2/token", params).then(res => {
        //     console.log("token", res)
        // })
    },
    methods: {
        handleChange(val) {
            console.log("upload", val);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        httpRequest(data) {
            console.log("data", data);
            var formdata = new FormData();
            formdata.append("file", data.file);
            //    
            postRequest("/system/hr/getImgUrl", formdata).then(
                res => {
                    console.log("11", res)
                    if (res.status == 200) { //上传成功
                        let url = this.imgUrl + res.obj;
                        this.updateHr(url);// 更新数据库
                    }

                }
            ).catch(
                err => console.log("err", err)
            );
            // this.$refs.upload.clearFiles(); //清空
        },
        updateHr(val) {
            let updateruleForm = {
                userface: val,
                id: this.id,
                enabled: true
            };
            putRequest("/system/hr/", updateruleForm).then((res) => {
                if (res.status == 200) { //修改成功
                    this.$emit('refreshList')
                }
            })
        }

    }

}
</script>

<style>
.upload {
    display: inline-block;
    margin-top: 20px;
    margin-left: 50px;
}
</style>