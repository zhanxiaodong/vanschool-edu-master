<template>
  <el-card shadow="never">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
      >
        <el-table-column
          prop="time"
          label="时间"
          width="200"
        />
        <el-table-column
          prop="class"
          label="班级"
          align="center"
        />
        <el-table-column
          prop="teacher"
          label="上课教师"
          align="center"
        />
        <el-table-column
          prop="callTime"
          label="点名时间"
          align="center"
          width="160"
        />
        <el-table-column
          label="点名情况"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.editing">
              <el-radio-group v-model="scope.row.attendance">
                <el-radio :label="false">不在</el-radio>
                <el-radio :label="true">在</el-radio>
              </el-radio-group>
            </span>
            <template v-else>
              <span :class="{ 'dot-green': scope.row.attendance, 'dot-pink': !scope.row.attendance }">{{ scope.row.attendance ? '在' : '不在' }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-button
                type="text"
                @click="cancelEdit(scope.row)"
              >取消</el-button>
              <el-button
                type="text"
                @click="confirmEdit(scope.row)"
              >确认</el-button>
            </template>
            <el-button
              v-else
              type="text"
              @click="scope.row.editing = true"
            >编辑</el-button>
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
import Pagination from "@/components/Pagination";

export default {
  name: "AttendanceTeacher",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        date: { label: "选择日期", type: "date", col: { md: 8, lg: 5, xl: 5 } },
        lessons: {
          label: "课节",
          type: "select",
          options: [
            {
              label: "早读",
              value: 1
            },
            {
              label: "第一节",
              value: 2
            },
            {
              label: "第二节",
              value: 3
            },
            {
              label: "第三节",
              value: 4
            }
          ],
          col: { md: 8, lg: 5, xl: 5 }
        }
      },
      selectedFilter: "",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      listLoading: true,
      list: []
    };
  },
  created() {
    // 模拟请求数据
    const list = [
      {
        time: "2018-06-28 16:00~17:00",
        class: "401班",
        teacher: "xxx",
        callTime: "2018-06-28 14:39",
        attendance: true
      },
      {
        time: "2018-06-28 16:00~17:00",
        class: "401班",
        teacher: "xxx",
        callTime: "2018-06-28 14:39",
        attendance: false
      }
    ];
    this.list = list.map(v => {
      this.$set(v, "editing", false); // 用于行内编辑
      v.originalAttendance = v.attendance; // 缓存编辑之值，便于取消时复原
      return v;
    });
    this.listLoading = false;
  },
  methods: {
    onSearch() {},
    handlePageChange({ page, pageSize }) {
      window.console.log(page, pageSize);
    },
    cancelEdit(row) {
      row.attendance = row.originalAttendance;
      row.editing = false;
    },
    confirmEdit(row) {
      row.editing = false;
      row.originalAttendance = row.attendance;
      this.$message({
        message: "修改成功！",
        type: "success"
      });
    }
  }
};
</script>
