<template>
  <div>
    <!-- 查询 -->
    <mySearch ref="search" @searchInfo="searchInfo" @addEmp="addEmp" :searchForm="form"></mySearch>

    <!-- 基本信息展示 -->
    <myEmpBasicInfo ref="basicInfo" :searchFrom="form" @editEmpInfo="editEmpInfo"></myEmpBasicInfo>

    <!-- 添加、编辑按钮显示-->
    <myEmpBasicAddEdit ref="EmpBasicAddEdit" @refreshDataList="getDataList" />
  </div>
</template>


<script>
import Search from "./PerEmp/PerEmpSearch";
import EmpBasicAddEdit from "./PerEmp/PerEmpAddEdit";
import EmpBasicInfo from "./PerEmp/PerEmpInfo";

export default {
  name: "PerEmp",
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
    };
  },
  methods: {
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
};
</script>


<style scoped>
</style>