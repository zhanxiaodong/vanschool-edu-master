<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <div slot="header">
      <span>审核</span>
    </div>
    <div class="audit-overview-list">
      <el-row
        class="overview-item"
        v-for="n in 6"
        :key="n"
        type="flex"
        align="middle"
      >
        <el-col :sm="{span:20}" :md="{span:21}">
          <div class="overview-content">
            <div class="overview-title">已批准401班 李四（1801888）申请 2018-6-1 8:00 ~ 2018-6-3 18:0 回寝、离校请假。</div>
            <div class="overview-time">09.09 10:21</div>
          </div>
        </el-col>
        <el-col
          :sm="{span:4}" :md="{span:3}"
          class="align-right"
        >
          <el-button type="primary" size="small">通过</el-button>
          <el-button type="danger" size="small">驳回</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "DashboardAuditOverview"
};
</script>
<style lang="scss" scoped>
.overview-item {
  margin: 0.8em 0;
  .align-right {
    text-align: right;
  }
  .overview-content{
    display: flex;
    justify-content: space-between;
  }
}
</style>
