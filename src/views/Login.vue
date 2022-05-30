<template>
  <div class="login">
    <div class="login_panle">
      <div class="login_panle_form">
        <div class="login_panle_form_title">
          <img class="login_panle_form_title_logo" src="https://www.gin-vue-admin.com/img/logo.png" />
          <p class="login_panle_form_title_p" data-v-695b14b3="">Xue-Yi-An</p>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">

          <!-- 账号密码登陆 -->
          <el-tab-pane label="账户登录" name="accountLogin">
            <el-form :rules="rules" ref="accountLoginForm" :model="accountLoginForm">
              <el-form-item prop="username">
                <el-input type="text" v-model="accountLoginForm.username" auto-complete="off" placeholder="请输入用户名"
                  suffix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="accountLoginForm.password" auto-complete="off" placeholder="请输入密码"
                  suffix-icon="el-icon-lock" @keydown.enter.native="submitAccountLogin"></el-input>
              </el-form-item>

              <el-form-item>
                <el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
                <el-button type="primary" class="loginButton" @click="submitAccountLogin">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <!-- 手机登录 -->
          <el-tab-pane label="手机登录" name="phoneLogin">
            <el-form :rules="rules" ref="phoneLoginForm" :model="phoneLoginForm">

              <el-form-item prop="phone">
                <el-input type="text" v-model="phoneLoginForm.phone" auto-complete="off" placeholder="手机号码，仅支持大陆手机"
                  suffix-icon="el-icon-phone-outline"></el-input>
              </el-form-item>

              <el-form-item prop="phoneCode">
                <el-col :span="11">
                  <el-input v-model="phoneLoginForm.phoneCode" auto-complete="off" placeholder="请输入验证码" size=""
                    maxlength="4" @keyup.enter.native="submitPhoneLogin"></el-input>

                  <!-- <el-input placeholder="短信验证码" :model="phoneLoginForm.code"></el-input> -->
                </el-col>
                <el-col :span="11">
                  <el-button @click="getPhoneCode" :class="{ 'disabled-style': getCodeBtnDisable }"
                    :disabled="getCodeBtnDisable" class="getCodebtn">
                    {{ codeBtnWord }}
                  </el-button>
                </el-col>

              </el-form-item>

              <el-form-item>
                <el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
                <el-button type="primary" class="loginButton" @click="submitPhoneLogin">登录</el-button>
              </el-form-item>

            </el-form>
          </el-tab-pane>

          <!-- 邮箱登录 -->
          <el-tab-pane label="邮件验证码登录" name="emailLogin">
            <el-form :rules="rules" ref="emailLoginForm" :model="emailLoginForm">
              <el-form-item prop="email">
                <el-input type="text" v-model="emailLoginForm.email" auto-complete="off" placeholder="邮箱号"
                  suffix-icon="el-icon-message"></el-input>
              </el-form-item>

              <el-form-item prop="emailCode">
                <el-col :span="11">
                  <el-input v-model="emailLoginForm.emailCode" auto-complete="off" placeholder="请输入验证码" size=""
                    maxlength="4" @keyup.enter.native="submitEmailLogin"></el-input>

                </el-col>
                <el-col :span="11">
                  <el-button @click="getEmailCode" :class="{ 'disabled-style': getEmailCodeBtnDisable }"
                    :disabled="getEmailCodeBtnDisable" class="getCodebtn">
                    {{ emailCodeBtnWord }}
                  </el-button>
                </el-col>

              </el-form-item>

              <el-form-item>
                <el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
                <el-button type="primary" class="loginButton" @click="submitEmailLogin">登录</el-button>
              </el-form-item>

            </el-form>
          </el-tab-pane>

        </el-tabs>

        <!-- 三方登录 -->
        <div class="gitHubLogin" @click="gitHubLogin">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github"
            viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>

        </div>


      </div>
      <div class="login_panle_right"></div>
    </div>


  </div>

</template>

<script>

