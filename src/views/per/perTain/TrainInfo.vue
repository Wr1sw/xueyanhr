<template>
  <div>
    <div class="header">
      <div class="input_form">
        <el-form :inline="true" :model="searchItem">
          <el-form-item label="培训">
            <el-select v-model="searchItem.trainId" placeholder="请选择">
              <el-option
                  v-for="item in trainData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="searchItem.departId" placeholder="请选择">
              <el-option
                  v-for="item in departList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" >
            <el-select v-model="searchItem.eid" placeholder="请选择">
              <el-option
                  v-for="item in employeeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_row">
        <el-button type="primary"  @click="addTrainInfoButton" icon="el-icon-plus" >添加参训人员</el-button>
      </div>
    </div>
    <div class="main">
      <div class="main_table">
        <el-table
            :data="trainInfo"
            stripe
            style="width: 100%; text-align: center">
          <el-table-column
              style="text-align: center"
              prop="id"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="trainName"
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
              prop="empName"
              label="参加人"
              width="120">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="departName"
              label="所属部门"
              width="200">
          </el-table-column>
          <el-table-column
              style="text-align: center"
              prop="remark"
              label="评论"
              width="200">
          </el-table-column>
          <el-table-column
              label="操作"
              width="200">
            <template slot-scope="scope">
              <el-button @click="trainInfoHandleEdit(scope.row)" type="primary" size="small" plain icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" size="small" @click="isDelete(scope.$index, trainInfo)" plain icon="el-icon-delete">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <div style="height: 30px; width: 180px; margin-left: 100px">
        <el-button type="success" plain  @click="returnToTrainData" icon="el-icon-d-arrow-left">返回</el-button>
      </div>
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
      <el-dialog title="培训记录" :visible.sync="trainInfoDialogFormVisible" center>
        <el-form :model="trainInfoItem" :rules="trainInfoRules" ref="trainInfoForm">
          <el-form-item label="培训名称" label-width="120px">
            <el-input type="text" v-model="trainInfoItem.trainName" style="width: 320px" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参训人员工号" label-width="120px">
            <el-input type="text" v-model="trainInfoItem.eid" style="width: 320px" disabled  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参训人员" label-width="120px">
            <el-input type="text" v-model="trainInfoItem.empName" style="width: 320px" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" label-width="120px">
            <el-date-picker
                v-model="trainInfoItem.beginDate"
                type="date"
                disabled
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" label-width="120px">
            <el-date-picker
                v-model="trainInfoItem.endDate"
                type="date"
                disabled
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="培训内容" label-width="120px">
            <el-input type="text" v-model="trainInfoItem.content" disabled autocomplete="off" style="width: 320px"></el-input>
          </el-form-item>
          <el-form-item label="评论" label-width="120px" prop="remark">
            <el-input type="textarea" v-model="trainInfoItem.remark" autocomplete="off" style="width: 320px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTrainInfo">取 消</el-button>
          <el-button type="primary" @click="checkTrainInfo">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog tile="添加培训人" :visible.sync="addEmployeeTrain" center>
        <el-form :model="employeeTrain"  ref="employeeTrainForm">
          <el-form-item label="培训名称"  label-width="120px">
            <el-select v-model="employeeTrain.trainId" placeholder="请选择">
              <el-option
                  v-for="item in trainData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参训人员"  label-width="120px">
            <el-table
                :data="employeeList"
                style="width: 100%"
                ref="multipleTable"
                tooltip-effect="dark"
                height="200"
                @selection-change="selectWorker">
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  prop="workid"
                  label="员工工号"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="员工名称"
                  width="200">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEmployeeTrain=false">取 消</el-button>
          <el-button type="primary" @click="submitEmployeeTrain">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {postRequest,getRequest} from "@/utils/api";
