<template>
  <div class="all-students-data">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月份"
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
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="enrolled"
          label="报名"
        />
        <el-table-column
          prop="entered"
          label="入学"
        />
        <el-table-column
          prop="left"
          label="退学"
        />
        <el-table-column
          prop="closed"
          label="结业"
        />
        <el-table-column
          prop="replaced"
          label="换班"
        />
        <el-table-column
          prop="present"
          label="在读"
        />
        <el-table-column label="留存率">
          <template slot-scope="scope">{{ scope.row.ratio * 100 + '%' }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "AllStudents",
  data() {
    return {
      month: "",
      total: 30,
      list: [
        {
          date: "1.1",
          enrolled: 10,
          entered: 8,
          left: 4,
          closed: 2,
          replaced: 1,
          present: 100,
          ratio: 0.94
        },
        {
          date: "1.2",
          enrolled: 9,
          entered: 7,
          left: 3,
          closed: 1,
          replaced: 2,
          present: 112,
          ratio: 0.92
        },
        {
          date: "1.3",
          enrolled: 14,
          entered: 9,
          left: 0,
          closed: 2,
          replaced: 4,
          present: 120,
          ratio: 0.95
        },
        {
          date: "1.4",
          enrolled: 14,
          entered: 10,
          left: 4,
          closed: 0,
          replaced: 0,
          present: 120,
          ratio: 0.88
        }
      ],
      statsType: "table"
    };
  },
  computed: {
    chartdata() {
      return {
        labels: this.list.map(v => v.date),
        datasets: [
          {
            type: "line",
            label: "留存率",
            borderColor: "#113654",
            fill: false,
            data: this.list.map(v => v.ratio * 100)
          },
          {
            type: "bar",
            label: "报名",
            backgroundColor: "#409EFF",
            data: this.list.map(v => v.enrolled)
          },
          {
            type: "bar",
            label: "入学",
            backgroundColor: "#00CB99",
            data: this.list.map(v => v.entered)
          },
          {
            type: "bar",
            label: "结业",
            backgroundColor: "#FFCC47",
            data: this.list.map(v => v.closed)
          },
          {
            type: "bar",
            label: "退学",
            backgroundColor: "#E65D6E",
            data: this.list.map(v => v.left)
          },
          {
            type: "bar",
            label: "换班",
            backgroundColor: "#eb2f96",
            data: this.list.map(v => v.replaced)
          },
          {
            type: "bar",
            label: "在读",
            backgroundColor: "#13c2c2",
            data: this.list.map(v => v.present)
          }
        ]
      };
    }
  },
  methods: {
    handleClick(row) {
      window.console.log(row);
    }
  }
};
</script>
