<template>
  <div class="stats-sources-hometown">
    <el-row type="flex" class="simple-search-bar">
      <el-col :span="12">
        <el-button
          type="primary"
          size="small"
        >导出数据</el-button>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-radio-group
          v-model="statsType"
          size="small"
        >
          <el-radio-button label="chart">图示</el-radio-button>
          <el-radio-button label="table">详表</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <v-chart
      v-if="statsType === 'chart'"
      :forceFit="true"
      :height="height"
      :data="chartData"
      :scale="scale"
    >
      <v-tooltip
        :showTitle="false"
        dataKey="hometown*percent"
      />
      <v-axis />
      <v-legend dataKey="hometown" :offsetY="16"/>
      <v-pie
        position="percent"
        color="hometown"
        :v-style="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" />
    </v-chart>
    <div
      v-else
      class="table-container"
    >
      <el-table :data="list">
        <el-table-column
          prop="hometown"
          label="籍贯"
        />
        <el-table-column
          prop="number"
          label="人数"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");

export default {
  name: "StatsSourcesHometown",
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          hometown: "未知",
          number: 10
        },
        {
          hometown: "义乌",
          number: 12
        },
        {
          hometown: "杭州",
          number: 7
        },
        {
          hometown: "温州",
          number: 32
        },
        {
          hometown: "南京",
          number: 16
        },{
          hometown: "宁波",
          number: 21
        }
      ],
      statsType: "chart",
      shouldRenderChart: false,
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
            return item.point.hometown + ": " + val;
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
        field: "number",
        dimension: "hometown",
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
