<template>
<div>
  <div>
    <div style="display: flex;justify-content: space-between">
      <el-button icon="el-icon-plus" type="primary" @click="showAddSalaryView">添加工资账套</el-button>
      <el-button icon="el-icon-refresh" type="success"></el-button>
    </div>

  </div>
  <div style="margin-top: 10px">
    <el-table :data="salaries" border stripe>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="180" prop="standardName" label="账套名称"></el-table-column>
      <el-table-column width="220" prop="standardId" label="账套标准编号"></el-table-column>
      <el-table-column width="80" prop="basicSalary" label="基本工资"></el-table-column>
      <el-table-column width="80" prop="trafficSalary" label="交通补助"></el-table-column>
      <el-table-column width="80" prop="lunchSalary" label="午餐补助"></el-table-column>
      <el-table-column width="100" prop="createDate" label="启用时间"></el-table-column>
      <el-table-column label="养老金" align="center">
        <el-table-column width="70" prop="pensionPer" label="比率"></el-table-column>
        <el-table-column width="70" prop="pensionBase" label="基数"></el-table-column>
      </el-table-column>
      <el-table-column label="医疗保险" align="center">
        <el-table-column width="70" prop="medicalPer" label="比率"></el-table-column>
        <el-table-column width="70" prop="medicalBase" label="基数"></el-table-column>
      </el-table-column>
      <el-table-column label="公积金" align="center">
        <el-table-column width="70" prop="accumulationfundPer" label="比率"></el-table-column>
        <el-table-column width="70" prop="accumulationfundBase" label="基数"></el-table-column>
      </el-table-column>
      <el-table-column width="80" prop="designer" label="制定人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditSalaryView(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteSalary(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="50%">
      <div style="display: flex;justify-content: space-around;align-items: center">
        <el-steps direction="vertical" :active="activeItemIndex">
          <el-step :title="itemName"v-for="(itemName, index) in salaryItemName" :key="index"></el-step>
        </el-steps>
        <el-input v-model="salary[title]" :placeholder="'请输入'+salaryItemName[index]+'...'" v-for="(value, title, index) in salary"
        :key="index" v-show="activeItemIndex==index" style="width: 200px"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="preStep">{{activeItemIndex == 10?'取消':'上一步'}}</el-button>
    <el-button type="primary" @click="nextStep">{{activeItemIndex == 10?'完成':'下一步'}}</el-button>
  </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
export default {
  name: "SalSob",
  data() {
    return {
      user:JSON.parse(window.sessionStorage.getItem("user")),
      salaries: [],
      dialogVisible: false,
      dialogTitle:'添加工资账套',
      salaryItemName:[
          '基本工资',
          '交通补助',
          '午餐补助',
          '养老金比率',
          '养老金基数',
          '医疗保险比率',
          '医疗保险基数',
          '公积金比率',
          '公积金基数',
          '账套名称',
          '制定人'
      ],
      activeItemIndex:0,
      salary:{
        basicSalary:0,
        trafficSalary:0,
        lunchSalary:0,
        pensionPer:0,
        pensionBase:0,
        medicalPer:0,
        medicalBase:0,
        accumulationfundPer:0,
        accumulationfundBase:0,
        standardName:'',
        designer:'',
        changer:''
      }
    }
  },
  mounted() {
    this.initSalaries();
  },
  methods: {
    initSalaries () {
      this.getRequest("/salary/sob/").then(resp=>{
        if (resp) {
          this.salaries = resp;
        }
      })
    },
    showAddSalaryView() {
      this.salary={
        basicSalary:0,
        trafficSalary:0,
        lunchSalary:0,
        pensionPer:0,
        pensionBase:0,
        medicalPer:0,
        medicalBase:0,
        accumulationfundPer:0,
        accumulationfundBase:0,
        standardName:'',
        designer:''
      }
      this.activeItemIndex = 0;
      this.dialogTitle = '添加工资账套';
      this.dialogVisible = true;
    },
    nextStep() {
      if (this.activeItemIndex == 10) {
        // id存在，更新操作
        if (this.salary.sdtId) {
          // 默认更改者为登录用户
          // 默认登记者为登录用户
          this.salary.register = this.user.name;
          this.salary.changer = this.user.name;
          this.putRequest("/salary/sob/", this.salary).then(resp=>{
            if (resp) {
              this.initSalaries();
              this.dialogVisible = false;
            }
          })
        } else {
          // 默认登记者为登录用户
          this.salary.register = this.user.name;
          this.postRequest("/salary/sob/", this.salary).then(resp=>{
            if (resp) {
              this.initSalaries();
              this.dialogVisible = false;
            }
          })
        }

        return
      }
      this.activeItemIndex++;
    },
    preStep() {
      if (this.activeItemIndex == 0) {
        return
      } else if (this.activeItemIndex == 10) {
        // 数据初始化
        // 关闭对话框

        this.dialogVisible = false;
        return
      }
      this.activeItemIndex--;
    },
    deleteSalary(data) {
      this.$confirm('确认删除【 '+data.standardName+'】账套','提示', {
        cancelButtonText:'取消',
        confirmButtonText:'确认'
      }).then(()=>{
        this.deleteRequest("/salary/sob/"+data.sdtId).then(resp=>{
          if (resp) {
            this.initSalaries();
          }
        })
      }).catch(()=>{
        this.$message.info("取消删除");
      })
    },
    showEditSalaryView(data) {
      this.activeItemIndex = 0;
      this.dialogVisible = true;
      this.dialogTitle = '编辑工资账套';
      // 属性顺序不一定一致，不能直接赋值
      this.salary.basicSalary = data.basicSalary;
      this.salary.trafficSalary = data.trafficSalary;
      this.salary.lunchSalary = data.lunchSalary;
      this.salary.bonus = data.bonus;
      this.salary.pensionPer = data.pensionPer;
      this.salary.pensionBase = data.pensionBase;
      this.salary.medicalPer = data.medicalPer;
      this.salary.accumulationfundPer = data.accumulationfundPer;
      this.salary.accumulationfundBase = data.accumulationfundBase;
      this.salary.standardName = data.standardName;
      this.salary.designer = data.designer;
      this.salary.sdtId = data.sdtId;
    }
  }
}
</script>

<style scoped>

</style>