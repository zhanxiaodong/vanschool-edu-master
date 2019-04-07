<template>
  <div class="analysis-score">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="[]">
        <el-table-column
          label="班级"
          align="center"
        />
        <el-table-column
          label="姓名"
          align="center"
        />
        <el-table-column
          label="上课班级"
          align="center"
        />
        <el-table-column
          label="浙江班5月二模考试成绩"
          min-width="130"
          align="center"
        />
        <el-table-column
          label="浙江班5月一模考试成绩"
          min-width="130"
          align="center"
        />
        <el-table-column
          label="提分"
          align="center"
        />
        <el-table-column
          label="浙江班5月二模考试名次"
          min-width="130"
          align="center"
        />
        <el-table-column
          label="百分比名次"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
export default {
  name: "AnalysisScore",
  components: { SearchBar },
  data() {
    return {
      searchFormData: {
        exam: {
          label: "选择考试",
          type: "select",
          col: { md: 7, lg: 5, xl: 5 }
        },
        subject: { label: "科目", type: "select", col: { md: 7, lg: 5, xl: 5 } }
      }
    };
  },
  methods:{
    onSearch(queryKeys){
      window.console.log(queryKeys);
    }
  }
};
</script>