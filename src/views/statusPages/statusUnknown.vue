<template>
  <el-result title="Unknown" subTitle="管理员正在加速开发中......">
    <template slot="extra">
      <el-button type="primary" size="medium" @click="goBack">返回首页</el-button>
    </template>


  </el-result>
</template>

<script>
export default {
  name: "statusUnknown",
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