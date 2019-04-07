<template>
  <div class="stats-sources-score">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="12">
        <el-button
          type="primary"
          size="small"
        >导出数据</el-button>
      </el-col>
      <el-col
        :span="12"
        style="text-align:right"
      >
        <el-radio-group
          v-model="statsType"
          size="small"
        >
          <el-radio-button label="chart">图示</el-radio-button>
          <el-radio-button label="table">详表</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div
      v-if="statsType === 'table'"
      class="table-container"
    >
      <el-table :data="list">
        <el-table-column
          prop="item"
          label="专业"
          align="center"
        />
        <el-table-column
          prop="count"
          label="人数"
          align="center"
        />
      </el-table>
    </div>
    <v-chart
      v-else
      :forceFit="true"
      :height="height"
      :data="chartData"
      :scale="scale"
    >
      <v-tooltip
        :showTitle="false"
        dataKey="item*percent"
      />
      <v-axis />
      <v-legend
        dataKey="item"
        :offsetY="16"
      />
      <v-pie
        position="percent"
        color="item"
        :v-style="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");

export default {
  name: "StatsSourcesProfession",
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        { item: "体育", count: 0.12 },
        { item: "其他", count: 1.23 },
        { item: "播音主持", count: 1.11 },
        { item: "纯文化生", count: 0.49 },
        { item: "美术", count: 91.25 },
        { item: "舞蹈", count: 1.36 },
        { item: "音乐", count: 4.44 }
      ],
      statsType: "chart",
      scale: [
        {
          dataKey: "percent",
          min: 0,
          formatter: val => `${(val * 100).toFixed(2)}%`
        }
      ],
      height: 460,
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
      const dv = new DataSet.View().source(this.list);
      dv.transform({
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent"
      });
      return dv.rows;
    }
  },
  methods: {
    onSearch() {}
  }
};
</script>
