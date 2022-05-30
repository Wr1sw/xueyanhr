<template>
  <el-dialog :title="!form.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right">

      <!-- 添加 -->
      <!-- <el-form-item label="员工姓名" prop="eid">
        <el-cascader v-model="form.eid" :props="{ emitPath: false }" :show-all-levels="false" :options="optionsData"
          @change="channgeEmp">
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="员工姓名" v-show="!form.id" prop="eid">
        <el-cascader v-model="form.eid" :props="{ emitPath: false }" :show-all-levels="false" :options="optionsData"
          @change="channgeEmp">
        </el-cascader>

      </el-form-item>
      <el-descriptions v-show="!form.id" title="员工基本信息" :column="2">
        <el-descriptions-item label="调整前部门">{{ form.beforedepName }}</el-descriptions-item>
        <el-descriptions-item label="调整前职称">{{ form.beforejobName }}</el-descriptions-item>
        <el-descriptions-item label="调整前职位">{{ form.beforeposName }}</el-descriptions-item>
      </el-descriptions>


      <!-- 编辑 -->
      <el-descriptions v-show="form.id" title="员工基本信息" :column="2">
        <el-descriptions-item label="员工姓名">{{ form.name }}</el-descriptions-item>
        <el-descriptions-item label="调整前部门">{{ form.beforedepName }}</el-descriptions-item>
        <el-descriptions-item label="调整前职称">{{ form.beforejobName }}</el-descriptions-item>
        <el-descriptions-item label="调整前职位">{{ form.beforeposName }}</el-descriptions-item>
      </el-descriptions>

      <br>


      <el-descriptions title='调动'>
        <el-descriptions-item label="备注">
          <el-tag size="small">若其中某项不需要调整，可不选择</el-tag>
        </el-descriptions-item>
      </el-descriptions>


      <el-form-item label="部门调整" prop="afterdepid">
        <el-select v-model="form.afterdepid" placeholder="请选择">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职称调整" prop="afterjobid">
        <el-select v-model="form.afterjobid" placeholder="请选择">
          <el-option v-for="item in jobLevelList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职位调整" prop="afterposid">
        <el-select v-model="form.afterposid" placeholder="请选择">
          <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="调动原因">
        <el-input type="textarea" v-model="form.reason" maxlength="30" show-word-limit placeholder="请输入内容"> </el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" maxlength="30" show-word-limit placeholder="请输入内容"> </el-input>
      </el-form-item>


      <el-form-item label="调动日期">
        <el-col :span="11">
          <el-form-item prop="removedate">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.removedate"></el-date-picker>
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
  props: ["listData"],
  data: function () {
    return {
      visible: false,
      form: {},
      rules: {
        eid: [
          { required: true, message: "请选择员工", trigger: "change" },
        ],
        // //单选
        // ecType: [
        //   { required: true, message: "请选择奖/惩", trigger: "change" },
        // ],
        // //下拉框
        // rid: [
        //   { required: true, message: "请选择奖惩原因", trigger: "change" },
        // ],

      },
      form: {},
      URL: "/personnel/remove/",
      optionsData: [],// 存储部门-员工信息
      departmentList: [],
      jobLevelList: [],
      positionList: [],
    };
  },
  mounted() {
    this.getListInfo();
  },
  methods: {
    channgeEmp(val) {
      // 根据ID 获取empInfo
      if (val !== undefined) { // 解决自动触发问题
        getRequest(this.URL + "/empId/" + val).then((response) => {
          //触发渲染 --只需set一个，后续即可自动渲染
          this.$set(this.form,'beforedepName', response.obj.beforedepName)

          // this.form.beforedepName = response.obj.beforedepName;
          this.form.beforejobName = response.obj.beforejobName;
          this.form.beforeposName = response.obj.beforeposName;

          this.form.beforedepid = response.obj.beforedepid;
          this.form.beforejobid = response.obj.beforejobid;
          this.form.beforeposid = response.obj.beforeposid;

        });
      }
    },
    getListInfo() {
      this.departmentList = this.listData.departmentList[0];
      this.jobLevelList = this.listData.jobLevelList[0];
      this.positionList = this.listData.positionList[0];
    },
    submitAddForm() {
      //处理有不变的数据,避免之后显示有问题
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
      // //更新数据
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
      if (this.form.afterdepid == null && this.form.afterjobid == null && this.form.afterposid == null) {
        return false;
      } else {
        this.$refs[subForm].validate(
          (valid) => {
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


      }
    },
    editEmpInfo() {
      // //根据ID获取数据信息 
      getRequest(this.URL + this.form.id)
        .then((res) => {
          this.form = res.obj;
        });
    },
    // 设置 添加时 获取dep 和 emp 信息
    setAddEmpData() {
      getRequest(this.URL + "depEmpList").then((res) => {
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