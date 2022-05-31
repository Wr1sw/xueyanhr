<template>
  <div>
    <div class="header">
      <div class="add_row">
        <el-button type="primary"  @click="addTrainDataButton" icon="el-icon-plus">发布培训</el-button>
      </div>
    </div>
    <div class="main">
      <div class="main_table">
        <el-table
            :data="trainData"
            stripe
            style="width: 100%; text-align: center" >
          <el-table-column
              style="text-align: center"
              prop="id"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="name"
              label="培训名称"
              width="180">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="content"
              label="培训内容"
              width="250">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="beginDate"
              label="开始日期"
              width="120">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="endDate"
              label="结束日期"
              width="120">
          </el-table-column>
          <el-table-column
              label="操作"
              width="320">
            <template slot-scope="scope">
              <el-button @click="trainDataHandleLook(scope.row)" type="primary" size="small" plain icon="el-icon-user">参加培训的人</el-button>
              <el-button type="primary" @click="trainDataHandleEdit(scope.row)" size="small" plain icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" @click="isDelete(scope.$index, trainData)" size="small" plain icon="el-icon-delete">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <div class="footer_page">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :hide-on-single-page="isShowPager"
            :page-size="7"
            :total="totalRows">
        </el-pagination>
      </div>
    </div>
    <template>
      <el-dialog title="培训信息" :visible.sync="trainDataDialogFormVisible" center @close="cancelTrainData">
        <el-form :model="trainDataItem" :rules="trainDataRules" ref="trainDataForm">
          <el-form-item label="培训名称" required label-width="120px" prop="name">
            <el-input type="text" v-model="trainDataItem.name" style="width: 320px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" required label-width="120px" prop="beginDate">
            <el-date-picker
                v-model="trainDataItem.beginDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" required label-width="120px" prop="endDate">
            <el-date-picker
                v-model="trainDataItem.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="培训内容" required label-width="120px" prop="content">
            <el-input type="textarea" v-model="trainDataItem.content" autocomplete="off" style="width: 320px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTrainData">取 消</el-button>
          <el-button type="primary" @click="checkTrainData">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {postRequest,getRequest} from "@/utils/api";
export default {
  name: "PerTrain",
  data: function (){
    return{
      //添加TrainData
      addTrainDataStatus: false,
      trainData:[],
      trainDataItem:{
        name:'',
        beginDate:'',
        endDate:'',
        content:'',
        id:0
      },
      trainDataRules:{
        name:[{ required: true, message: "请输入培训名称", trigger: "blur" }],
        content:[{ required: true, message: "请输入培训内容", trigger: "blur" }],
        beginDate:[{ required: true, message: "请选择培训开始时间", trigger: "blur" }],
        endDate:[{ required: true, message: "请选择培训结束时间", trigger: "blur" }],
      },
      //记录当前使用的URL，方便点击页面的时候使用
      globalUrl:'',
      //是否显示分页
      isShowPager: true,
      //记录总的条数，超过7条显示分页组件
      totalRows: 0,
      //是否显示培训信息修改表单
      trainDataDialogFormVisible:false,
    };
  },
  methods:{
    /****************************  全局变量函数处理区  ***********************************/

    //得到当前全局的url
    strLook(){
      let res = this.globalUrl.indexOf("currentPage")
      return this.globalUrl.substr(0, res);
    },
    // 改变分页时
    handleCurrentChange(val){
      let url =  this.strLook()+"currentPage="+val
      getRequest(url).then(res=>{
        //当前展示的如果培训信息表
        this.trainData = res.obj;
      })
    },
    //是否显示分页组件
    ShowPager(length){
      this.totalRows = length;
      this.isShowPager = length <= 7;
    },
    /**************************************** Train表区 **********************************************/
    //获取所有的培训信息，牵涉分页
    getTrainData(){
      let url = "/personnel/train/trainList?"+"PageSize="+7+"&currentPage="+1
      this.globalUrl = url;
      this.getTrainNums();
      getRequest(url).then(res=>{
        this.trainData = res.obj;
      })
    },
    //获取培训信息的总的记录条数，牵涉分页
    getTrainNums(){
      let url = "/personnel/train/countTrainRowsNum"
      getRequest(url).then(res=>{
        this.ShowPager(res.obj);
      })
    },
    //显示参加指定id培训的记录
    trainDataHandleLook(row) {
      let trainId = row.id;
      return this.$emit("showTrainInfoPage", trainId);
    },
    //点击编辑按钮
    trainDataHandleEdit(row){
      let url = "/personnel/train/selectTrainByPrimaryKey?id="+row.id
      getRequest(url).then(res=>{
        this.trainDataItem = res.obj;
        this.trainDataDialogFormVisible = true;
      })
    },
    //点击添加一条培训信息
    addTrainDataButton(){
      this.addTrainDataStatus = true;
      this.trainDataDialogFormVisible = true;
    },
    //点击对话框的确定按钮,检查表单是否正确填写
    checkTrainData(){
      this.$refs['trainDataForm'].validate((valid) => {
        if(valid){
          //添加操作
          if(this.addTrainDataStatus){
            this.addTrainDataStatus = false;
            this.trainDataDialogFormVisible = false;
            this.insertATrainData();
            //  更新操作
          }else{
            this.updateATrainData();
            this.trainDataDialogFormVisible = false;
          }
        }else{
          this.trainDataDialogFormVisible = true;
        }
      });
    },
    //插入一条记录
    insertATrainData(){
      let url = "/personnel/train/insertATrain"
      postRequest(url,this.trainDataItem).then(res=>{
        let result = res.ok
        if(result === "success"){
          this.showMessage("添加成功", true)
        }
        this.getTrainData();
      })
    },
    //更新一条记录
    updateATrainData(){
      let url = "/personnel/train/updateTrainByPrimaryKeySelective"
      postRequest(url,this.trainDataItem).then(res=>{
        this.getTrainData();
        this.showMessage("更新成功", true)
      })
    },
    //删除一条记录
    deleteATrainData(id){
      let url = "/personnel/train/deleteTrainByPrimaryKey?id="+id;
      postRequest(url).then(res=>{
        this.getTrainData();
      })
    },
    //取消编辑
    cancelTrainData(){
      this.trainDataDialogFormVisible = false;
      this.addTrainDataStatus = false
      this.trainDataItem = {}
      this.$refs['trainDataForm'].resetFields();
    },

    /******************************* 其它函数，公共操作 ***********************************/
    initData(){
      this.getTrainData();
    },
    // 是否删除记录
    isDelete(index, data) {
      let res = false;
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteATrainData(data[index].id)
        data.splice(index, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
      return res;
    },
    //展示信息
    showMessage(message, flag){
      if(flag){
        this.$message({
          message: message,
          type: 'success'
        });
      }else{
        this.$message({
          message: message,
          type: 'error'
        });
      }
    },

  },
  mounted() {
    this.initData();
  }
}

</script>

<style scoped>
.header{
  height: 80px;
  display: flex;
}

.add_row{
  width: 200px;
  height: 78px;
  margin-left: 75%;
}
.main{
  height: 490px;
  margin-top: 10px;
}
.main_table{
  height: 488px;
  width: 95%;
  margin: 0 auto;
}
.footer{
  height: 32px;
  display: flex;
}
.footer_page{
  width: 500px;
  height: 30px;
  margin: 0 auto;
}
</style>