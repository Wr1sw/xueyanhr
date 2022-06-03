<template>
<div>
  <el-table :data="sal" style="width:100%;margin: 0 auto">
    <el-table-column prop="eid" label="工号">
    </el-table-column>
    <el-table-column prop="eName" label="员工名称" width="100px">
    </el-table-column>
    <el-table-column prop="deductSum" label="应扣工资">
    </el-table-column>
    <el-table-column prop="salaryStandardSum" label="应发工资">
    </el-table-column>
    <el-table-column prop="salaryPaidSum" label="实发工资">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="update(scope.row)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "SalSearch",
  data(){
    return{
      loading:false,
      sal:[]
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    update(data){
      console.log(data.salaryGrantId)
      var salary_grant_id = data.salaryGrantId;
      this.postRequest("/salary/sg/update/"+salary_grant_id).then( resp=> {
        if(resp){
          this.init();
        }
      })
    },
    init(){
      this.loading = true;
      this.getRequest("/salary/sg/").then(resp =>{
        this.loading = false;
          if(resp){
            this.sal = resp;
          }
      })

    }
  }
}
</script>

<style scoped>

</style>