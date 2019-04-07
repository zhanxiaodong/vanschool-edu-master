<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <div slot="header">
      <span>通知</span>
    </div>
    <el-row class="notice-item" :gutter="24" v-for="n in 6" :key="n">
      <el-col :span="20">已批准张三（数学老师）申请 2018-8-31 第2节数学，第3节数学，与李四（数学老师）2018-9-1 第5节语文，第6节语文 换课。</el-col>
      <el-col :span="4" class="align-right">09.09 10:21</el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "DashboardNoticeOverview"
};
</script>
<style lang="scss" scoped>
.notice-item{
   margin: 1.2em 0;
  .align-right {
    text-align: right;
  }
}
</style>
