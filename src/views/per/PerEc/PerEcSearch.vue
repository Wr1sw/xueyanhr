<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="员工姓名">
        <el-input v-model="form.ename"></el-input>
      </el-form-item>
      <el-form-item label="奖惩类别">
        <el-radio-group v-model="form.ecType" @change="ecTypeChange">
          <el-radio :label="1">奖</el-radio>
          <el-radio :label="0">惩</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="奖惩原因">
        <el-select v-model="form.rid" placeholder="请选择原因">
          <el-option v-for="(item, index) in rpList" :key="index" :label="item.detail" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button round size="small" @click="clearInfo" class="clear">清空</el-button>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="queryInfo" size="medium">查询</el-button>
        <el-button @click="addInfo" >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getRequest } from "@/utils/api";
export default {
  name: "PerEcSearch",
  props: ["searchForm"],
  data() {
    return {
      rpList: [],
      form: this.searchForm,
    };
  },
  mounted() {
    this.getEmpEcDetail();
  },
  methods: {
    ecTypeChange(val) {
      //根据ID获取数据信息 
      getRequest("/personnel/ec/ecType?ecType=" + val).then((res) => {
        this.rpList = res.obj;
        if (this.form.rid) { // 修改了奖惩按钮--置空后面选择框
          // 选择的与奖惩 不匹配
          let List =  res.obj.filter((obj) => {
            return this.form.rid == obj.id;
          })
          if(List.length == 0)
            this.form.rid = "";
          
        }

      })
    },
    clearInfo() {
      this.form = {};
      this.getEmpEcDetail();
    },
    queryInfo() {
      //发送给数据父组件：
      return this.$emit("searchInfo", this.form);
    },
    addInfo() {
      return this.$emit("addEmp");
    },
    //获取RP信息-供查询时选择
    getEmpEcDetail() {
      getRequest("/personnel/ec/ecType").then((res) => {
        this.rpList = res.obj;
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