<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <quick-filter
      title="学科组"
      :opts="subjectGroupOpts"
      title-width="5em"
      @change="handleFilterChange"
    />
    <el-row :gutter="24">
      <el-col :span="17">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col
        :span="7"
        style="text-align:right"
      >
        <el-button>导出数据</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="group"
          label="分组"
          align="center"
        />
        <el-table-column
          prop="subject"
          label="学科组"
          align="center"
        />
        <el-table-column label="负责班级" align="center">
          <template slot-scope="scope">
            <ul class="nested-cells">
              <li
                v-for="(item, index) in scope.row.goals"
                :key="index"
              >{{ item.class }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="目标达成率" align="center">
          <template slot-scope="scope">
            <ul class="nested-cells">
              <li
                v-for="(item, index) in scope.row.goals"
                :key="index"
              >{{ item.ratio }}</li>
            </ul>
          </template>
        </el-table-column>
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
  </el-card>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import QuickFilter from "@/components/QuickFilter";
import Pagination from "@/components/Pagination";

export default {
  name: "Goals",
  components: { SearchBar, QuickFilter, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "姓 名", type: "input", col: { md: 10, lg: 6, xl: 6 } },
        grade: {
          label: "负责班级",
          type: "select",
          options: [],
          col: { md: 10, lg: 6, xl: 6 }
        }
      },
      subjectGroupOpts: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          name: "张三",
          group: "教师",
          subject: "数学",
          goals: [
            { class: "某班", ratio: "80%" },
            { class: "某班", ratio: "80%" }
          ]
        },
        {
          name: "张三",
          group: "教师",
          subject: "数学",
          goals: [
            { class: "某班", ratio: "80%" },
            { class: "某班", ratio: "80%" }
          ]
        }
      ]
    };
  },
  created() {
    // 获取学科列表
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjectGroupOpts = res.result.map(item => ({
          label: item.courseName,
          key: item.id
        }));
      })
      .catch(() => {});
    // 查询班级
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.searchFormData.grade.options = res.result.map(item => ({
          label: item.name,
          value: item.name
        }));
      })
      .catch(() => {});
  },
  methods: {
    handleFilterChange(selected) {
      window.console.log(selected);
    },
    handlePageChange({ page, pageSize }) {
      window.console.log({ page, pageSize });
    },
    onSearch() {}
  }
};
</script>
