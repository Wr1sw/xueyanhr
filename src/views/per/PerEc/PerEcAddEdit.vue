<template>
  <el-dialog :title="!form.id ? '新增员工奖惩信息 ' : '修改员工奖惩信息'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="right">

      <el-form-item v-show="form.id" label="员工姓名">
        <el-input v-model="form.ename" disabled></el-input>
      </el-form-item>

      <el-form-item v-show="!form.id" label="员工姓名" prop="eid">
        <el-cascader v-model="form.eid" :props="{ emitPath: false }" :show-all-levels="false" :options="optionsData">
        </el-cascader>
      </el-form-item>
      <el-form-item label="奖惩类别" prop="ecType">
        <el-radio-group v-model="form.ecType" @change="ecTypeChange">
          <el-radio :label="1">奖</el-radio>
          <el-radio :label="0">惩</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="奖惩原因" prop="rid">
        <el-select v-model="form.rid" placeholder="请先选择奖/惩类别" @change="detailChange">
          <el-option v-for="item in rpList" :key="item.id" :label="item.detail" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="奖惩金额">
        &nbsp;&nbsp;{{ form.result }}
      </el-form-item>


      <el-form-item label="奖惩日期">
        <el-col :span="11">
          <el-form-item prop="ecdate">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.ecdate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <br />

      奖惩备注：
      <el-input type="textarea" placeholder="请输入内容" v-model.trim="form.remark" maxlength="30" show-word-limit>
      </el-input>
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
    return {
      visible: false,
      rpList: [],
      rules: {
        eid: [
          { required: true, message: "请选择员工", trigger: "change" },
        ],
        //单选
        ecType: [
          { required: true, message: "请选择奖/惩", trigger: "change" },
        ],
        //下拉框
        rid: [
          { required: true, message: "请选择奖惩原因", trigger: "change" },
        ],
        ecdate: [
          { required: true, message: "请选择奖惩日期", trigger: "change" },
        ]
      },
      form: {},
      URL: "/personnel/ec/",
      optionsData: [],// 存储部门-员工信息
    };
  },
  methods: {
    detailChange(val) {
      // this.form.rid = val;
      this.form.result = this.rpList.filter((item) => {
        return item.id == val
      })[0].result;
    },
    getRpList(val) {
      getRequest(this.URL + "ecType/?ecType=" + val).then((res) => {
        this.rpList = res.obj;

      })
    },
    ecTypeChange(val) {
      this.getRpList(val);
      if (this.form.id) {//编辑
        this.form.rid = "";
        this.form.result = "";
      }

    },
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
    editEmpInfo() {
      // debugger
      //根据ID获取数据信息 
      getRequest(this.URL + this.form.id)
        .then((res) => {
          console.log("editaaa",res);
          this.form = res.obj;
          this.getRpList(this.form.ecType);// 初始化RPList表单
          // this.ecTypeChange(this.form.ecType)
        });
    },
    // 设置 添加时 获取dep 和 emp 信息
    setAddEmpData() {
      getRequest("/personnel/ec/depEmpList").then((res) => {
        this.optionsData = res.obj;
      });
    },
    // 编辑和弹出的初始化页面
    init(id) {
      this.form = {};
      this.form.id = id || "";
      // 显示弹出层
      this.visible = true;
      if (id) this.editEmpInfo(); //获取对应员工信息
      else this.setAddEmpData();
    },
    cancleForm() {
      //清除数据
      // this.$refs.empInfo.clearInfo();
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
            // 清除RPlist
            this.rpList = [];
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