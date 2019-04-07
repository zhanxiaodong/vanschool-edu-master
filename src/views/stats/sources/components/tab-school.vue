<template>
  <div class="stats-sources-school">
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
    <v-chart
      v-if="statsType === 'chart'"
      :forceFit="true"
      :height="height"
      :data="chartData"
      :scale="scale"
    >
      <v-tooltip
        :showTitle="false"
        dataKey="school*percent"
      />
      <v-axis />
      <v-legend
        dataKey="school"
        :offsetY="16"
      />
      <v-pie
        position="percent"
        color="school"
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
          prop="school"
          label="原学校"
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
  name: "StatsSourcesSchool",
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          school: "未知",
          number: 10
        },
        {
          school: "丽州高级中学",
          number: 12
        },
        {
          school: "义乌市第六中学",
          number: 7
        },
        {
          school: "义乌市群星外国语学校",
          number: 32
        },
        {
          school: "余杭实验中学",
          number: 7
        },
        {
          school: "兰荫中学",
          number: 32
        },
        {
          school: "华中",
          number: 1
        },
        {
          school: "台州双语实验中学",
          number: 5
        },
        {
          school: "台州实验中学",
          number: 2
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
            return item.point.school + ": " + val;
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
        dimension: "school",
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
