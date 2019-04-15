<template>
  <div class="stats-styles-discipline">
    <el-row
      type="flex"
      align="top"
    >
      <el-col :span="12">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col
        :span="12"
        style="text-align:right"
      >
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
          prop="classPeople"
          label="班级违纪人次"
        />
        <el-table-column
          prop="classDeduction"
          label="班级违纪扣分"
        />
        <el-table-column
          prop="dormPeople"
          label="寝室违纪人次"
        />
        <el-table-column
          prop="dormDeduction"
          label="寝室违纪扣分"
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
  name: "StatsStylesDiscipline",
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
          classPeople: 3,
          classDeduction: 6,
          dormPeople: 2,
          dormDeduction: 4,
          ranking: 1
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
