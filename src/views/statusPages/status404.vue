<template>
  <el-result title="404" subTitle="抱歉，请求错误">

    <template slot="extra">
      <el-button type="primary" size="medium" @click="goBack">返回首页</el-button>
    </template>
  </el-result>


</template>

<script>
export default {
  name: "status404",
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