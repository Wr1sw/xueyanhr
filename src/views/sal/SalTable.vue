<template>
  <div>
    <el-table :data="tableData" border style="width: 70%;margin: 0 auto" v-if="!selectDep" class="infoTable">
      <el-table-column prop="departmentName" label="部门名称" >
      </el-table-column>
      <el-table-column prop="count" label="套账人数" >
      </el-table-column>

      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button style="margin-bottom:10px" v-if="selectDep" @click="goBack">返回上一级</el-button>
    <el-table :data="depEmpData" style="width:100%;margin: 0 auto" v-if="selectDep">
      <el-table-column prop="ename" label="员工名称">
      </el-table-column>
      <el-table-column prop="workID" label="工号" width="100px">
      </el-table-column>
      <el-table-column prop="basicSalary" label="基本工资">
      </el-table-column>
      <el-table-column width="80" prop="trafficSalary" label="交通补助"></el-table-column>
      <el-table-column width="80" prop="lunchSalary" label="午餐补助"></el-table-column>
      <el-table-column width="100" prop="createDate" label="启用时间"></el-table-column>
      <el-table-column label="养老金" align="center">
        <el-table-column prop="pensionPer" label="比率"></el-table-column>
        <el-table-column prop="pensionBase" label="基数"></el-table-column>
      </el-table-column>
      <el-table-column label="医疗保险" align="center">
        <el-table-column prop="medicalPer" label="比率"></el-table-column>
        <el-table-column prop="medicalBase" label="基数"></el-table-column>
      </el-table-column>
      <el-table-column label="公积金" align="center">
        <el-table-column prop="accumulationFundPer" label="比率"></el-table-column>
        <el-table-column prop="accumulationFundBase" label="基数"></el-table-column>
      </el-table-column>

      <el-table-column prop="salarySum" label="应发工资">
      </el-table-column>
      <el-table-column prop="allSalary" label="实发工资">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCheck(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>



  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
export default {
  name: "Addjc",
  // inject: ["reload"],
  data() {
    return {
      tableData: [],
      selectDep: false,
      depEmpData: [],
      salgrDetail:{
        eid:'',
        e_name:'',
        deduct_sum:'',
        salary_standard_sum:'',
        salary_paid_sum:''
      }
    }
  },
  mounted() {
    getRequest("/salary/table/department-salary").then(res => {
      this.tableData = res.data;
    })


  },
  methods: {
    goBack() {
      this.selectDep = false;
    },
    //审核
    handleCheck(data) {
      this.salgrDetail.eid = data.workID;
      this.salgrDetail.eName = data.ename;
      this.salgrDetail.deductSum = data.allSalary - data.salarySum;
      this.salgrDetail.salaryStandardSum = data.salarySum;
      this.salgrDetail.salaryPaidSum = data.allSalary;
      console.log(this.salgrDetail.eid)
      postRequest("/salary/sg/",this.salgrDetail).then(resp =>{
        if (resp){

        }
      })
    },
    // 选择部门
    handleClick(data) {
      getRequest("/salary/table/salaries?departmentName=" + data.departmentName).then(
        res => {
          // i
          this.selectDep = true;
          this.depEmpData = res.data
        }
      )
    }
  }
}
</script>
<style  scoped>
.infoTable {
  margin-bottom: 20px;
}
</style>
