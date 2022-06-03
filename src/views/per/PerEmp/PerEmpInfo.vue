<template>
  <div>
    <!-- 数据信息 -->
    <el-table :data="tableData" style="width: 100%" class="el-table__body-wrapper">
      <el-table-column fixed prop="name" label="员工姓名"></el-table-column>
      <el-table-column prop="workid" label="工号" width="100px"></el-table-column>
 
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="120px"></el-table-column>
      <el-table-column prop="department.name" label="所属部门"> </el-table-column>
      <el-table-column prop="jOblevel.name" label="职称"></el-table-column>
      <el-table-column prop="position.name" label="职位"></el-table-column>

      <el-table-column prop="begindate" label="入职日期"></el-table-column>
      <el-table-column prop="workstate" label="在职状态"></el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="225px" >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right" title="其他信息" >
            <p>住址: {{ scope.row.address }}</p>
            <p>生日：{{ scope.row.birthday }}</p>
            <p>身份证号：{{ scope.row.idcard }}</p>
            <p>婚姻状况：{{ scope.row.wedlock }}</p>
            <p>籍贯：{{ scope.row.nativeplace }}</p>
            
             <!-- <p>民族：{{ scope.row.nationid }}</p> -->
            <!-- <p>政治面貌：{{ scope.row.politicid }}</p> --> 
            <!-- 这两个有问题没解决呜呜 -->

            <p>最高学历：{{ scope.row.tiptopdegree }}</p>
            <p>所学专业：{{ scope.row.specialty }}</p>
            <p>转正日期：{{ scope.row.conversiontime }}</p>
            <p>合同起始日期：{{ scope.row.begincontract }}</p>
            <p>合同终止日期：{{ scope.row.endcontract }}</p>
            <p>毕业学校：{{ scope.row.school }}</p>
            <p>聘用形式：{{ scope.row.engageform }}</p>
            <p>合同期限：{{ scope.row.contractterm }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">详细信息</el-tag>
            </div>
          </el-popover>

          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" >编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页设置 -->
    <div class="tabListPage">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="pageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { postRequest, getRequest } from "@/utils/api";

export default {
  name: "EmpBasicInfo",
  props: ["searchFrom"],
  data() {
    return {
      //  总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 10,
      // 个数选择器
      pageSizes: [1, 5, 8, 10],
      // 默认每页显示的条数
      PageSize: 10,
      form: this.searchFrom,
      URL: "/personnel/emp/",
    };
  },
  mounted() {
    //获取用户信息，设置URL
    // this.setURL();
    //获取数据列表
    this.fetchdata();
  },
  methods: {
    //分页获取员工列表信息
    fetchdata() {
        this.form = "";
      getRequest(this.URL+ "?PageSize=" + this.PageSize + "&currentPage=" + this.currentPage).then((res) => {
        this.tableData = res.data;
        this.totalCount = res.total;
      });
    },
    //获取查询信息
    queryInfo() {
      let name = (this.form.name === undefined) ? "" : this.form.name
      let gender = (this.form.gender === undefined) ? "" : this.form.gender
      let department = (this.form.department === undefined) ? "" : this.form.department

      getRequest(this.URL + "query?name=" + name + "&gender=" + gender +
        "&departmentid=" + department + "&PageSize=" + this.PageSize + "&currentPage=" + this.currentPage
      )
        .then((res) => {
          this.totalCount = res.total; //修改数据总条数
          this.tableData = res.data; // 将数据赋值给tableData
        });
    },
    //编辑员工信息
    edit(info) {
      //调用父方法
      return this.$emit("editEmpInfo", info.id);
    },

    //删除一个员工信息
    // deleteEmpInfo(info) {
    //   console.log(info.id);
    //   this.axios
    //     .get("/employee/deleteEmpById", {
    //       params: {
    //         id: info.id,
    //       },
    //     })
    //     .then((res) => {
    //       //删除成功，返回第一页
    //       if (res.status == 200) {
    //         //刷新列表
    //         this.currentPage = 1;
    //         this.queryInfo();
    //       }
    //     });
    // },

    searchInfo(form) {
      this.form = form;
      // //调用方法获取数据
      this.currentPage = 1;
      this.queryInfo(); // 点击每页显示的条数时，显示第一页     
    },
   
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      this.PageSize = val; // 改变每页显示的条数
      this.currentPage = 1; // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.queryInfo(); // 点击每页显示的条数时，显示第一页
    },
    // 显示第几页
    handleCurrentChange(val) {
      this.currentPage = val; // 改变默认的页数
      this.queryInfo(); // 切换页码时，要获取每页显示的条数
    },

    
  },
};
</script>

<style scoped>
.name-wrapper {
  display: inline-block;
  margin-right: 10px;
}

.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  /*滚动条宽度*/
  height: 8px;
  /*滚动条高度*/
}

.el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 10px;
  /*滚动条的背景区域的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
  box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
  background-color: #eeeeee;
  /*滚动条的背景颜色*/
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
  box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
  background-color: rgb(145, 143, 143);
  /*滚动条的背景颜色*/
}
</style>