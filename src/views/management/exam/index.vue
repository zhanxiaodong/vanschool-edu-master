<template>
  <div class="management-exam">
    <el-card shadow="never">
      <el-row
        type="flex"
        align="middle"
        class="simple-search-bar"
      >
        <el-col
          :span="24"
          style="text-align:right"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleEdit(null)"
          >添加考试科目</el-button>
          <el-button @click="handleCreateCard">生成准考证</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="list">
          <el-table-column
            label="考试时间"
            width="260"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.examStartTime | date2str }} - {{scope.row.examEndTime | date2str}}
            </template>
          </el-table-column>
          <el-table-column
            label="科目"
            prop="subject"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="eduManExamRooms"
            label="考场"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <div
                class="table-cell-row"
                v-for="(item,index) in scope.row.eduManExamRooms"
                :key="index"
              >{{item.roomName}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="eduManExamRooms"
            label="监考老师"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <div
                class="table-cell-row"
                v-for="(item,index) in scope.row.eduManExamRooms"
                :key="index"
              >{{item.teacher}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="eduManExamRooms"
            label="人数"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <div
                class="table-cell-row"
                v-for="(item,index) in scope.row.eduManExamRooms"
                :key="index"
              >{{item.fieldNumbers}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="220"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.row);"
              >修改</el-button>
              <el-button
                type="text"
                @click="$router.push({path:'/management/exams/details/seatPlan'})"
              >考场座位表</el-button>
              <el-button
                type="text"
                @click="$router.push({path:'/management/exams/details/verifyList',query:{batch:$route.query.batch}})"
              >核对表</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-container-footer">
          <pagination
            v-show="total"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="handleChangePage"
          />
        </div>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="Object.keys(dialogForm).length > 0 ? '修改考试科目' : '添加考试科目'"
      width="720px"
    >
      <el-form label-width="5em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="科目：">
              <el-select
                v-model="dialogForm.subId"
                placeholder="请选择科目"
                @change="handelChangeSubjects"
              >
                <el-option
                  v-for="s in subjects"
                  :key="s.id"
                  :value="s.id"
                  :label="s.courseName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分制：">
              <el-input
                v-model="dialogForm.settingFraction"
                type="number"
              ><template slot="append">分</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="dialogForm.datetimerange"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="考场：">
          <el-checkbox-group v-model="dialogForm.examName">
            <div
              v-for="(item,index) in examRoomList"
              :key="item.roomId+index"
              class="exam-room-row"
            >
              <el-checkbox :label="item.className"></el-checkbox>
              <el-select
                v-model="item.teacherList"
                multiple
                placeholder="请选择监考老师"
              >
                <el-option
                  v-for="t in teacherList"
                  :key="t.id"
                  :label="t.name"
                  :value="t.name"
                />
              </el-select>
              <el-input
                v-model="item.fieldNumbers"
                placeholder=""
              >
                <template slot="append">人</template></el-input>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <template v-if="$route.query.type === '4'">
          <el-form-item
            label="关联主线任务："
            label-width="8em"
          >
            <el-select v-model="dialogForm.hostTaskId">
              <el-option
                v-for="item in taskList"
                :label="item.taskTitle"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
            <div class="form-col2">
              <div>
                <span>培优分数≥</span>
                <el-input v-model="dialogForm.peiScores">
                  <template slot="append">分</template>
                </el-input>
              </div>
              <div>
                <span>补课分数≤</span>
                <el-input v-model="dialogForm.supplementLine">
                  <template slot="append">分</template>
                </el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="过关星级评分："
            label-width="8em"
          >
            <div class="form-col3">
              <div>
                <span>1星≥</span>
                <el-input v-model="dialogForm.oneStarLine">
                  <template slot="append">分</template>
                </el-input>
              </div>
              <div>
                <span>2星≥</span>
                <el-input v-model="dialogForm.twoStarLine">
                  <template slot="append">分</template>
                </el-input>
              </div>
              <div>
                <span>3星≥</span>
                <el-input v-model="dialogForm.threeStarLine">
                  <template slot="append">分</template>
                </el-input>
              </div>
            </div>
          </el-form-item>
        </template>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "ManagementExam",
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      subjects: [],
      dialogVisible: false,
      dialogForm: {
        subId: "",
        settingFraction: "",
        examName: [],
        datetimerange: [],
        hostTaskId: "",
        peiScores: "",
        supplementLine: "",
        oneStarLine: "",
        twoStarLine: "",
        threeStarLine: ""
      },
      examRoomList: [],
      teacherList: [],
      taskList: [],
      loading: false,
      isEdit: false
    };
  },
  activated() {
    this.queryTableList();
    // 获取学科列表
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjects = res.result;
        this.dialogForm.subId = res.result[0].id;
        this.queryTeacherList()
          .then(res => {
            this.teacherList = res.result.map(item => ({
              id: item.teacher.id,
              name: item.teacher.name
            }));
            this.handleExamRoom();
            this.queryTaskList();
          })
          .catch(err => {
            window.console.log(err);
          });
      })
      .catch(() => {});
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 考试详情列表
    queryTableList(queryKeys = {}) {
      const { page, limit } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/task/exam/exam/query`,
          method: "POST",
          data: {
            page,
            pageSize: limit,
            batch: this.$route.query.batch,
            subId: -1,
            ...queryKeys
          }
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
    // 详情列表翻页
    handleChangePage({ page, pageSize }) {
      this.queryTableList({ page, pageSize });
    },
    // 获取考场列表
    handleExamRoom() {
      const { id, type } = this.$route.query;
      this.$root
        .request({
          url: `/task/exam/exam/class/query`,
          method: "POST",
          data: { examId: id }
        })
        .then(res => {
          this.examRoomList = res.map(item => ({
            examId: id,
            roomId: item.classId,
            className: item.className,
            teacherList: [],
            fieldNumbers: "",
            type
          }));
        })
        .catch(() => {});
    },
    // 获取教师列表
    queryTeacherList() {
      return this.$root.request({
        url: `/man/teacher/querys`,
        method: "POST",
        data: {
          teacherParam: {
            name: "",
            groups: "",
            result: "",
            page: "",
            pageSize: ""
          },
          classParam: { name: "" },
          subjectParam: { courseName: "" }
        }
      });
    },
    // 查询任务列表
    queryTaskList() {
      this.$root
        .request({
          url: `/task/task/template/query`,
          method: "POST",
          data: { status: 1, parentId: 0, subId: this.dialogForm.subId }
        })
        .then(res => {
          this.taskList = res.result;
          // 切换学科时，置空任务
          // this.dialogForm.hostTaskId = "";
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 调整学科
    handelChangeSubjects() {
      this.queryTaskList();
      this.dialogForm.hostTaskId = "";
    },
    // 添加或编辑
    handleEdit(row) {
      if (row) {
        // 编辑模式
        this.isEdit = true;
        this.dialogForm = {
          id:row.id,
          subId: row.subject
            ? this.subjects.find(item => item.courseName === row.subject).id
            : "",
          settingFraction: row.settingFraction || "",
          examName: row.eduManExamRooms.map(item => item.roomName),
          datetimerange: [
            row.examStartTime || "",
            row.examEndTime || ""
          ].filter(item => item),
          hostTaskId: row.hostTaskId || "",
          peiScores: row.peiScores || "",
          supplementLine: row.supplementLine || "",
          oneStarLine: row.oneStarLine || "",
          twoStarLine: row.twoStarLine || "",
          threeStarLine: row.threeStarLine || ""
        };
        this.queryTaskList();
        this.examRoomList = this.examRoomList.map(item => {
          const curr = row.eduManExamRooms.find(
            er => er.roomId === item.roomId
          );
          return curr
            ? {
                ...item,
                fieldNumbers: curr.fieldNumbers || "",
                teacherList: curr.teacher.split(",") || []
              }
            : { ...item };
        });
      } else {
        // 新建模式
        this.isEdit = false;
        this.dialogForm = {
          subId: "",
          settingFraction: "",
          examName: [],
          datetimerange: [],
          hostTaskId: "",
          peiScores: "",
          supplementLine: "",
          oneStarLine: "",
          twoStarLine: "",
          threeStarLine: ""
        };
        // 重置考场列表中绑定信息
        this.examRoomList = this.examRoomList.map(item => ({
          ...item,
          fieldNumbers: "",
          teacherList: []
        }));
      }
      this.dialogVisible = true;
    },
    // 编辑提交
    handleSubmit() {
      const { id, batch, type } = this.$route.query;
      const {
        subId,
        settingFraction,
        datetimerange,
        examName,
        hostTaskId,
        peiScores,
        supplementLine,
        oneStarLine,
        twoStarLine,
        threeStarLine
      } = this.dialogForm;

      let sendData = {
        id:this.dialogForm.id,
        batch,
        subId,
        type,
        schoolId: this.schoolId,
        settingFraction,
        examStartTime: datetimerange[0] || "",
        examEndTime: datetimerange[1] || "",
        examRoomParams: [],
        examLicenceParam: {
          hostTaskId,
          peiScores,
          supplementLine,
          oneStarLine,
          twoStarLine,
          threeStarLine,
          type
        }
      };
      sendData.examRoomParams = this.examRoomList
        .filter(item => examName.find(en => en === item.className))
        .map(item => ({
          examId: id,
          roomId: item.roomId,
          teacher: item.teacherList.join(","),
          fieldNumbers: item.fieldNumbers,
          type
        }));
      if (this.isEdit) {
        // 编辑模式
        this.$root
          .request({
            url: `/task/exam/update/exams`,
            method: "POST",
            data: sendData
          })
          .then(this.handleEditSucceed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        // 添加模式
        this.$root
          .request({
            url: `/task/exam/add/sub`,
            method: "POST",
            data: sendData
          })
          .then(this.handleEditSucceed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 编辑成功回调
    handleEditSucceed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableList();
      this.dialogVisible = false;
    },
    // 生成准考证
    handleCreateCard() {
      this.$root
        .request({
          url: `/task/exam/exam/licence`,
          method: "POST",
          data: { batch: this.$route.query.batch }
        })
        .then(() => {
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.exam-room-row {
  display: flex;
  margin: 0 0 16px 0;
  .el-input {
    max-width: 9em;
    margin: 0 0 0 1em;
  }
}
.form-col2 {
  display: flex;
  margin: 24px 0 0 0;
  justify-content: space-between;
  & > div {
    display: flex;
    width: 48%;
    & > span {
      width: 6em;
      flex-shrink: 0;
    }
  }
}
.form-col3 {
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    width: 28%;
    & > span {
      width: 3em;
      flex-shrink: 0;
    }
  }
}
</style>

