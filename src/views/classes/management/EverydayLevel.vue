<template>
  <div class="classes-everyday-level">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-select v-model="course">
          <el-option
            value="语文"
            label="语文"
          />
          <el-option
            value="数学"
            label="数学"
          />
        </el-select>
      </el-col>
      <el-col
        :span="19"
        style="text-align:right;"
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
      :height="400"
      :data="chartData"
      :scale="scale"
    >
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-smooth-line
        position="datetime*temperature"
        color="city"
        shape="smooth"
      />
      <v-point
        position="datetime*temperature"
        color="city"
        shape="circle"
      />
    </v-chart>
    <el-table
      v-else
      :data="tableData"
    >
      <el-table-column
        prop="datetime"
        label="时间"
        align="center"
      />
      <el-table-column
        prop="score"
        label="成绩/百分制"
        align="center"
      />
      <el-table-column
        prop="average"
        label="平均分"
        align="center"
      />
      <el-table-column
        prop="ranking"
        label="排名"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");
export default {
  name: "ClassesEverydayLevel",
  data() {
    return {
      course: "语文",
      statsType: "chart",
      tableData: [
        {
          datetime: "2018/06/01",
          score: "80",
          average: "81",
          ranking: "51"
        },
        {
          datetime: "2018/06/07",
          score: "85",
          average: "83",
          ranking: "60"
        },
        {
          datetime: "2018/06/14",
          score: "93",
          average: "86",
          ranking: "15"
        },
        {
          datetime: "2018/06/21",
          score: "98",
          average: "86",
          ranking: "10"
        },
        {
          datetime: "2018/06/28",
          score: "75",
          average: "80",
          ranking: "30"
        }
      ],
      shouldRenderChart: false,
      scale: [
        {
          dataKey: "date",
          min: 0,
          max: 1
        }
      ]
    };
  },
  computed: {
    chartData() {
      const dv = new DataSet.View().source(this.tableData);
      dv.transform({
        type: "fold",
        fields: ["score", "average"],
        key: "city",
        value: "temperature"
      });
      return dv.rows;
    }
  }
};
</script>