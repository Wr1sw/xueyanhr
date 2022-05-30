<template>
  <el-dialog :title="!form.id ? '新增 ' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right">

      <el-descriptions v-show="form.id" title="员工基本信息" :column="1">
        <el-descriptions-item label="备注" :span="2">
          <el-tag size="small">若需要修改以下信息，请到员工调动模块</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-show="form.id" :column="3">
        <el-descriptions-item label="所属部门">{{ depName }}</el-descriptions-item>
        <el-descriptions-item label="职称">{{ jobName }}</el-descriptions-item>
        <el-descriptions-item label="职位">{{ posName }}</el-descriptions-item>
      </el-descriptions>
      <br  v-show="form.id">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="身份证号" prop="idcard">
        <el-input v-model="form.idcard"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="wedlock">
        <el-radio-group v-model="form.wedlock">
          <el-radio label="已婚"></el-radio>
          <el-radio label="未婚"></el-radio>
          <el-radio label="离异"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="在职状态" prop="workstate">
        <el-radio-group v-model="form.workstate">
          <el-radio label="在职"></el-radio>
          <el-radio label="离职"></el-radio>
        </el-radio-group>
      </el-form-item>



      <el-form-item v-show="!form.id" label="所属部门" prop="departmentid">
        <el-select v-model="form.departmentid" placeholder="请选择">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-show="!form.id" label="职称" prop="joblevelid">
        <el-select v-model="form.joblevelid" placeholder="请选择">
          <el-option v-for="item in jobLevelList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-show="!form.id" label="职位" prop="posid">
        <el-select v-model="form.posid" placeholder="请选择">
          <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="电子邮件" prop="email">
        <el-input v-model.trim="form.email"></el-input>
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model.trim="form.address"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nationid">
        <el-select v-model="form.nationid" placeholder="请选择">
          <el-option v-for="item in nationList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="籍贯" prop="nativeplace">
        <el-input v-model.trim="form.nativeplace"></el-input>
      </el-form-item>

      <el-form-item label="政治面貌" prop="politicid">
        <el-select v-model="form.politicid" placeholder="请选择">
          <el-option v-for="item in politicsstatusList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最高学历" prop="tiptopdegree">

        <el-select v-model="form.tiptopdegree" placeholder="请选择">
          <el-option label="博士" value="博士"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="小学" value="初中"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="所学专业" prop="specialty">
        <el-input v-model.trim="form.specialty"></el-input>
      </el-form-item>

      <el-form-item label="毕业学校" prop="school">
        <el-input v-model.trim="form.school"></el-input>
      </el-form-item>
      <el-form-item label="聘用形式" prop="engageform">
        <el-input v-model.trim="form.engageform"></el-input>
      </el-form-item>
      <el-form-item label="合同期限" prop="contractterm">
        <el-input v-model.trim.number="form.contractterm"></el-input>
      </el-form-item>
      <el-form-item label="工龄" prop="workage">
        <el-input v-model.trim.number="form.workage"></el-input>
      </el-form-item>
      <br>

      <el-form-item label="出生日期" required>
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <br />
      <el-form-item label="入职日期" required>
        <el-col :span="11">
          <el-form-item prop="begindate">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.begindate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="转正日期">
        <el-col :span="11">
          <el-form-item prop="conversiontime">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.conversiontime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="合同起始">
        <el-col :span="11">
          <el-form-item prop="begincontract">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.begincontract"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="合同终止">
        <el-col :span="11">
          <el-form-item prop="endcontract">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endcontract"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="离职日期">
        <el-col :span="11">
          <el-form-item prop="notworkdate">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.notworkdate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleForm()">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { putRequest, getRequest, postRequest } from "@/utils/api";

