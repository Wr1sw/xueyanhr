<!-- <template>
    <div class="edit">
        <h1>编辑用户</h1>
        <el-form :model="customer" :rules="rules" ref="ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="customer.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="customer.phone"></el-input>
            </el-form-item>
             <el-form-item label="座机" prop="phone">
                <el-input v-model="customer.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="customer.email"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="desc">
                <el-input type="textarea" v-model="customer.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>


<script>

import { postRequest, putRequest } from "@/utils/api";
export default {
    name: "setting",
    data() {
        return {
            labelPosition: 'right',
            customer: {
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入个人简介', trigger: 'blur' }
                ],
            }
        }
    },

    created() {
        // 获取user对象
        const resp = window.sessionStorage.getItem("user");
        console.log(JSON.parse(resp).id);
        this.handle(id);
    },
    methods: {
        handle(id) {

            getRequest().then(res => {
                // todo------------
            })

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let updateAdmin = {
                        name: this.customer.name,
                        phone: this.customer.phone,
                        email: this.customer.email,
                        desc: this.customer.desc,
                    }
                    postRequest().then(res => {
                        // todo------------
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

    }
}
</script>

<style>
.el-form {
    width: 200px;
}
</style> -->