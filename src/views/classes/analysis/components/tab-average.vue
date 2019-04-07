<template>
  <div class="analysis-daily">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column label="班级">
          <template slot-scope="scope">
            {{ scope.row.isGrade ? '全年级' : scope.row.class }}
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总人数"
        />
        <el-table-column
          prop="average"
          label="平均分"
        />
        <el-table-column label="名次">
          <template slot-scope="scope">
            {{ scope.row.isGrade ? '–' : scope.row.ranking }}
          </template>
        </el-table-column>
        <el-table-column
          prop="max"
          label="最高分"
        />
        <el-table-column
          prop="min"
          label="最低分"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
// import Pagination from "@/components/Pagination";

export default {
  name: "AnalysisAverage",
  components: { SearchBar },
  data() {
    return {
      searchFormData: {
        exame: { label: "考试", type: "select", col: { md: 7, lg: 5, xl: 5 } },
        subject: { label: "科目", type: "select", col: { md: 7, lg: 5, xl: 5 } }
      },
      // listQuery: {
      //   page: 1,
      //   limit: 20
      // },
      // total: 30,
      showNonResident: true,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const result = [
        {
          class: "xxx",
          total: 30,
          average: 80,
          ranking: 1,
          max: 99,
          min: 69
        },
        {
          class: "xxx",
          total: 30,
          average: 79,
          ranking: 1,
          max: 98,
          min: 67
        }
      ];
      // 计算全年级
      const gradeData = {
        isGrade: true, // 随便什么判断年级的标识
        total: result.reduce((prev, curr) => prev.total + curr.total),
        average:
          result.reduce((prev, curr) => prev.average + curr.average) /
          result.length,
        max: Math.max(...result.map(v => v.max)),
        min: Math.min(...result.map(v => v.min))
      };
      this.list = [...result, gradeData];
    },
    onSearch() {}
  }
};
</script>
