<template>
  <div class="stats-teachers">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <stats-teachers-tool-bar/>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="group"
          label="教学组"
        />
        <el-table-column
          prop="teachers"
          label="教师人数"
        />
        <el-table-column
          prop="assistants"
          label="助教人数"
        />
        <el-table-column
          prop="newTeachers"
          label="新增教师人数"
        />
        <el-table-column
          prop="newAssistants"
          label="新增助教人数"
        />
        <el-table-column
          prop="leftTeachers"
          label="离职教师人数"
        />
        <el-table-column
          prop="leftAssistants"
          label="离职助教人数"
        />
        <el-table-column
          prop="borrowed"
          label="借调出"
        />
        <el-table-column
          prop="lended"
          label="借调入"
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
import StatsTeachersToolBar from "./StatsTeachersToolBar.vue";

export default {
  name: "StatsTabTeachers",
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
      radio4: "",
      selectedFilter: "week",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          group: "数学",
          teachers: 12,
          assistants: 10,
          newTeachers: 2,
          newAssistants: 2,
          leftTeachers: 2,
          leftAssistants: 2,
          borrowed: 1,
          lended: 1
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
