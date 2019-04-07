<template>
  <div class="grades-exams">
    <el-form label-width="4em">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="班级：">
            <el-select v-model="queryKeys.classId" @change="queryTableData">
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
            <el-select v-model="queryKeys.subId" @change="queryTableData">
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
          <el-form-item label="考试：">
            <el-select v-model="queryKeys.examId" @change="queryTableData">
              <el-option
                v-for="item in examList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
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
      <el-table :data="list">
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
          prop="score"
          label="分数"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="年级均分"
          align="center"
        >
          <template slot-scope="score">
            {{score.row.evaluate.toFixed(2)}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="排名">
          <template slot-scope="scope">
           
          </template>
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="目标达成率"
        /> -->
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
      :visible.sync="dialogVisible"
      title="录入成绩"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="所属班级：">
              <el-select
                v-model="dialogForm.class"
                @change="queryStudentList"
              >
                <el-option
                  v-for="item in classList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属科目：">
              <el-select v-model="dialogForm.subjects">
                <el-option
                  v-for="item in subjectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考试：">
              <el-select v-model="dialogForm.exam">
                <el-option
                  v-for="item in examList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col
            v-for="stu in studentList"
            :key="stu.studentId"
            :span="8"
          >
            <el-form-item :label="`${stu.studentName}：`">
              <el-input
                v-model="stu.score"
                placeholder="分数"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="info"
          icon="el-icon-upload2"
        >批量导入</el-button>
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
  name: "GradesExams",
  components: { Pagination },
  data() {
    return {
      loading: false,
      queryKeys: {
        classId: "",
        subId: "",
        examId: ""
      },
      classList: [],
      subjectList: [],
      examList: [],
      searchFormData: {
        classId: {
          label: "班级",
          type: "select",
          options: [],
          col: { md: 7, lg: 5, xl: 5 }
        },
        subId: {
          label: "科目",
          type: "select",
          options: [],
          col: { md: 7, lg: 5, xl: 5 }
        },
        exam: {
          label: "考试",
          type: "select",
          options: [],
          col: { md: 7, lg: 5, xl: 5 }
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      showNonResident: true,
      list: [],
      dialogVisible: false,
      dialogForm: {
        class: "",
        subjects: "",
        exam: ""
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
          this.dialogForm.class = res.result[0].id;
          this.queryStudentList(res.result[0].id);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
    // 获取考试列表
    this.$store
      .dispatch("queryExamList")
      .then(res => {
        this.examList = res.result
          .filter(item => item.examName)
          .map(item => ({
            label: item.examName,
            value: item.id
          }));
      })
      .catch(err => {
        window.console.error(err);
      });
    // 获取科目列表
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjectList = res.result.map(item => ({
          label: item.courseName,
          value: item.id
        }));
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  methods: {
    // 获取列表数据
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/task/exam/exam/score/query`,
          method: "POST",
          data: { type: 3, ...this.queryKeys }
        })
        .then(res => {
          this.list = res;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
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
            score: ""
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 查询
    onSearch(form) {
      window.console.log(form);
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      window.console.log(page, pageSize);
    },
    // 录入成绩提交
    handleSubmit() {
      const { class: classId, exam: examId, subjects: subId } = this.dialogForm;
      const sendData = this.studentList.map(item => ({
        classId,
        examId,
        subId,
        score: item.score,
        studentId: item.studentId,
        type: 3
      }));
      this.$root
        .request({
          url: `/task/exam/exam/score/opt/add`,
          method: "POST",
          data: sendData
        })
        .then(() => {
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
          this.dialogForm.subjects = "";
          this.dialogForm.exam = "";
          this.queryStudentList(this.dialogForm.class);
          this.queryTableData();
          this.dialogVisible = false;
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>