import common from "@/utils/common";
export default {
  name: "Login",
  data() {
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
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱号不能为空'));
      } else {
        //获取工具类中的邮箱正则表达式
        const reg = common.emailReg
        // console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          //如果验证输入错误就清空
          // this.emailLoginForm.email = ''
          return callback(new Error('请输入正确的邮箱号'));
        }
      }
    };
    return {
      accountLoginForm: {
        // username: 'admin',
        // password: '123'
      },
      phoneLoginForm: {
        phone: "18990510820",
        phoneCode: ""
      },
      emailLoginForm: {
        email: "1335098123@qq.com",
        emailCode: "",
      },
      codeBtnWord: '获取验证码', // 获取手机验证码按钮文字
      emailCodeBtnWord: '获取验证码',//获取邮箱验证码按钮文字
      standardWaitTime: 10,
      waitTime: 10, // 获取手机验证码按钮失效时间60
      waitEmailTime: 10,// 获取邮箱验证码按钮失效时间60
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        phoneCode: [{ required: true, message: "请输入验证码", trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        emailCode: [{ required: true, message: "请输入验证码", trigger: 'blur' }]
      },
      activeName: 'phoneLogin',

    }
  },
  methods: {
    // 通用-- 验证通过后设置用户信息，路由
    setUserInfo(resp) {
      // 初始化 currentHr
      this.$store.commit('init_currentHr', resp.obj);
      window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
      let path = this.$route.query.redirect;
      this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
    },
    // 01 账户密码登陆
    submitAccountLogin() {
      this.$refs.accountLoginForm.validate((valid) => {
        if (valid) {
          this.postKeyValueRequest('/doLogin', this.accountLoginForm).then(resp => {
            if (resp) {
              this.setUserInfo(resp); // 设置用户、路由信息
            }
          })
        } else {
          this.$message.error('请输入所有字段')
          return false;
        }
      });
    },

    // 02 短信验证码登录
    submitPhoneLogin() {
      const _this = this
      //判断输入的验证码是否为空
      if (this.phoneLoginForm.phoneCode != null) {
        this.$refs.phoneLoginForm.validate((valid) => {
          if (valid) {
            console.log("111")
            // ------------------ TODO  发送请求-验证用户手机号和输入的验证码---------------

            // _this.$axios.post("/iosLogin", {
            //   "phone": this.ruleForm.phone,
            //   "Verification": this.ruleForm.code
            // }).then(res => {
            //   this.setUserInfo(resp); // 设置用户、路由信息(可用)
            // })
          } else {
            // console.log('error submit!!');
            return false;
          }
        })
      }
    },
    getPhoneCode() { // 获取手机验证码
      const _this = this
      const params = {}
      params.phone = this.phoneLoginForm.phone

      //-------------------------------------- TODO 调用获取短信验证码接口--------------------------------------
      // _this.$axios.post('/sendMessage', params).then(res => {
      // console.log("--------查看后台响应的值-----", res)
      // if (res.data.code === 200) {
      //   this.$message({
      //     message: '验证码已发送，请稍候...',
      //     type: 'success',
      //     center: true
      //   })
      // }
      // })


      //设置验证码 可点击状态   
      let that = this
      that.waitTime--
      that.getCodeBtnDisable = true
      this.codeBtnWord = `${this.waitTime}s 后重新获取`
      let timer = setInterval(function () {
        if (that.waitTime > 1) {
          that.waitTime--
          that.codeBtnWord = `${that.waitTime}s 后重新获取`
        } else {
          clearInterval(timer)
          that.codeBtnWord = '获取验证码'
          that.getCodeBtnDisable = false
          that.waitTime = that.standardWaitTime
        }
      }, 1000)
    },

    // 不想合并成一个方法了毁灭吧 ---不用管，现在可以正常执行
    // setCodeInterval(val) {
    //   // let that = val
    //   // let waitTime = that.waitTime
    //   // waitTime--
    //   // that.getCodeBtnDisable = true
    //   // this.codeBtnWord = `${this.waitTime}s 后重新获取`
    //   // let timer = setInterval(function () {
    //   //   if (that.waitTime > 1) {
    //   //     that.waitTime--
    //   //     that.codeBtnWord = `${that.waitTime}s 后重新获取`
    //   //   } else {
    //   //     clearInterval(timer)
    //   //     that.codeBtnWord = '获取验证码'
    //   //     that.getCodeBtnDisable = false
    //   //     that.waitTime = that.standardWaitTime
    //   //     console.log("that.waitTime", that.waitTime)
    //   //   }
    //   // }, 1000)



    // },

    // 03 邮箱登录
    submitEmailLogin() {
      const _this = this
      //判断输入的验证码是否为空
      if (this.emailLoginForm.emailCode != null) {
        this.$refs.emailLoginForm.validate((valid) => {
          if (valid) {
            console.log("111")
            // ------------------ TODO  发送请求-验证用户手机号和输入的验证码---------------

            // _this.$axios.post("/iosLogin", {
            //   "phone": this.ruleForm.phone,
            //   "Verification": this.ruleForm.code
            // }).then(res => {
            //   this.setUserInfo(resp); // 设置用户、路由信息(可用)
            // })
          } else {
            // console.log('error submit!!');
            return false;
          }
        })
      }
    },
    getEmailCode() { // 获取邮箱验证码
      const _this = this
      const params = {}
      params.mail = this.emailLoginForm.mail

      // --------------------------------TODO 调用邮箱验证码接口---------------------------------

      // _this.$axios.post('/sendMessage', params).then(res => {
      // console.log("--------查看后台响应的值-----", res)
      // if (res.data.code === 200) {
      //   this.$message({
      //     message: '验证码已发送，请稍候...',
      //     type: 'success',
      //     center: true
      //   })
      // }
      // })


      let that = this
      that.waitEmailTime--
      that.getEmailCodeBtnDisable = true
      this.emailCodeBtnWord = `${this.waitEmailTime}s 后重新获取`
      let timer = setInterval(function () {
        if (that.waitEmailTime > 1) {
          that.waitEmailTime--
          that.emailCodeBtnWord = `${that.waitEmailTime}s 后重新获取`
        } else {
          clearInterval(timer)
          that.emailCodeBtnWord = '获取验证码'
          that.getEmailCodeBtnDisable = false
          that.waitEmailTime = that.standardWaitTime
        }
      }, 1000)
    },
    // 三方登录
    gitHubLogin() {
      // -----------------------------  todo  调用三方登录接口 --------------------
      console.log("三方登录");
    },


    // 控制三种方式的切换
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  computed: {
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get() {
        if (this.waitTime === this.standardWaitTime) {
          if (this.phoneLoginForm.phone) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set() {
      }
    },
    getEmailCodeBtnDisable: {
      get() {
        if (this.waitEmailTime === this.standardWaitTime) {
          if (this.emailLoginForm.email) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set() {
      }

    },

  }
}
</script>

<style scoped>
.login {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/images/login_background.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}

.login_panle {
  position: absolute;
  top: 3vh;
  left: 2vw;
  width: 96vw;
  height: 94vh;
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

login_panle_form {
  width: 420px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgb(0 0 0 / 20%)
}

.login_panle_right {
  background-image: url(../assets/images/login_right.svg);
  background-size: cover;
  width: 40%;
  height: 60%;
  float: right !important;
}

.login_panle_form {
  width: 420px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
}

.login_panle_form_title_logo {
  width: 90px;
  height: 72px;
}

.login_panle_form_title {
  display: flex;
  align-items: center;
  margin: 30px 0;
}

.login_panle_form_title_p {
  font-size: 40px;
  padding-left: 20px;
}

.loginButton {
  width: 90%;
  margin-left: 20px;
}

.bi-github {
  margin-top: 20px;
}

.getCodebtn {
  margin-left: 20px;
  /* background-color: #bdb8b84d; */
  width: 90%;
}



/* .loginContainer { */
/* border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background-image: linear-gradient(to right, #455970, #041d32);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6; */
/* } */

/* .loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #f8f8f8;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
} */
</style>