<template>
<div>
  <el-table :data="approval" border stripe>
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column width="220" prop="standardId" label="账套标准编号"></el-table-column>
    <el-table-column width="220" prop="standardName" label="账套标准名称"></el-table-column>
    <el-table-column width="220" prop="designer" label="制订人"></el-table-column>
    <el-table-column width="300" prop="registTime" label="启用时间"></el-table-column>
    <el-table-column width="80" prop="salarySum" label="总额"></el-table-column>
    <el-table-column label="复核">
      <template slot-scope="scope">
        <el-button type="danger" round @click="doApproval(scope.row)">复核</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="80%">
    <div>
      <el-form :model="standerDetailandStander" :rules="rules" ref="approveForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="薪酬编号:" prop="standardId">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.standardId" placeholder="请输入薪酬编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪酬标准名称:" prop="standardName">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-message" readonly
                        v-model="standerDetailandStander.standardName" placeholder="请输入薪酬标准名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪酬总额:" prop="salarySum">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.salarySum" placeholder="请输入薪酬总额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="制订人:" prop="designer">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.designer" placeholder="请输入制订人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核人:" prop="checker" >
              <el-input size="mini"
                        style="width: 220px"
                        prefix-icon="el-icon-message"
                        v-model="standerDetailandStander.checker"
                        placeholder="请输入复核人">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间:" prop="registTime">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.registTime" placeholder="请输入薪酬复核时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="基本工资" prop="basicSalary">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.basicSalary" placeholder="请输入基本工资"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="午餐补助:" prop="lunchSalary">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-message" readonly
                        v-model="standerDetailandStander.lunchSalary" placeholder="请输入午餐补助"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交通补助" prop="trafficSalary">
              <el-input size="mini" style="width: 220px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.trafficSalary" placeholder="请输入交通补助"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="养老金基数" prop="pensionBase">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.pensionBase" placeholder="请输入养老金基数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="养老金比率" prop="pensionPer">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-message" readonly
                        v-model="standerDetailandStander.pensionPer" placeholder="请输入养老金比率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医疗保险" prop="medicalBase">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.medicalBase" placeholder="请输入医疗保险"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="医疗比率" prop="medicalPer">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.medicalPer" placeholder="请输入医疗比率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公积金" prop="accumulationfundBase">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.medicalPer" placeholder="请输入公积金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公积金比率" prop="accumulationfundPer">
              <el-input size="mini" style="width: 80px" prefix-icon="el-icon-edit" readonly
                        v-model="standerDetailandStander.medicalPer" placeholder="请输入公积金比率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="复核意见:" prop="checkComment">
              <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="standerDetailandStander.checkComment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" round @click="doReject">取 消</el-button>
    <el-button type="success" round @click="doPass">通 过</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "SalMonth",
  data() {
    return {
      dialogTitle:'复核',
      dialogVisible: false,
      approval:[],
      standerDetailandStander:{
        standardId:1,
        standardName:"123",
        basicSalary:1,
        lunchSalary:1,
        trafficSalary:0,
        allSalary:0,
        pensionBase:0,
        pensionPer:0,
        medicalBase:0,
        medicalPer:0,
        accumulationfundBase:0,
        accumulationfundPer:0,
        checkComment:'',
        checkStatus:'0'
      },
      rules: {
        checkComment:[{require: true, message: '请输入复核意见', trigger: 'blur'}],
        checker: [{required: true, message: '请输入复核人', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    this.initApproval();
  },
  methods: {
    doReject() {

    },
    doPass(){
        this.$refs['approveForm'].validate(valid => {
          if (valid) {
            this.standerDetailandStander.checkStatus = '1';
            this.postRequest("/salary/approval/", this.standerDetailandStander).then(resp => {
              if (resp) {
                console.log(resp)
                this.dialogVisible = false;
                this.initApproval();
              }
            })

          }
        });
    },
    doApproval(data) {
      console.log(data)
      this.getRequest("/salary/approval/standard-details?standardId="+data.standardId).then(resp=>{
        if (resp) {
          this.dialogVisible = true;
          this.standerDetailandStander = resp.data;
          this.standerDetailandStander.ssdId = data.ssdId;
          this.standerDetailandStander.salarySum = data.salarySum;
          this.standerDetailandStander.designer = data.designer;
          this.standerDetailandStander.registTime = data.registTime;
          console.log(this.standerDetailandStander)
        }
      })

    },
    initApproval() {
      this.getRequest("/salary/approval/").then(resp=>{
        if (resp) {
          this.approval = resp;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>