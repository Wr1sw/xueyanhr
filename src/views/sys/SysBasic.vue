<template>
<div>
  基础信息设置
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="部门管理" name="depmana"><DepMana></DepMana></el-tab-pane>
    <el-tab-pane label="职位管理" name="posmana"><PosMana></PosMana></el-tab-pane>
    <el-tab-pane label="职称管理" name="jobmana"><JobMana></JobMana></el-tab-pane>
    <el-tab-pane label="奖惩规则" name="rpmana"><RpMana></RpMana></el-tab-pane>
<!--    <el-tab-pane label="kpi规则" name="kpimana"><KpiMana></KpiMana></el-tab-pane>-->
    <el-tab-pane label="权限组" name="permana"><PerMana></PerMana></el-tab-pane>
    <el-tab-pane label="培训内容管理" name="tramana"><TraMana></TraMana></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
  import DepMana from '../../components/sysbasic/department'
  import PosMana from '../../components/sysbasic/position'
  import JobMana from '../../components/sysbasic/joblevel'
  import RpMana from '../../components/sysbasic/rp'
  // import KpiMana from '../../components/kpiscore'
  import PerMana from '../../components/sysbasic/permiss'
  import TraMana from '../../components/sysbasic/train'

  export default {
    name: "SysBasic",
    data(){
      return{
        activeName: 'depmana'
      }
    },
    components:{
      DepMana,
      PosMana,
      JobMana,
      RpMana,
      // KpiMana,
      PerMana,
      TraMana
    }
}
</script>

<style scoped>

</style>