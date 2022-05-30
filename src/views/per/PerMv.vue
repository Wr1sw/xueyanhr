<template>
  <div>
    <!-- 查询 v-if 防止异步添加，父组件获取数据比子组件慢-->
    <mySearch ref="search" @searchInfo="searchInfo" @addEmp="addEmp" :searchForm="form" :listData="listData"  v-if=" JSON.stringify(listData)!=='{}'
"></mySearch>

    <!-- 基本信息展示 -->
    <myEmpBasicInfo ref="basicInfo" :searchFrom="form" @editEmpInfo="editEmpInfo"></myEmpBasicInfo>

    <!-- 添加、编辑按钮显示-->
    <myEmpBasicAddEdit ref="EmpBasicAddEdit" @refreshDataList="getDataList" :listData="listData" v-if=" JSON.stringify(listData)!=='{}'" />
  </div>
</template>

<script>
import Search from "./PerMv/PerMvSearch";
import EmpBasicAddEdit from "./PerMv/PerMvAddEdit";
import EmpBasicInfo from "./PerMv/PerMvInfo";

import { getRequest } from "@/utils/api";
export default {
  name: "PerMv",
  components: {
    //子组件注册：
    mySearch: Search,
    myEmpBasicAddEdit: EmpBasicAddEdit,
    myEmpBasicInfo: EmpBasicInfo,
  },
  data() {
    return {
      //添加、编辑页面显示状态：
      dialogFormVisible: false,
      // 搜索框表单数据
      form: {
        // name:123
      },
     listData:{},
      URL:"/personnel/remove/",
    };
  },
  created() {
    this.getListInfo();
  },
  methods: {
    // 获取下拉框数据，传给子组件
    getListInfo() {
      getRequest(this.URL + "getNameList").then((response) => {
        
        // this.$set(listData)//下拉框数据
        this.listData = response.obj;
      });
    },
      searchInfo(form) {
        //调用子组件
        this.$refs.basicInfo.currentPage = 1;
        this.$refs.basicInfo.form = form;
        this.$refs.basicInfo.queryInfo();
      },
      //添加员工
      addEmp() {
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.EmpBasicAddEdit.init();
        });
      },
      getDataList() {
        this.$refs.basicInfo.fetchdata();
      },
      editEmpInfo(id) {
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.EmpBasicAddEdit.init(id);
        });
      }
    },
  }
</script>

<style scoped>
</style>