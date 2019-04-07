<template>
  <div class="grades-daily">
    <el-form label-width="6em">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="班级：">
            <el-select v-model="queryKeys.classId">
              <el-option
                v-for="item in classList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科目：">
            <el-select v-model="queryKeys.subId">
              <el-option
                v-for="item in subjectList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学习内容：">
            <el-select v-model="queryKeys.taskId">
              <el-option
                v-for="item in taskList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="queryKeys.date"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button
            type="success"
            icon="el-icon-search"
            @click="onSearch"
          >查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="6">
        <el-switch
          v-model="showNonResident"
          active-text="显示走班学生"
          @change="handleShowExtern"
        >
        </el-switch>
      </el-col>
      <el-col
        :span="18"
        style="text-align:right"
      >
        <el-button
          style="margin:0 0 0 1em"
          type="primary"
          icon="el-icon-plus"
          @click="dialogVisible = true"
        >录入</el-button>
      </el-col>
    </el-row>
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
        <el-table-column
          prop="className"
          label="班级"
          align="center"
        />
        <el-table-column
          prop="studentName"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="belongClass"
          label="所属班级"
          align="center"
        />
        <el-table-column
          prop="subName"
          label="科目"
          align="center"
        />
        <el-table-column
          prop="dailyTaskScore"
          label="每日作业"
          align="center"
        />
        <el-table-column
          prop="dailyScore"
          label="每日过关"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="日期"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.createTime | date2dateStr}}
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
      title="成绩录入"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-select v-model="dialogForm.classId">
                <el-option
                  v-for="item in classList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科目：">
              <el-select v-model="dialogForm.subId">
                <el-option
                  v-for="item in subjectList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期：">
              <el-date-picker v-model="dialogForm.createTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学习内容：">
              <el-select v-model="dialogForm.taskId">
                <el-option
                  v-for="item in taskList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card
          shadow="never"
          class="card-style"
        >
          <div slot="header">
            <strong>每日作业</strong>
          </div>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="分制：">
                <el-input v-model="dialogForm.jobTds" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col
              v-for="(stu,index) in studentList"
              :key="index"
              :span="8"
            >
              <el-form-item :label="`${stu.studentName}：`">
                <el-input
                  v-model="stu.jobScore"
                  placeholder="分数"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never">
          <div slot="header">
            <strong>每日过关</strong>
          </div>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="分制：">
                <el-input v-model="dialogForm.levelTds" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col
              v-for="(stu,index) in studentList"
              :key="index"
              :span="8"
            >
              <el-form-item :label="`${stu.studentName}：`">
                <el-input
                  v-model="stu.levelScore"
                  placeholder="分数"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
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
  name: "GradesDaily",
  components: { Pagination },
  data() {
    return {
      loading: false,
      queryKeys: {
        classId: "",
        subId: "",
        taskId: "",
        result: 1,
        date: ""
      },
      classList: [],
      subjectList: [],
      taskList: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      showNonResident: false,
      listData: [],
      dialogVisible: false,
      dialogForm: {
        classId: "",
        subId: "",
        taskId: "",
        createTime: "",
        jobTds: "",
        levelTds: ""
      },
      studentList: []
    };
  },
  created() {
    this.queryTableData();
    // 获取班级列表
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.classList = res.result.map(item => ({
          label: item.name,
          value: item.id
        }));
        if (res.result[0]) {
          this.queryKeys.classId = res.result[0].id;
          this.queryKeys.class = res.result[0].id;
          this.queryStudentList(res.result[0].id);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
    // 获取科目列表
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjectList = res.result.map(item => ({
          label: item.courseName,
          value: item.id
        }));
        if (res.result && res.result[0]) {
          this.queryTaskList(res.result[0].id);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取学习内容
    queryTaskList(subId) {
      this.$root
        .request({
          url: `/task/task/template/query`,
          method: "POST",
          data: { parentId: 0, status: 1, schoolId: this.schoolId, subId }
        })
        .then(res => {
          this.taskList = res.result.map(item => ({
            label: item.taskTitle,
            value: item.id
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 查询班级学生
    queryStudentList(classId) {
      this.$root
        .request({
          url: `/task/exam/exam/student/${classId}`,
          method: "POST"
        })
        .then(res => {
          this.studentList = res.map(item => ({
            ...item,
            jobScore: "",
            levelScore: ""
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取列表数据
    queryTableData() {
      let queryKeys = {...this.queryKeys};
      queryKeys.startDate = queryKeys.date || '';
      queryKeys.endDate = queryKeys.date ? queryKeys.date + (60*60*24*1000) : '';
      delete queryKeys.date;
      this.loading = true;
      this.$root
        .request({
          url: `/task/exam/exam/score/querys`,
          method: "POST",
          data: queryKeys
        })
        .then(res => {
          this.listData = res;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSearch() {
      this.queryTableData();
    },
    // 是否显示走班学生
    handleShowExtern(val) {
      this.queryKeys.result = val ? 2 : 1;
      this.queryTableData();
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      window.console.log(page, pageSize);
    },
    handleSubmit() {
      const {
        classId,
        subId,
        taskId,
        createTime,
        jobTds,
        levelTds
      } = this.dialogForm;

      window.console.log(createTime);
      const sdp1 = this.studentList.map(item => ({
        studentId: item.studentId,
        classId,
        subId,
        score: item.jobScore,
        taskId,
        createTime,
        type: 1,
        scoreSys: jobTds
      }));
      const sdp2 = this.studentList.map(item => ({
         studentId: item.studentId,
        classId,
        subId,
        score: item.levelScore,
        taskId,
        createTime,
        type: 2,
        scoreSys: levelTds
      }));

      this.$root.request({
        url : `/task/exam/exam/score/opt/add`,
        method:'POST',
        data:[...sdp1,...sdp2]
      }).then(res=>{
        window.console.log(res);
      }).catch(err=>{
        window.console.error(err);
      });
    }
  }
};
</script>

