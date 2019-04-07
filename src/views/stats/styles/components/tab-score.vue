<template>
  <div class="stats-styles-score">
    <el-row type="flex" align="top">
      <el-col :span="12">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-radio-group v-model="statsType">
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
          prop="class"
          label="班级"
        />
        <el-table-column
          prop="original"
          label="起始血量"
        />
        <el-table-column
          prop="deduction"
          label="纪律扣分总计"
        />
        <el-table-column
          prop="remained"
          label="剩余血量"
        />
        <el-table-column
          prop="ranking"
          label="排名"
        />
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="onSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "StatsStylesScore",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        date: { label: "时间段", type: "daterange", col: 18 }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          class: "401",
          original: 100,
          remained: 80,
          deduction: 20,
          ranking: 2
        },
        {
          class: "402",
          original: 100,
          remained: 94,
          deduction: 16,
          ranking: 1
        },
        {
          class: "403",
          original: 100,
          remained: 74,
          deduction: 26,
          ranking: 3
        },
        {
          class: "404",
          original: 100,
          remained: 70,
          deduction: 30,
          ranking: 4
        },
        {
          class: "405",
          original: 100,
          remained: 68,
          deduction: 32,
          ranking: 5
        }
      ],
      statsType: "table"
    };
  },
  computed: {
    chartdata() {
      return {
        labels: this.list.map(v => v.class),
        datasets: [
          {
            label: "纪律扣分",
            backgroundColor: "#FFCC47",
            data: this.list.map(v => v.deduction)
          }
        ]
      };
    }
  },
  methods: {
    onSearch() {}
  }
};
</script>
