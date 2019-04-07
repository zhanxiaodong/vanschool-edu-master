<template>
  <div class="analysis-ranking">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="adminClass"
          label="班级"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="class"
          label="上课班级"
        />
        <el-table-column
          prop="grade"
          label="成绩"
        />
        <el-table-column
          prop="ranking"
          label="排名"
        />
        <el-table-column
          prop="percentRanking"
          label="百分比名次"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
// import Pagination from "@/components/Pagination";

export default {
  name: "AnalysisRanking",
  components: { SearchBar },
  data() {
    return {
      searchFormData: {
        exam: { label: "考试", type: "select", col: { md: 7, lg: 5, xl: 5 } },
        subject: { label: "科目", type: "select", col: { md: 7, lg: 5, xl: 5 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          adminClass: "xxx",
          name: "xxx",
          class: "xxx",
          grade: 106,
          ranking: 1,
          percentRanking: "10%"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {},
    onSearch() {}
  }
};
</script>
