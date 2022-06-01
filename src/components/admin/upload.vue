<template>
    <div>
        <el-upload class="upload" drag action="#" multiple :on-change="handleChange" :before-upload="beforeAvatarUpload"
            :http-request="httpRequest">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/api';
export default {
    name: "upload",
    data() {
        return {

        }
    },
    mounted() {
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
            formdata.append("smfile", data.file);
            var headers = { 'Authorization': 'cMZkqPKLXfroLwwGBqpYtunwkKm6BvUp' }

            postRequest("userface", formdata, headers).then(
                res => console.log("11", res.data)
            ).catch(
                err => console.log("err", err)
            );
            // this.$refs.upload.clearFiles(); //清空
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