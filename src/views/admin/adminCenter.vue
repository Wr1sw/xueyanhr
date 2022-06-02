<template>
    <div class="edit">
        <el-row type="flex" class="row-bg">
            <el-col :span="5" class="left">
                <!-- <div class="left"> -->
                <el-card class="box-card">
                    <div class="user-headpic-update" :style="{ backgroundImage: 'url(' + ruleForm.userface + ')' }"
                        @mouseleave="hoverImg" @mouseenter="hoverImg">
                        <span class="update" v-show="hover" @click="updateImg">
                            <i class="el-icon-edit-outline"></i>
                            <span>重新上传</span>
                        </span>
                    </div>
                    <div class="staticInfo">
                        <ul>
                            <li>
                                <i class="el-icon-user icon"></i>
                                <span>{{ ruleForm.name }}</span>
                            </li>
                            <li>
                                <i class="el-icon-office-building icon"></i>
                                <span>{{ ruleForm.address }}</span>
                            </li>
                        </ul>

                    </div>
                </el-card>
                <!-- </div> -->
            </el-col>

            <el-col :span="12">
                <div class="right">

                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="ruleForm.phone" prefix-icon="el-icon-phone-outline"></el-input>
                        </el-form-item>
                        <el-form-item label="座机" prop="telephone">
                            <el-input v-model="ruleForm.telephone" prefix-icon="el-icon-s-platform"></el-input>
                        </el-form-item>
                        <!-- <div v-show="!editPassword" class="tipPassword">
                            <el-form-item label="修改登录密码">
                                <el-button type="primary" icon="el-icon-edit" circle @click="editPasswordFunc"
                                    size="mini">
                                </el-button>
                            </el-form-item>
                        </div>
                        <div v-if="editPassword">
                            <el-form-item prop="password" label="新密码">
                                <el-input prefix-icon="el-icon-s-goods" v-model="ruleForm.password" show-password
                                    placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPassword">
                                <el-input prefix-icon="el-icon-s-goods" v-model="ruleForm.checkPassword" show-password
                                    placeholder="请再次输入"></el-input>
                            </el-form-item>

                        </div> -->


                        <el-form-item>
                            <el-button type="primary" @click="cancel('ruleForm')" class="cancel">取消</el-button>

                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>


                        </el-form-item>
                    </el-form>

                </div>
            </el-col>
        </el-row>

        <el-drawer title="点击上传头像" :visible.sync="drawer">

            <myUpload @refreshList="refreshList" :id="id"></myUpload>
        </el-drawer>

    </div>

</template>


<script>
import upload from "../../components/admin/upload.vue"

import common from "@/utils/common";
import { putRequest, getRequest } from "@/utils/api";
import { enabled } from "sockjs-client/lib/info-iframe";
export default {
    name: "adminCenter",
    components: {
        myUpload: upload,
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPassword !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        const checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                //获取工具类中的手机号正则表达式
                const reg = common.phoneReg
                // console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    //如果验证输入错误就清空
                    // this.phoneLoginForm.phone = ''
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        };
        return {
            hover: false,
            drawer: false,
            id: "",//管理员id
            // labelPosition: 'right',
            ruleForm: {},
            // editPassword: false,
            rules: {
                telephone: [
                    { required: true, message: '请输入座机', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                // password: [
                //     { required: true, validator: validatePass, trigger: 'blur' }
                // ],
                // checkPassword: [
                //     { required: true, validator: validatePass2, trigger: 'blur' }
                // ],

            }
        }
    },
    created() {
        // 获取user对象
        const resp = window.sessionStorage.getItem("user");
        // // console.log(JSON.parse(window.sessionStorage.getItem("user")));
        // this.ruleForm = JSON.parse(resp);
        // this.ruleForm.password = ""; //避免null干扰
        // this.ruleForm.checkPassword = ""; //检查
        this.id = JSON.parse(resp).id;
        this.getUser(this.id);
    },
    methods: {
        refreshList() {
            this.getUser(this.id);
            this.updateImg();
        },
        getUser(id) {
            getRequest("/system/hr/" + id).then(res => {
                console.log("res", res)
                this.ruleForm = res.obj;
            })
            // 测试404
            // getRequest("/123" + id).then(res => {
            //     console.log("res", res)
            //     this.ruleForm = res.obj;
            // })
        },
        cancel() {
            this.$router.go(0);//刷新页面
        },
        // editPasswordFunc() {
        //     this.editPassword = true;
        // },
        hoverImg() {
            this.hover = !this.hover;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // (this.ruleForm.password== ""? null:this.ruleForm.password),
                    let updateruleForm = {
                        // password: this.ruleForm.password,
                        phone: this.ruleForm.phone,
                        telephone: this.ruleForm.telephone,
                        id: this.ruleForm.id,
                        enabled: true
                    }
                    putRequest("/system/hr/", updateruleForm).then((res) => {
                        // session应该修改----------todo
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        updateImg() {
            this.drawer = !this.drawer;
        }
    }


}
</script>

<style scoped>
ul,
li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.left {
    margin: 10px 50px 10px -10px;
}

.box-card {
    min-height: calc(90vh - 200px);
    padding: 30px 20px;
    text-align: center;
    background-color: #F0F2F5;
}

.user-headpic-update {
    width: 120px;
    height: 120px;
    line-height: 120px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    border-radius: 20px;

    background-repeat: no-repeat;
    background-size: cover;
}

.update {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    color: #fff
        /* background-color: green; */
}

.el-icon {
    --color: inherit;
    height: 1em;
    width: 1em;
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    color: var(--color);
    font-size: inherit;
}

.staticInfo>ul>li {
    margin-bottom: 10px;
    height: 60px;
    line-height: 60px;
}

.staticInfo>li {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 20px 0px;
    font-size: 16px;
    font-weight: 400;
    color: rgb(96, 98, 102);
}

.icon {
    margin-right: 10px;
}

.tipPassword {
    margin-bottom: 20px;
}

.el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-left: 80px;
}
</style>