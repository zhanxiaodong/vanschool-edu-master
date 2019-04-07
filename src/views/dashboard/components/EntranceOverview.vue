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
        <p class="chart-title">入学概览</p>
        <v-chart
          :forceFit="true"
          :height="height"
          :data="chartData"
          :scale="scale"
          :padding="{top:0,right:0,bottom:36,left:0}"
        >
          <v-tooltip
            :showTitle="false"
            dataKey="item*percent"
          />
          <v-axis />
          <v-legend dataKey="item" />
          <v-pie
            position="percent"
            color="item"
            :vStyle="pieStyle"
          />
          <v-coord
            type="theta"
            :radius="1"
            :innerRadius="0.6"
          />
        </v-chart>
      </el-col>
      <el-col
        :span="12"
        class="apply-overview-col blue-bg"
      >
        <p><span>今日入学：</span><strong>10</strong><small> 人</small></p>
        <p><span>今日离校：</span><strong>2</strong><small> 人</small></p>
        <p><span>在校人数：</span><strong>999</strong><small> 人</small></p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
const DataSet = require("@antv/data-set");

export default {
  name: "DashboardEntranceOverview",
  data() {
    return {
      data: [
        { item: "入学", count: 10 },
        { item: "离校", count: 2 },
        { item: "在校", count: 999 }
      ],
      scale: [
        {
          dataKey: "percent",
          min: 0,
          formatter: ".0%"
        }
      ],
      height: 130,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "percent",
        {
          formatter: (val, item) => {
            return item.point.item + ": " + val;
          }
        }
      ]
    };
  },
  computed: {
    chartData() {
      const dv = new DataSet.View().source(this.data);
      dv.transform({
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent"
      });
      return dv.rows;
    }
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
