<template>
  <div class="dorm">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
        <el-table-column
          prop="dormName"
          label="寝室"
          align="center"
        />
        <el-table-column
          prop="dormAdmin"
          label="点名宿管"
          align="center"
        />
        <el-table-column
          prop="checkTime"
          label="点名时间"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            {{scope.row.checkTime | date2str}}
          </template>
        </el-table-column>
        <el-table-column
          prop="actualNumber"
          label="实到人数"
          align="center"
        >
          <!-- <template slot-scope="scope">
            {{ scope.row.attendance }}/{{ scope.row.total }}
          </template> -->
        </el-table-column>
        <el-table-column
          prop="outLate"
          label="晚归"
          align="center"
        />
        <el-table-column
          prop="lackSleep"
          label="缺勤"
          align="center"
        />
        <el-table-column
          prop="rollCallNumber"
          label="政教点名人数"
          align="center"
          min-width="100"
        />
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.result === 1"
              type="text"
              @click="reviewDialogVisible = true"
            >点击核实</el-button>
            <span
              v-if="scope.row.result === 2"
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
              @click="handleCommand('c',scope.row)"
              :disabled="scope.row.checksleep.type === 2"
            >点名</el-button>
            <el-dropdown @command="(c)=>{handleCommand(c,scope.row)}">
              <el-button type="text">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改</el-dropdown-item>
                <el-dropdown-item command="b">查看</el-dropdown-item>
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
      :visible.sync="absenceDialogVisible"
      :title="currRow.dormName+'寝室'"
    >
      <div :class="{'student-list' : true,'missing': editMode === 1,'late': editMode===2}">
        <div
          v-for="(stu,index) in currRow.students"
          :key="stu.id"
          :class="{'stu-item':true,outLate:stu.outLate,lackSleep:stu.lackSleep}"
          @click="handleStuCheck(stu,index)"
        >{{ stu.name }}</div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <div>
          <el-button
            type="danger"
            @click="editMode=1"
            :disabled="!isEdit"
          >缺寝</el-button>
          <el-button
            type="warning"
            @click="editMode=2"
            :disabled="!isEdit"
          >晚归</el-button>
        </div>
        <el-button
          type="primary"
          @click="handleCheckSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default {
  name: "AttendanceDorm",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        date: { label: "选择日期", type: "date", col: { md: 8, lg: 5, xl: 5 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      listData: [],
      reviewDialogVisible: false,
      absenceDialogVisible: false,
      selectedDorm: {
        name: "xx 寝室",
        studentList: [
          { name: "张三", id: 1, absence: false },
          { name: "张三", id: 2, absence: false },
          { name: "张三", id: 3, absence: false },
          { name: "张三", id: 4, absence: false }
        ]
      },
      currRow: {},
      editMode: 1,
      loading: false,
      isEdit: false
    };
  },
  created() {
    this.queryTableData();
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取列表数据
    queryTableData(queryKeys = {}) {
      const { page, limit: pageSize } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/man/checkSleep/query`,
          method: "POST",
          data: { schoolId: this.schoolId, page, pageSize, ...queryKeys }
        })
        .then(res => {
          this.listData = res.result.map(item => ({
            checksleep: item.checksleep,
            checksleepId: item.checksleep.id,
            roomId: item.room.id,
            dormName: `${item.room.floorNumber}-${item.room.roomName}`,
            dormAdmin: item.checksleep.name,
            checkTime: item.checksleep.checkTime,
            actualNumber: item.checksleep.actualNumber,
            outLate: item.checksleep.outLate,
            lackSleep: item.checksleep.lackSleep,
            rollCallNumber: item.checksleep.rollCallNumber,
            result: item.checksleep.result,
            students: item.students.map(item => ({
              ...item,
              outLate: 0,
              lackSleep: 0
            }))
          }));
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
    onSearch({ form }) {
      window.console.log(form);
    },
    // 多项操作
    handleCommand(command, row) {
      ({
        a: () => {
          // 添加缺寝
          this.currRow = {
            ...row,
            students: row.students.map(item => {
              return {
                ...item,
                outLate: row.checksleep.outLateName.includes(item.name) ? 1 : 0,
                lackSleep: row.checksleep.lackSleepName.includes(item.name)
                  ? 1
                  : 0
              };
            })
          };
          this.isEdit = true;
          this.absenceDialogVisible = true;
        },
        b: () => {
          // 查看
          this.currRow = {
            ...row,
            students: row.students.map(item => {
              return {
                ...item,
                outLate: row.checksleep.outLateName.includes(item.name) ? 1 : 0,
                lackSleep: row.checksleep.lackSleepName.includes(item.name)
                  ? 1
                  : 0
              };
            })
          };
          this.isEdit = false;
          this.absenceDialogVisible = true;
        },
        c: () => {
          // 点名
          this.$root
            .request({
              url: `/man/checkSleep/add`,
              method: "POST",
              data: { schoolId: this.schoolId }
            })
            .then(() => {
              this.$notify({
                title: "操作成功！",
                type: "success"
              });
              this.queryTableData();
            })
            .catch(err => {
              window.console.error(err);
            });
        }
      }[command]());
    },
    // 学生检查
    handleStuCheck(stuInfo, index) {
      if (this.isEdit) {
        if (this.editMode === 1) {
          this.currRow.students.splice(index, 1, {
            ...stuInfo,
            outLate: 0,
            lackSleep: stuInfo.lackSleep === 1 ? 0 : 1
          });
        } else if (this.editMode === 2) {
          this.currRow.students.splice(index, 1, {
            ...stuInfo,
            outLate: stuInfo.outLate === 1 ? 0 : 1,
            lackSleep: 0
          });
        }
      }
    },
    // 学生检查提交
    handleCheckSubmit() {
      if (this.isEdit) {
        let sendData = {
          checksleepId: this.currRow.checksleepId,
          name: this.currRow.dormAdmin,
          actualNumber: this.currRow.actualNumber,
          outLate: "",
          outLateName: "",
          lackSleep: "",
          lackSleepName: "",
          rollCallNumber: this.currRow.rollCallNumber,
          result: 2,
          type: 2
        };
        let lackSleepArr = this.currRow.students
          .filter(item => item.lackSleep)
          .map(item => item.name);
        let outLateArr = this.currRow.students
          .filter(item => item.outLate)
          .map(item => item.name);

        sendData.outLate = outLateArr.length;
        sendData.outLateName = outLateArr.join(",");
        sendData.lackSleep = lackSleepArr.length;
        sendData.lackSleepName = lackSleepArr.join(",");
        this.$root
          .request({
            url: `/man/checkSleep/update`,
            method: "POST",
            data: sendData
          })
          .then(this.handleSucceed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.absenceDialogVisible = false;
      }
    },
    // 操作成功
    handleSucceed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableData();
      this.absenceDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.student-list {
  display: flex;
  flex-wrap: wrap;
  .stu-item {
    border-radius: 4px;
    padding: 0 1em;
    line-height: 32px;
    border: 1px solid #dcdfe6;
    margin: 0 0.6em 0.6em 0;
    &:hover {
      cursor: pointer;
    }
    &.outLate {
      border-color: #e6a23c;
      background-color: #e6a23c;
      color: #ffffff;
    }
    &.lackSleep {
      border-color: #f56c6c;
      background-color: #f56c6c;
      color: #ffffff;
    }
  }
  &.late {
    .stu-item:hover {
      border-color: #e6a23c;
    }
  }
  &.missing {
    .stu-item:hover {
      border-color: #f56c6c;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

