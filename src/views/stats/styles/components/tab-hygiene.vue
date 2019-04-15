<template>
  <div class="hygiene">
    <el-row :gutter="24">
      <el-col :span="12">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-button icon="el-icon-download">导 出</el-button>
      </el-col>
    </el-row>

    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="class"
          label="班级"
        />
        <el-table-column
          prop="deduction"
          label="教室卫生扣分统计"
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
  name: "TabHygiene",
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
          deduction: 20
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