export default {
  name: "baseform",
  data: function () {
    //验证规则
    const rulesIdCard = (rule, value, callback) => {
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regIdNo.test(value)) {
        callback("身份证号填写有误");
      } else {
        callback();
      }
    };
    const rulesPhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback("手机号信息有误");
      } else {
        callback();
      }
    };
    const rulesEmail = (rule, value, callback) => {
      callback();
      // var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      // if (reg.test(value)) {
      //   callback("邮箱格式有误");
      // }else {
      //   callback();
      // }
    };
    return {
      visible: false,
      departmentList: [],
      jobLevelList: [],
      positionList: [],
      nationList: [],
      politicsstatusList: [],
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入员工名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度为2到10", trigger: "blur" },
        ],
        //单选
        gender: [
          { required: true, message: "请输入员工性别", trigger: "change" },
        ],
        idcard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          { validator: rulesIdCard, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: rulesPhone, trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: rulesEmail, trigger: "blur" },
        ],
        //下拉框
        // departmentid: [
        //   { required: true, message: "请选择所属部门", trigger: "change" },
        // ],
        // joblevelid: [
        //   { required: true, message: "请选择所属职称", trigger: "change" },
        // ],
        // posid: [
        //   { required: true, message: "请选择所属职位", trigger: "change" },
        // ],
        // workstate: [
        //   { required: true, message: "请选择工作状态", trigger: "blur" },
        // ],
        // address: [
        //   { required: false, message: "请选择地址", trigger: "blur" },
        // ],
        birthday: [
          {
            // type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        begindate: [
          {
            // type: "date",
            required: true,
            message: "请选择入职日期",
            trigger: "change",
          },
        ],
      },
      URL: "/personnel/emp/",
      posName: "",
      jobName: "",
      depName: "",
    };
  },
  mounted() {
    this.getOtherInfo();
  },
  methods: {
    submitAddForm() {
      postRequest(this.URL, this.form).then((res) => {
        if (res.status == 200) {
          //调用父类fetch方法，重新获取数据
          this.$emit("refreshDataList");
          setTimeout(() => {
            //设置面罩状态
            this.visible = false;
          }, 3000);
        }
      });
    },
    submitEditForm() {
      //更新数据
      putRequest(this.URL, this.form).then((res) => {
        // 更新成功
        if (res.status == 200) {
          //调用父类fetch方法，重新获取数据
          this.$emit("refreshDataList");
          //设置面罩状态
          setTimeout(() => {
            this.visible = false;
          }, 3000);

        }
      });
    },
    //提交表单：
    submitForm(subForm) {
      this.$refs[subForm].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.submitEditForm();
          } else {
            this.submitAddForm();
          }
        } else {
          return false;
        }
      });
    },
    getOtherInfo() {
      getRequest(this.URL + "other").then((response) => {
        let data = response.obj;
        this.nationList = data.nationList[0];
        this.departmentList = data.departmentList[0];
        this.jobLevelList = data.jobLevelList[0];
        this.positionList = data.positionList[0];
        this.politicsstatusList = data.politicsstatusMapperList[0];
      });
    },
    editEmpInfo() {
      //根据ID获取数据信息 
      getRequest(this.URL + this.form.id)
        .then((res) => {
          this.form = res.obj;
          this.depName = res.obj.department.name;
          this.jobName = res.obj.jOblevel.name;
          this.posName = res.obj.position.name;
        });
    },
    // 编辑和弹出的初始化页面
    init(id) {
      this.form = {};
      this.form.id = id || "";
      // 显示弹出层
      this.visible = true;
      if (id) this.editEmpInfo(); //获取对应员工信息
    },
    cancleForm() {
      this.visible = false;
    },
  },
  watch: {
    //设置弹窗验证规则重复出现问题
    visible: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.$refs["form"].clearValidate(); //清空所有的验证规则
          });
        }
      },
    },
  },
};
</script>

<style scoped>
.demonstration {
  margin-right: 10px;
}

.el-form-item {
  margin-right: 20px;
}

.block {
  margin: 10px 0;
}
</style>