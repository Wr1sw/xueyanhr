<template>
  <div>
    <!-- 数据信息 -->
    <el-table :data="tableData" style="width: 100%" class="el-table__body-wrapper">
      <el-table-column fixed prop="ename" label="员工姓名"></el-table-column>
      <el-table-column prop="detail" label="奖惩原因"></el-table-column>
      <el-table-column prop="result" label="奖/罚金"></el-table-column>
      <el-table-column prop="ecdate" label="日期"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="225px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInfo(scope.row)">编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete"  circle @click="deleteInfo(scope.row)"></el-button>
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

import { deleteRequest, getRequest } from "@/utils/api";

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
      URL: "/personnel/ec/",
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
      getRequest(this.URL + "?PageSize=" + this.PageSize + "&currentPage=" + this.currentPage).then((res) => {
        this.tableData = res.data;
        this.totalCount = res.total;
      });
    },
    //获取查询信息
    queryInfo() {
      let ename = (this.form.ename === undefined) ? "" : this.form.ename
      let ecType = (this.form.ecType === undefined) ? "" : this.form.ecType
      let rid = (this.form.rid === undefined) ? "" : this.form.rid

      getRequest(this.URL + "query?ename=" + ename + "&ecType=" + ecType +
        "&rid=" + rid + "&PageSize=" + this.PageSize + "&currentPage=" + this.currentPage
      )
        .then((res) => {
          this.totalCount = res.total; //修改数据总条数
          this.tableData = res.data; // 将数据赋值给tableData
        });
    },
    //编辑员工信息
    editInfo(info) {
      //调用父方法
      return this.$emit("editEmpInfo", info.id);
    },

   // 删除一个员工信息
    deleteInfo(info) {
      deleteRequest(this.URL+info.id).then((res)=>{
    //  删除成功，返回第一页
          if (res.status == 200) {
            //刷新列表
            this.currentPage = 1;
            this.queryInfo();
          }
        });
    },

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