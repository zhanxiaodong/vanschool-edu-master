<template>
  <div class="stats-styles-points">
    <el-row :gutter="24">
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

    <!-- <div style="padding: 12px 18px">
      <div class="table-container">
        <el-table :data="list">
          <el-table-column
            prop="time"
            label="时间" />
        </el-table>
        <div class="table-container__footer clearfix">
          <pagination
            v-show="total"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="onSearch" />
        </div>
        <el-alert title="需求暂时未明" type="info" description="原型：http://47.97.102.205/update/1/edu16/index.html#g=1&p=教学区纪律扣分统计" show-icon />
      </div>
    </div> -->
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
// import Pagination from '@/components/Pagination'

export default {
  name: "StatsStylesPoints",
  components: { SearchBar },
  data() {
    return {
      searchFormData: {
        date: { label: "选择日期", type: "date", col: 18 }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: []
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
