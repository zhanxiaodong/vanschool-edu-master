<template>
  <div class="classes-leaves">
    <el-card shadow="never">
      <el-row :gutter="24">
        <el-col :span="18">
          <search-bar
            :form-map="searchFormData"
            @search="onSearch"
          />
        </el-col>
        <el-col
          :span="6"
          style="text-align:right"
        >
          <el-button
            @click="dialogVisible = true"
            type="primary"
          >发起申请</el-button>
          <el-button
            type="primary"
            @click="onMultiApprove"
          >批量通过</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table
          :data="list"
          @selection-change="onSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
            :selectable="(row,index)=>row.type === 1"
          />
          <el-table-column
            prop="studentNumber"
            label="学号"
            width="110"
            align="center"
          />
          <el-table-column
            prop="studentName"
            label="学生姓名"
            align="center"
          />
          <el-table-column
            prop="className"
            label="班级"
            align="center"
          />
          <el-table-column
            prop="roomName"
            label="寝室"
            align="center"
            min-width="130"
          />
          <el-table-column
            label="请假类别"
            align="center"
          >
            <template slot-scope="scope">
              {{{'1':'病假','2':'事假','3':'特殊假'}[scope.row.leaveGenre]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="leaveTime"
            width="100"
            label="请假时间"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.leaveStar | date2dateStr}} {{scope.row.leaveEnd | date2dateStr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remake"
            label="请假原因"
            min-width="220"
            align="center"
          />
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              {{{'1':'发起申请','2':'已通过','3':'已驳回','4':'已销假','5':'已回寝','6':'已离寝','7':'已出校','8':'已回校','9':'延假'}[scope.row.type]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="updateUser"
            label="处理人"
            align="center"
          />
          <el-table-column
            label="审核"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type === 1">
                <el-button
                  type="text"
                  @click="handleAudit(scope.row,2)"
                >通过</el-button>
                <el-button
                  type="text"
                  @click="handleAudit(scope.row,3)"
                >驳回</el-button>
              </span>
              <span
                v-else
                :class="[[2,3].includes(scope.row.auditStatus) ? 'dot-green' : 'dot-pink']"
              >{{ scope.row.type === 2 ? '已通过': '已驳回' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.type != 2"
                type="text"
              >打印凭证</el-button>
              <el-button
                :disabled="scope.row.type != 2"
                type="text"
                @click="handlePostponeApply(scope.row)"
              >延假</el-button>
              <el-button
                :disabled="scope.row.type != 2"
                type="text"
                @click="handleAudit(scope.row,4)"
              >销假</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-container-footer">
          <pagination
            v-show="total"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="handelPageChange"
          />
        </div>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      title="发起申请请假"
    >
      <el-form
        :model="dialogForm"
        label-width="6em"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="学号：">
              <el-input
                v-model="dialogForm.studentNumber"
                @blur="handleQueryInfo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input
                v-model="dialogForm.studentName"
                @blur="handleQueryInfo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-input
                v-model="dialogForm.className"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寝室：">
              <el-input
                v-model="dialogForm.roomName"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="请假类别：">
          <el-select v-model="dialogForm.leaveGenre">
            <el-option
              :value="1"
              label="病假"
            ></el-option>
            <el-option
              :value="2"
              label="事假"
            ></el-option>
            <el-option
              :value="3"
              label="特殊假"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请假类别：">
          <el-select v-model="dialogForm.leaveType">
            <el-option
              :value="1"
              label="回寝"
            ></el-option>
            <el-option
              :value="2"
              label="出校"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="请假时间："
          class="full-width"
        >
          <el-date-picker
            v-model="dialogForm.leaveTime"
            type="daterange"
            range-separator="–"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="请假原因：">
          <el-input
            v-model="dialogForm.remake"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCreateSubmit"
        >提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="delayDialogVisible"
      title="延假"
      width="520px"
    >
      <el-form
        :model="dialogForm"
        label-width="6em"
      >
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input
                :value="currRow.studentName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-input
                :value="currRow.className"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="请假原因：">
          <el-input
            type="textarea"
            rows="2"
            :value="currRow.remake"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="请假时间：">
          <el-input
            :value="currRow.dateTime"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="currRow.leaveEnd"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delayDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmitPostpone"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Leaves",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        studentNumber: {
          label: "学号",
          type: "input",
          col: { md: 9, lg: 6, xl: 6 }
        },
        studentName: {
          label: "姓名",
          type: "input",
          col: { md: 9, lg: 6, xl: 6 }
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      selectedRows: [],
      dialogVisible: false,
      dialogForm: {
        studentNumber: "",
        studentName: "",
        className: "",
        roomName: "",
        leaveGenre: "",
        leaveType: "",
        remake: "",
        type: 1,
        updateUser: "",
        leaveTime: []
      },
      delayDialogVisible: false,
      loading: false,
      currRow: {
        studentName: "",
        className: "",
        dateTime: "",
        remake: "",
        leaveEnd: ""
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取列表数据
    getTableData(queryKeys = {}) {
      const { page, limit: pageSize } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/man/student/leave/query`,
          method: "POST",
          data: { page, pageSize, ...queryKeys }
        })
        .then(res => {
          this.list = res.result;
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 列表查询
    onSearch(payload) {
      window.console.log(payload);
      this.$root
        .request({
          url: `/man/student/leave/queryByNum`,
          method: "POST",
          data: { ...payload }
        })
        .then(res => {
          window.console.log(res);
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 翻页
    handelPageChange({ page, pageSize }) {
      this.getTableData({ page, pageSize });
    },
    // 表格多选
    onSelectionChange(val) {
      this.selectedRows = val;
    },
    // 批量通过
    onMultiApprove() {
      let sendData = this.selectedRows.map(item => ({
        id: item.id,
        type: 2
      }));
      if (sendData.length > 0) {
        this.$root
          .request({
            url: `/man/student/leave/updateAll`,
            method: "POST",
            data: sendData
          })
          .then(() => {
            this.$notify({
              title: "操作成功！",
              type: "success"
            });
            this.getTableData();
          })
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$message.error("请选择需要通过的学生！");
      }
    },
    // 销假
    onCancelLeave(row) {
      this.$confirm(`确定注销${row.name}的此次请假吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // ...
      });
    },
    // 输入学号和姓名时，查询学生信息
    handleQueryInfo() {
      const { studentNumber, studentName } = this.dialogForm;
      if (studentNumber || studentName) {
        this.$root
          .request({
            url: `/man/student/find/condition`,
            method: "POST",
            data: { studNo: studentNumber || "", name: studentName || "" }
          })
          .then(res => {
            if (res[0]) {
              this.dialogForm.studentNumber = res[0].student.studNo;
              this.dialogForm.studentName = res[0].student.name;
              this.dialogForm.className = res[0].studentClass.name;
              this.dialogForm.roomName = res[0].studentInfo.room;
            } else {
              this.$notify.error({
                title: "未找到该学生信息！",
                message: "请确认该学生已经存在！"
              });
            }
          })
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 创建提交
    handleCreateSubmit() {
      let sendData = { ...this.dialogForm };
      sendData.leaveStar = sendData.leaveTime[0]
        ? sendData.leaveTime[0].getTime()
        : "";
      sendData.leaveEnd = sendData.leaveTime[1]
        ? sendData.leaveTime[1].getTime()
        : "";

      delete sendData.leaveTime;

      this.$root
        .request({
          url: `/man/student/leave/add`,
          method: "POST",
          data: sendData
        })
        .then(() => {
          this.dialogVisible = false;
          this.dialogForm = {
            studentNumber: "",
            studentName: "",
            className: "",
            roomName: "",
            leaveGenre: "",
            leaveType: "",
            remake: "",
            type: 1,
            updateUser: "",
            leaveTime: []
          };
          this.getTableData();
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 审核
    handleAudit(row, type, leaveEnd) {
      this.$root
        .request({
          url: `/man/student/leave/update/${row.id}`,
          method: "POST",
          data: {
            id: row.id,
            type,
            leaveEnd: leaveEnd || ""
          }
        })
        .then(() => {
          if (type === 9) {
            this.delayDialogVisible = false;
          }
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
          this.getTableData();
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 延期
    handlePostponeApply(row) {
      this.currRow = {
        id: row.id,
        studentName: row.studentName,
        className: row.className,
        dateTime: `${this.$root.formatDate.toStr(
          row.leaveStar,
          "YYYY/MM/DD"
        )} - ${this.$root.formatDate.toStr(row.leaveEnd, "YYYY/MM/DD")}`,
        remake: row.remake,
        leaveEnd: ""
      };
      this.delayDialogVisible = true;
    },
    // 提交延期
    handleSubmitPostpone() {
      const { leaveEnd, id } = this.currRow;
      this.handleAudit({ id }, 9, leaveEnd);
    }
  }
};
</script>
