<template>
<div>
  <div>
    <el-table :data="emps" border stripe size="mini">
      <el-table-column type="selection" align="left" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" fixed width="120" align="left"></el-table-column>
      <el-table-column prop="workid" label="工号"  width="120" align="left"></el-table-column>
      <el-table-column prop="email" label="电子邮件"  width="200" align="left"></el-table-column>
      <el-table-column prop="phone" label="电话号码"  width="120" align="left"></el-table-column>
      <el-table-column label="所属账套" align="center">
        <template slot-scope="scope">
          <el-tooltip placement="right" v-if="scope.row.salaryStandardDetails">
            <div slot="content">
              <table>
                <tr>
                  <td>基本工资</td>
                  <td>{{scope.row.salaryStandardDetails.basicSalary}}</td>
                </tr>
                <tr>
                  <td>交通补助</td>
                  <td>{{scope.row.salaryStandardDetails.trafficSalary}}</td>
                </tr>
                <tr>
                  <td>午餐补助</td>
                  <td>{{scope.row.salaryStandardDetails.lunchSalary}}</td>
                </tr>
                <tr>
                  <td>养老金比率</td>
                  <td>{{scope.row.salaryStandardDetails.pensionPer}}</td>
                </tr>
                <tr>
                  <td>养老金基数</td>
                  <td>{{scope.row.salaryStandardDetails.pensionBase}}</td>
                </tr>
                <tr>
                  <td>医疗保险比率</td>
                  <td>{{scope.row.salaryStandardDetails.medicalPer}}</td>
                </tr>
                <tr>
                  <td>医疗保险基数</td>
                  <td>{{scope.row.salaryStandardDetails.medicalBase}}</td>
                </tr>
                <tr>
                  <td>公积金比率</td>
                  <td>{{scope.row.salaryStandardDetails.accumulationFundPer}}</td>
                </tr>
                <tr>
                  <td>公积金基数</td>
                  <td>{{scope.row.salaryStandardDetails.accumulationFundBase}}</td>
                </tr>
                <tr>
                  <td>启用时间</td>
                  <td>{{scope.row.salaryStandardDetails.createDate}}</td>
                </tr>
              </table>
            </div>
              <el-tag>{{scope.row.salaryStandardDetails.standardName}}</el-tag>
          </el-tooltip>
          <el-tag v-else>尚未设置</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popover
              placement="bottom"
              title="修改工资账套"
              @show="showPop(scope.row.salaryStandardDetails)"
              @hide="hidePop(scope.row)"
              width="200"
              trigger="click">
            <div>
              <el-select v-model="curSalary" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in salaries"
                    :key="item.ssdId"
                    :label="item.standardName"
                    :value="item.ssdId">
                </el-option>
              </el-select>
            </div>
            <el-button slot="reference" type="danger">修改账套</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SalSobCfg",
  data(){
    return {
      emps:[],
      total:0,
      curPage:1,
      curSize:13,
      salaries:[],
      curSalary:null,
      tempSalary:null
    }
  },
  mounted() {
    this.initEmps();
    this.initSalaries();
  },
  methods:{
    initEmps(){
      this.getRequest("/salary/sobcfg/?page="+this.curPage+'&size='+this.curSize).then(resp=>{
        if (resp) {
          this.emps = resp.data;
          this.total=resp.total
        }
      })
    },
    initSalaries() {
      this.getRequest("/salary/sobcfg/salaries").then(resp=>{
        if (resp) {
          this.salaries = resp;
        }
      })
    },
    showPop(data) {
      if (data) {
        this.curSalary = data.sdtId;
        console.log(this.curSalary)
      } else {
        this.curSalary = null;
      }
      this.tempSalary = this.curSalary;
    },
    hidePop(data) {
      if (this.curSalary && (this.curSalary !== this.tempSalary)) {
        console.log("=>>")
        console.log(this.curSalary)
        console.log("=>>")
        console.log(this.tempSalary)
        this.putRequest('/salary/sobcfg/?eid='+data.id+'&sid='+this.curSalary).then(resp=>{
          if (resp) {
            // refresh data
            this.initEmps();
          }
        })
      }
    },
    currentChange(page) {
      this.curPage = page;
      this.initEmps();
    },
    sizeChange(size) {
      this.curSize = size;
      this.initEmps();
    }
  }
}
</script>

<style scoped>

</style>