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
    //翻页和搜索都有问题，需要掉接口！！！
    // 搜索
    onSearch(payload) {
      let queryData = { ...payload.form }
      let startDate = ''
      let endDate = ''
      if (queryData.daterange) {
        startDate = this.$root.formatDate.toSec(queryData.daterange[0])
        endDate = this.$root.formatDate.toSec(queryData.daterange[1])
      }
      delete queryData['daterange']
      queryData = Object.keys(queryData)
        .map(key => ({
          coloumName: key,
          coloumValue: queryData[key]
        }))
        .filter(item => item.coloumValue)
      this.queryKeysData = {
        type: 2,
        startDate,
        endDate,
        result: 0,
        properties: queryData
      }
      this.searchFetch()
    },
    // 翻页
    getList({ page, limit }) {
      if (
        this.queryKeysData.properties &&
        this.queryKeysData.properties.length > 0
      ) {
        // 有查询条件的翻页
        this.searchFetch({
          page,
          pageSize: limit
        })
      } else {
        // 无条件的翻页
        this.getTableData({ page, pageSize: limit })
      }
    },
    // 搜索查询
    searchFetch({ page, pageSize } = { page: 1, pageSize: 20 }) {
      this.$root
        .http({
          url: `/client/querys`,
          method: 'POST',
          data: { ...this.queryKeysData, page, pageSize }
        })
        .then(res => {
          this.tableData = this.formatTableData(res.result)
          this.total = res.totalNum
        })
        .catch(err => {
          window.console.error(err)
        })
    },
  }
};
</script>
