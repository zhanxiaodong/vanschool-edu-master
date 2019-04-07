<template>
  <el-card
    class="card-style"
    shadow="never"
    :body-style="{padding:0}"
  >
    <el-row type="flex">
      <el-col
        :span="12"
        class="apply-overview-col"
      >
        <p class="chart-title">报名概览</p>
        <v-chart
          :forceFit="true"
          :height="height"
          :data="data"
          :scale="scale"
          padding="0"
        >
          <v-tooltip />
          <v-axis />
          <v-bar position="year*sales" />
        </v-chart>
      </el-col>
      <el-col
        :span="12"
        class="apply-overview-col blue-bg"
      >
        <p><span>今日报名：</span><strong>10</strong><small> 人</small></p>
        <p><span>今日退报名：</span><strong>2</strong><small> 人</small></p>
        <p><span>累计报名：</span><strong>999</strong><small> 人</small></p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
const data = [
  { year: "1951 年", sales: 38 },
  { year: "1952 年", sales: 52 },
  { year: "1956 年", sales: 61 },
  { year: "1957 年", sales: 145 },
  { year: "1958 年", sales: 48 },
  { year: "1959 年", sales: 38 },
  { year: "1960 年", sales: 38 },
  { year: "1962 年", sales: 58 },
  { year: "1962 年", sales: 138 },
  { year: "1962 年", sales: 28 },
  { year: "1962 年", sales: 68 }
];

const scale = [
  {
    dataKey: "sales",
    tickInterval: 20
  }
];
export default {
  name: "DashboardApplyOverview",
  data() {
    return {
      data,
      scale,
      height: 120
    };
  }
};
</script>
<style lang="scss" scoped>
.apply-overview-col {
  padding: 20px 20px 10px 20px;
  .chart-title {
    margin: 0;
  }
}
.blue-bg {
  background-color: #f9faff;
}
</style>
