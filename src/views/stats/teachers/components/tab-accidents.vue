<template>
  <div class="stats-accidents">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <stats-teachers-tool-bar />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="group"
          label="学科组"
          align="center"
        />
        <el-table-column
          prop="people"
          label="违纪人次"
          align="center"
        />
        <el-table-column
          prop="deduction"
          label="扣分总计"
          align="center"
        />
        <el-table-column label="排名">
          <template slot-scope="scope">
            {{ scope.row.ranking || '—' }}
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
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
import StatsTeachersToolBar from "./StatsTeachersToolBar.vue";

export default {
  name: "TabAccidents",
  components: { SearchBar, Pagination, StatsTeachersToolBar },
  data() {
    return {
      searchFormData: {
        date: { label: "时间段", type: "daterange", col: 9 }
      },
      filterData: [
        { label: "本周", value: "week" },
        { label: "本学期", value: "semester" }
      ],
      selectedFilter: "week",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          group: "语文",
          people: 10,
          deduction: 20,
          ranking: 1
        },
        {
          // 合计行
          group: "合计",
          people: 10,
          deduction: 20
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onExport() {}
  }
};
</script>
