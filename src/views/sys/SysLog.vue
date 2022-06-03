<template>
<div>
  <div class="LogManaMain">
    <el-table
            :data="logs"
            border
            @selection-change="handleSelectionChange"
            size="small"
            stripe
            style="width: 70%">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column
              prop="id"
              label="编号"
              width="55">
      </el-table-column>
      <el-table-column
              prop="operate"
              label="操作内容"
              width="130">
      </el-table-column>
      <el-table-column
              prop="adddate"
              width="150"
              label="操作时间">
      </el-table-column>
      <el-table-column
              prop="model"
              width="150"
              label="操作模块">
      </el-table-column>
      <el-table-column
              prop="username"
              width="100"
              label="操作员">
      </el-table-column>
      <el-table-column
              prop="result"
              width="100"
              label="操作结果">
      </el-table-column>
      <el-table-column
              prop="hrid"
              width="80"
              label="HrId">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px"
               :disabled="multipleSelection.length==0">批量删除
    </el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "SysLog",
  data(){
    return{
      log:{

      },
      loading: false,
      multipleSelection: [],
      logs: []
    }
  },
  mounted() {
    this.initLog();
  },
  methods:{
    deleteMany() {
      this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest("/Oplog/" + ids).then(resp => {
          if (resp) {
            this.initLog();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除【' + data.name + '】记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/Oplog/" + data.id).then(resp => {
          if (resp) {
            this.initLog();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initLog(){
      this.loading = true;
      this.getRequest("/Oplog/").then(resp =>{
        this.loading = false;
        if (resp){
          this.logs = resp;
        }
      })
    }
  }
}
</script>

<style scoped>
  .addLogInput {
    width: 300px;
    margin-right: 8px
  }

  .updateLogInput {
    width: 200px;
    margin-left: 8px;
  }

  .LogManaMain {
    margin-top: 10px;
  }
</style>