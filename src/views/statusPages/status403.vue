<template>
  <el-result title="403" subTitle="权限不足，请联系管理员">
   <template slot="extra">
      <el-button type="primary" size="medium" @click="goBack">返回首页</el-button>
    </template>


  </el-result>
</template>

<script>
export default {
  name: "status403",
  data() {
    return {
        }
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    }
  }
}
</script>
<style>
</style>