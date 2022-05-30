<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="员工姓名">
        <el-input v-model="form.ename" class="input"></el-input>
      </el-form-item>

      <el-form-item label="现部门">
        <el-select v-model="form.afterdepid" placeholder="请选择原因" class="select_input">
          <el-option v-for="(item, index) in depList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="现职称">
        <el-select v-model="form.afterjobid" placeholder="请选择原因" class="select_input">
          <el-option v-for="(item, index) in jobList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="现职位">
        <el-select v-model="form.afterposid" placeholder="请选择原因" class="select_input">
          <el-option v-for="(item, index) in posList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>


      <el-button round size="small" @click="clearInfo" class="clear">清空</el-button>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="queryInfo" size="medium">查询</el-button>
        <el-button @click="addInfo">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getRequest } from "@/utils/api";
export default {
  name: "PerEcSearch",
  props: ["searchForm", "listData"],
  data() {
    return {
      form: this.searchForm,
      depList:[],
      jobList:[],
      posList:[]
    };
  },
  mounted() {
    this.getNameList();
  },
  methods: {
    clearInfo() {
      this.form = {};
    },
    queryInfo() {
      //发送给数据父组件：
      return this.$emit("searchInfo", this.form);
    },
    addInfo() {
      return this.$emit("addEmp");
    },
    // //获取下拉框信息-供查询时选择
    getNameList() {
      this.depList = this.listData.departmentList[0];
      this.jobList = this.listData.jobLevelList[0];
      this.posList = this.listData.positionList[0];
    },
  },
};
</script>

<style scope>
.select_input {
  width: 180px;
}

.input {
  width: 100px;
}

.clear {
  margin-left: 10px;
}

.el-form-item {
  display: inline-block;
}

.department {
  margin: 0 20px;
}
</style>