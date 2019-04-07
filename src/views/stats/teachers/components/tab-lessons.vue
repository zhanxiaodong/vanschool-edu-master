<template>
  <div class="lessons">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
   <stats-teachers-tool-bar/>
    <div class="table-container">
        <el-table :data="list">
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="group"
            label="分组"
          />
          <el-table-column
            prop="teachingGroup"
            label="学科组"
          />
          <el-table-column label="负责班级">
            <template slot-scope="scope">
              {{ scope.row.classes && scope.row.classes.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="transferClasses"
            label="换班"
          />
          <el-table-column
            prop="transferLessons"
            label="换课"
          />
          <el-table-column
            prop="abandonClasses"
            label="弃课"
          />
        </el-table>
        <div class="table-container__footer clearfix">
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
  name: "TabLessons",
  components: { SearchBar, Pagination,StatsTeachersToolBar },
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
          name: "张三",
          group: "xxx",
          teachingGroup: "xxx",
          classes: ["xxx", "xxxx"],
          transferLessons: 1,
          transferClasses: 1,
          abandonClasses: 1
        },
        {
          // 合计行
          name: "合计",
          transferLessons: 1,
          transferClasses: 1,
          abandonClasses: 1
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
