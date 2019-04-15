<template>
  <div class="entrance-data">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="8">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        >
        </el-date-picker>
      </el-col>
       <el-col
        :span="19"
        style="text-align:right;"
      >
        <el-radio-group
          v-model="statsType"
          size="small"
        >
          <el-radio-button label="table">详表</el-radio-button>
          <el-radio-button label="chart">图示</el-radio-button>
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
          label="状态"
          align="center"
        />
        <el-table-column
          prop="count"
          label="人数"
          align="center"
        />
      </el-table>
    </div>
    <!-- <div
      v-if="statsType === 'table'"
      class="table-container"
    >
    <el-table
      :data="tableData6"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="已邀约"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="已面谈"
      >
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="已入学"
      >
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="待入学"
      >
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="待面谈"
      >
      </el-table-column>
      <el-table-column
        prop="amount4"
        label="待邀约"
      >
      </el-table-column>
      <el-table-column
        prop="amount5"
        label="待分配"
      >
      </el-table-column>
    </el-table>
   </div> -->
   <v-chart
      v-else
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
  </div>
</template>


<script>
const DataSet = require("@antv/data-set");
export default {
  name: "EntranceData",
  data() {
    return {
      daterange: "",
      list: [
        { item: "已邀约", count: 222 },
        { item: "已面谈", count: 111 },
        { item: "已入学", count: 55 },
        { item: "待面谈", count: 44 },
        { item: "待邀约", count: 25 },
        { item: "待分配", count: 36 }

        // {
        //   id: "12987123",
        //   name: "王小虎",
        //   amount1: "165",
        //   amount2: "4.43",
        //   amount3: 12
        // },
        // {
        //   id: "12987124",
        //   name: "王小虎",
        //   amount1: "324",
        //   amount2: "1.9",
        //   amount3: 9
        // },
        // {
        //   id: "12987125",
        //   name: "王小虎",
        //   amount1: "621",
        //   amount2: "2.2",
        //   amount3: 17
        // },
        // {
        //   id: "12987126",
        //   name: "王小虎",
        //   amount1: "539",
        //   amount2: "4.1",
        //   amount3: 15
        // }
      ],
      statsType: "table",
      // shouldRenderChart: false,
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
        dimension: "EntranceData",
        as: "percent"
      });
      return dv.rows;
    }
  },
  methods: {
    // eslint-disable-next-line 
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex % 2 === 0) {
    //     if (columnIndex === 0) {
    //       return [1, 1];
    //     }
    //     // else if (columnIndex === 1) {
    //     //   return [0, 0];
    //     // }
    //   }
    // }
  }
};
</script>