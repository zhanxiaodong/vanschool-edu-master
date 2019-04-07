<template>
  <div class="analysis-segment">
    <el-row :gutter="24">
      <el-col :span="20">
        <div class="quick-filter">
          <div class="filter-title">选择考试：</div>
          <el-checkbox-group v-model="checkboxGroup3">
            <el-checkbox-button
              v-for="item in ['浙江班5月二模考试','二模','三模']"
              :label="item"
              :key="item"
            >{{item}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="4" style="text-align:right">
        <el-button type="success">导出</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="subject"
          label="科目"
        />
        <el-table-column
          prop="exam"
          label="考试"
          min-width="160"
        />
        <el-table-column
          prop="total"
          label="总数"
        />
        <el-table-column
          prop="max"
          label="最高分"
        />
        <el-table-column
          prop="min"
          label="最低分"
        />
        <el-table-column
          prop="average"
          label="平均分"
        />
        <el-table-column
          label="110分以上"
          prop="above110"
          min-width="110"
        />
        <el-table-column
          label="90–109分"
          prop="from90to109"
          min-width="110"
        />
        <el-table-column
          label="80–89分"
          prop="from80to89"
          min-width="110"
        />
        <el-table-column
          label="70–79分"
          prop="from70to79"
        />
        <el-table-column
          label="60–69分"
          prop="from60to69"
        />
        <el-table-column
          label="50–59分"
          prop="from50to59"
        />
        <el-table-column
          label="49分以下"
          prop="below49"
        />
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "AnalysisSegment",
  components: { Pagination },
  data() {
    return {
      filterData: [
        { label: "浙江班5月二模考试", value: 1 },
        { label: "二模", value: 2 },
        { label: "三模", value: 3 },
        { label: "四模", value: 4 },
        { label: "五模", value: 5 }
      ],
      selectedFilter: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 30,
      list: [
        {
          subject: "语文",
          exam: "浙江班5月二模考试",
          total: 700,
          max: 107,
          min: 10,
          average: 81,
          above110: 0,
          from90to109: 189,
          from80to89: 210,
          from70to79: 109,
          from60to69: 22,
          from50to59: 33,
          below49: 28
        },
        {
          subject: "语文",
          exam: "浙江班5月二模考试",
          total: 700,
          max: 107,
          min: 10,
          average: 81,
          above110: 0,
          from90to109: 189,
          from80to89: 210,
          from70to79: 109,
          from60to69: 22,
          from50to59: 33,
          below49: 28
        },
        {
          subject: "语文",
          exam: "浙江班5月二模考试",
          total: 700,
          max: 107,
          min: 10,
          average: 81,
          above110: 0,
          from90to109: 189,
          from80to89: 210,
          from70to79: 109,
          from60to69: 22,
          from50to59: 33,
          below49: 28
        },{
          subject: "语文",
          exam: "浙江班5月二模考试",
          total: 700,
          max: 107,
          min: 10,
          average: 81,
          above110: 0,
          from90to109: 189,
          from80to89: 210,
          from70to79: 109,
          from60to69: 22,
          from50to59: 33,
          below49: 28
        }
      ],
      checkboxGroup3: []
    };
  },
  methods: {
    handlePageChange({ page, pageSize }) {
      window.console.log(page, pageSize);
    }
  }
};
</script>


<style lang="scss" scoped>
.quick-filter {
  display: flex;
  align-items: center;
  margin: 0 0 1.2em 0;
  .filter-title {
    flex-shrink: 0;
  }
}
</style>
