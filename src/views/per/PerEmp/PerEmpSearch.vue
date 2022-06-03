<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属部门" class="department">
        <el-select v-model="form.department" placeholder="请选择部门">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button round size="small" @click="clearInfo" class="clear">清空</el-button>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="queryInfo" size="medium"

          >查询</el-button
        >
        <el-button @click="addInfo" >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getRequest } from "@/utils/api";
export default {
  name: "PerEmpSearch",
  props: ["searchForm"],
  data() {
    return {
      departmentList: [],
      form: this.searchForm,
    };
  },
  mounted() {
    this.getDepartmentID_Name();
  },
  methods: {
    clearInfo(){
      this.form = {};
    },
    queryInfo() {
      //发送给数据父组件：
      return this.$emit("searchInfo", this.form);
    },
    //点击了添加按钮
    addInfo() {
      this.clearInfo();//设置清空 query信息,避免之后page跳转有问题
      this.queryInfo();
      return this.$emit("addEmp");
    },
    //获取部门信息-供查询时选择
    getDepartmentID_Name() {
      getRequest("/personnel/emp/depList").then((res) => {
        this.departmentList = res.obj;
      });
    },
  },
};
</script>

<style>
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