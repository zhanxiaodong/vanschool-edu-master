<template>
  <div class="class">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="time"
          label="时间"
          width="100"
          align="center"
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
          width="140"
          align="center"
        />
        <el-table-column
          prop="attendance"
          label="实到人数"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.attendance }}/{{ scope.row.total }}
          </template>
        </el-table-column>
        <el-table-column
          prop="late"
          label="迟到"
          align="center"
        />
        <el-table-column
          prop="absence"
          label="缺课"
          align="center"
        />
        <el-table-column
          prop="teacherCall"
          label="教师点名人数"
          min-width="110"
          align="center"
        />
        <el-table-column
          prop="otherCall"
          label="政教点名人数"
          min-width="110"
          align="center"
        />
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 0"
              type="text"
              @click="reviewDialogVisible = true"
            >点击核实</el-button>
            <span
              v-if="scope.row.status === 1"
              class="dot-green"
            >已核实</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              style="margin-right:1em"
              @click="handleShowDetails(scope.row)"
            >查看</el-button>
            <el-dropdown @command="(c)=>{handleCommand(c,scope.row)}">
              <el-button type="text">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">点名</el-dropdown-item>
                <el-dropdown-item command="b">添加缺课</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    <el-dialog
      :visible.sync="reviewDialogVisible"
      title="2018-03-18 第四节课"
    >
      <div>401班张三同学迟到，扣3分；李四同学旷课，扣4分</div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="reviewDialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="reviewDialogVisible = false"
        >确认审核</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="absenceDialogVisible"
      :title="selectedClass.name"
    >
      <div class="class-map">
        <div
          v-for="(stu, index) in selectedClass.studentList"
          :key="stu.id"
          :class="{ 'student': true, 'absence': stu.absence, 'late': stu.late }"
          @click="onClickStudent(index)"
        >{{ stu.name }}</div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="themed-button"
          @click="reviewDialogVisible = false"
        >确 定</el-button>
        <!-- 若为查看，变成「修改」按钮，点击修改再变成确定缺课按钮 -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default {
  name: "AttendanceClass",
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
      list: [
        {
          time: "2018-06-28 16:00~17:00",
          class: "401班",
          teacher: "xxx",
          callTime: "2018-06-28 14:39",
          attendance: 28,
          total: 30,
          late: 1,
          absence: 1,
          teacherCall: 30,
          otherCall: 30,
          status: 0
        },
        {
          time: "2018-06-28 16:00~17:00",
          class: "401班",
          teacher: "xxx",
          callTime: "2018-06-28 14:39",
          attendance: 28,
          total: 30,
          late: 1,
          absence: 1,
          teacherCall: 30,
          otherCall: 30,
          status: 1
        }
      ],
      reviewDialogVisible: false,
      absenceDialogVisible: false,
      selectedClass: {
        name: "xx 班",
        studentList: [
          { name: "张三", id: 1, absence: false },
          { name: "张三", id: 2, absence: false },
          { name: "张三", id: 3, absence: false },
          { name: "张三", id: 4, absence: false },
          { name: "张三", id: 5, absence: false },
          { name: "张三", id: 6, absence: false },
          { name: "张三", id: 7, absence: false },
          { name: "张三", id: 8, late: true, absence: false },
          { name: "张三", id: 9, absence: true },
          { name: "张三", id: 10, absence: false },
          { name: "张三", id: 11, absence: false },
          { name: "张三", id: 12, absence: false },
          { name: "张三", id: 13, absence: false },
          { name: "张三", id: 14, absence: false },
          { name: "张三", id: 15, absence: false }
        ]
      }
    };
  },
  methods: {
    onClickStudent(index) {
      const selectedStudent = this.selectedClass.studentList[index];
      selectedStudent.absence = !selectedStudent.absence;
    },
    handlePageChange({ page, pageSize }) {
      window.console.log({ page, pageSize });
    },
    onSearch(param) {
      window.console.log(param);
    },
    handleShowDetails(row) {
      window.console.log(row);
      this.absenceDialogVisible = true;
    },
    handleCommand(command, row) {
      window.console.log(command, row);
    }
  }
};
</script>
