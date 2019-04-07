<template>
  <el-card shadow="never">
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table
        :data="list"
        class="very-densed"
        @cell-click="handleCellClick"
      >
        <el-table-column
          prop="className"
          label="班级/科目"
          min-width="140"
          align="center"
        />
        <el-table-column
          v-for="item in subjects"
          :key="item.id"
          :prop="item.courseName"
          :label="item.courseName.substr(0,1)"
          align="center"
        >
          <template slot-scope="scope">
            <div :class="{'is-click':scope.row[`${item.courseName}`]}">{{scope.row[`${item.courseName}`]}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="classNumber"
          label="班级人数"
          align="center"
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
    <extern-list
      :visible="dialogTableVisible"
      :row-data="rowData"
      @close="dialogTableVisible =false"
    />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import ExternList from "./ExternList.vue";
export default {
  name: "studentsAndCourse",
  components: { Pagination, ExternList },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      subjects: [],
      dialogTableVisible: false,
      loading: false,
      rowData: {}
    };
  },
  created() {
    // 获取科目
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjects = res.result;
      })
      .catch(err => {
        window.console.error(err);
      });
    this.queryTableData();
  },
  methods: {
    // 获取表格数据
    // eslint-disable-next-line
    queryTableData(queryKeys = {}) {
      this.loading = true;
      this.$root
        .request({
          url: `/man/class/query`,
          method: "POST",
          data: {
            manClass: {},
            subjects: []
          }
        })
        .then(res => {
          this.list = res.result.map(item => {
            let curr = {
              id: item.manClass.id,
              classAdviser: item.manClass.classAdviser,
              className: item.manClass.name,
              classNumber:
                item.subjectVos && item.subjectVos[0]
                  ? item.subjectVos[0].classStudentNumber
                  : ""
            };
            item.subjectVos.forEach(s => {
              curr[s.subject.courseName] = s.studentNumber;
            });
            return curr;
          });
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryTableData({ page, pageSize });
    },
    // 单元格点击
    handleCellClick(row, column) {
      if (row[column.property]) {
        const courseInfo = this.subjects.find(
          item => column.property === item.courseName
        );
        this.rowData = { ...row, courseId: courseInfo.id };
        this.dialogTableVisible = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.is-click:hover {
  cursor: pointer;
  color: #ffcd38;
}
</style>