export default {
  name: "PerTrainInfo",
  data: function (){
    return{
      //搜索表单
      searchItem:{
        trainId:'',
        departId:'',
        eid:'',
      },
      //添加培训记录
      addEmployeeTrain:false,
      //部门list
      departList:[],
      //培训信息list
      trainData:[],
      //培训记录list
      trainInfo:[],
      trainInfoItem:{},
      employeeTrain:{
        trainId:''
      },
      employeeList:[],
      trainInfoRules:{content:[{ required: true, message: "请输入评论内容", trigger: "blur" }],},
      //记录当前使用的URL，方便点击页面的时候使用
      globalUrl:'',
      //是否显示分页
      isShowPager: true,
      //记录总的条数，超过7条显示分页组件
      totalRows: 0,
      //是否显示培训记录修改表单
      trainInfoDialogFormVisible:false,
      multipleSelection: []
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
        this.trainInfo = res.obj;
      })
    },
    //是否显示分页组件
    ShowPager(length){
      this.totalRows = length;
      this.isShowPager = length <= 7;
    },
    /************************************* 顶部搜索区 ********************************************/
    //点击提交表单
    onSubmit(){
      let url = "/personnel/train/trainInfoByEntity?trainId="+this.searchItem.trainId
          +"&departId="+this.searchItem.departId
          +"&eid="+this.searchItem.eid+"&PageSize="+7+"&currentPage="+1
      this.globalUrl = url;
      this.getSearchNums();
      postRequest(url).then(res=>{
        this.trainInfo = res.obj;
      })
    },

    getSearchNums(){
      let countUrl = "/personnel/train/countTrainInfoRowByEntity?trainId="+this.searchItem.trainId
          +"&departId="+this.searchItem.departId
          +"&eid="+this.searchItem.eid
      getRequest(countUrl).then(res=>{
        this.ShowPager(res.obj)
      })
    },

    /***************************************** TrainInfo表区 *******************************************/
    //显示指定TrainID有哪些人参加
    getTrainInfo(id){
        let url = "/personnel/train/trainInfoListByTrainId?trainId="+id+"&PageSize=7&currentPage="+1;
        let countUrl = "/personnel/train/countTrainInfoRowByEntity?trainId="+id;
        this.globalUrl = url;
        this.getTrainInfoNums(countUrl);
        getRequest(url).then(res=>{
          this.trainInfo = res.obj;
        })
    },
    //获取指定url培训记录总条数， 牵涉分页
    getTrainInfoNums(url){
      getRequest(url).then(res=>{
        this.ShowPager(res.obj);
      })
    },
    addTrainInfoButton(){
      this.addEmployeeTrain = true;
    },
    //从展示培训记录返回到展示培训信息
    returnToTrainData(){
      return this.$emit("showTrainDataPage");
    },
    //点击编辑
    trainInfoHandleEdit(row){
      let url = "/personnel/train/trainInfoById?id="+row.id
      getRequest(url).then(res=>{
        this.trainInfoItem = res.obj;
        this.trainInfoDialogFormVisible = true;
      })
    },
    checkTrainInfo(){
      this.$refs['trainInfoForm'].validate((valid) => {
        if(valid) {
          this.updateATrainInfo();
          this.trainInfoDialogFormVisible = false;
        }
      });
    },
    //点击对话框的确定，更新培训记录表
    updateATrainInfo(){
      let id = this.trainInfoItem.id;
      let remark = this.trainInfoItem.remark;
      let trainId = this.trainInfoItem.trainId;
      let url = "/personnel/train/updateTrainInfoByPrimaryKey?id="+id+"&remark="+remark
      this.trainInfoItem = {}
      this.$refs['trainInfoForm'].resetFields();
      postRequest(url).then(res=>{
        this.getTrainInfo(trainId);
      })
    },
    //对话框点击取消
    cancelTrainInfo(){
      this.trainInfoDialogFormVisible = false;
      this.trainInfoItem = {}
      this.$refs['trainInfoForm'].resetFields();
    },
    //获取员工列表
    getEmployeeList(){
      getRequest("/personnel/train/employeeList").then(res=>{
        this.employeeList = res.obj;
      })
    },
    //挑选员工
    selectWorker(val){
      this.multipleSelection = val
    },
    //提交表单
    submitEmployeeTrain(){
      if(this.checkEmployeeTrain()){
        this.addEmployeeTrain=false
        let trainId = this.employeeTrain.trainId;
        this.employeeTrain.trainId = '';
        let url = "/personnel/train/insertATrainInfo?id="+trainId;
        let data = this.multipleSelection;
        this.multipleSelection = [];
        postRequest(url, data).then(res=>{
          this.getTrainInfo(trainId);
        })
      }
    },
    //表单验证
    checkEmployeeTrain(){
      let length = this.multipleSelection.length;
      if(this.employeeTrain.trainId === ''){
        this.showMessage("请选择培训项目", false)
        this.addEmployeeTrain = true;
        return false;
      }else if (length < 1){
        this.showMessage("请选择参加训练的员工", false)
        this.addEmployeeTrain = true;
        return false;
      }else {
        return true;
      }
    },
    //删除一条记录
    deleteById(id, trainId){
      let url = "/personnel/train/deleteTrainInfoByPrimaryKey?id="+id
      postRequest(url).then(res=>{
        this.getTrainInfo(trainId);
      })
    },
    /******************************* 其它函数，公共操作 ***********************************/
    //获取部门list
    getDepartList(){
      getRequest("/personnel/emp/depList").then(res=>{
        this.departList = res.obj;
      })
    },
    //获取所有的培训列表
    getAllTrainList(){
      getRequest("/personnel/train/allTrainList").then(res=>{
        this.trainData = res.obj;
      })
    },
    initData(){
      this.getDepartList();
      this.getEmployeeList();
      this.getAllTrainList();
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
        let id = data[index].id;
        let trainId = data[index].trainId;
        this.deleteById(id, trainId);
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
.input_form{
  width: 75%;
  height: 78px;
  margin: 0 auto;
}
.add_row{
  width: 20%;
  height: 78px;
  /*margin: 0 auto;*/
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