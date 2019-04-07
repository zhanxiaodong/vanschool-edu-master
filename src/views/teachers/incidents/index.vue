<template>
  <div class="teachers-incidents">
    <el-card
      class="card-style"
      shadow="never"
    >
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <el-row class="table-tools-bar">
        <el-col style="text-align:right">
          <el-button
            type="primary"
            @click="dialogVisible=true"
          >录入教学事故</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="listData">
          <el-table-column
            prop="dateTime"
            label="时间"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              {{scope.row.dateTime | date2dateStr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="事故分类"
            align="center"
          />
          <el-table-column
            prop="grade"
            label="事故等级"
            align="center"
          />
          <el-table-column
            prop="content"
            label="事故内容"
            min-width="150"
            align="center"
          />
          <el-table-column
            prop="reason"
            label="事故原因"
            min-width="180"
            align="center"
          />
          <el-table-column
            prop="teacher"
            label="事故老师"
            align="center"
          />
          <el-table-column
            prop="leaderName"
            label="直属上级"
            align="center"
          />
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">
              {{({1:'发起中',2:'已被审核：确认无误 ',3:'审核驳回'})[scope.row.status]}}
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="录入事故"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="事故老师：">
              <el-select
                filterable
                v-model="dialogForm.teacherId"
              >
                <el-option
                  v-for="item in teacherList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事故分类：">
              <el-select
                v-model="dialogForm.type"
                @change="handleChangeRule"
              >
                <el-option
                  v-for="(item,index) in ruleList"
                  :key="index"
                  :label="item.type"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事故等级：">
              <el-select
                v-model="dialogForm.level"
                @change="handleChangeRule"
              >
                <el-option
                  v-for="(item,index) in ['A','B','C','D']"
                  :key="item"
                  :value="index+1"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故内容：">
              <el-select v-model="dialogForm.ruleId">
                <el-option
                  v-for="item in ruleContentList"
                  :key="item.id"
                  :label="item.ruleDetail"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故原因：">
              <el-input
                v-model="dialogForm.reason"
                type="textarea"
                rows="3"
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
          type="primary"
          @click="handleSubmit"
        >提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default {
  name: "Incidents",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        startDate: {
          label: "发生时间",
          type: "date",
          col: { md: 8, lg: 6, xl: 6 }
        },
        grade: {
          label: "事故等级",
          type: "select",
          options: [
            {
              label: "A",
              value: 1
            },
            {
              label: "B",
              value: 2
            },
            {
              label: "C",
              value: 3
            },
            {
              label: "D",
              value: 4
            }
          ],
          col: { md: 8, lg: 6, xl: 6 }
        },
        status: {
          label: "事故状态",
          type: "select",
          options: [
            {
              label: "发起中",
              value: 1
            },
            {
              label: "已被审核：确认无误 ",
              value: 2
            },
            {
              label: "审核驳回",
              value: 3
            }
          ],
          col: { md: 8, lg: 6, xl: 6 }
        },
        teacher: {
          label: "责任老师",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        leaderName: {
          label: "直属上级",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        rule: {
          label: "事故分类",
          type: "select",
          options: [],
          col: { md: 8, lg: 6, xl: 6 }
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      listData: [],
      dialogVisible: false,
      dialogForm: {
        teacherId: "",
        ruleId: "",
        reason: "",
        schoolId: "",
        type: "",
        level: ""
      },
      teacherList: [],
      ruleList: [],
      queryKeys: {
        teacher: {
          name: "",
          leaderName: "",
          schoolId: this.schoolId
        },
        accidentParam: {
          page: 1,
          pageSize: 20,
          schoolId: this.schoolId,
          startDate: "",
          result: ""
        },
        rule: {
          type: 1,
          rule: "",
          schoolId: this.schoolId,
          grade: ""
        }
      },
      loading: false
    };
  },
  created() {
    this.queryTableData();
    this.queryRuleType();
    this.queryTeacherList();
    this.queryRuleList();
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    },
    ruleContentList() {
      return this.ruleList[this.dialogForm.type]
        ? this.ruleList[this.dialogForm.type].content.filter(
            item => item.grade === this.dialogForm.level
          )
        : [];
    }
  },
  methods: {
    // 获取事故分类
    queryRuleType() {
      this.$root
        .request({
          url: `/man/rule/querys`,
          method: "POST",
          data: { type: 1, schoolId: this.schoolId }
        })
        .then(res => {
          this.searchFormData.rule.options = res.map(item => ({
            label: item,
            value: item
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取教师列表
    queryTeacherList() {
      this.$root
        .request({
          url: `/man/teacher/querys`,
          method: "POST",
          data: {
            teacherParam: {
              name: "",
              groups: "",
              result: ""
            },
            classParam: { name: "" },
            subjectParam: { courseName: "" }
          }
        })
        .then(res => {
          this.teacherList = res.result.map(item => ({
            label: item.teacher.name,
            value: item.teacher.id
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取事故规则
    queryRuleList() {
      this.$root
        .request({
          url: `/man/rule/query`,
          method: "POST",
          data: { schoolId: this.schoolId, type: 1 }
        })
        .then(res => {
          this.ruleList = this.listDataClearup(res);
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 整理列表数据
    listDataClearup(data) {
      let finalData = {};
      data.forEach(item => {
        if (finalData[item.rule]) {
          finalData[item.rule].push(item);
        } else {
          finalData[item.rule] = [item];
        }
      });
      return Object.keys(finalData).map(key => ({
        type: key,
        content: finalData[key]
      }));
    },
    // 重置选项
    handleChangeRule() {
      this.dialogForm.ruleId = "";
    },
    // 获取列表数据
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/teacher/accident/query`,
          method: "POST",
          data: this.queryKeys
        })
        .then(res => {
          this.listData = res.result.map(item => ({
            dateTime: item.accidentParam.startDate,
            type: item.rule.rule,
            grade: { "1": "A", 2: "B", 3: "C", 4: "D" }[item.rule.grade],
            content: item.rule.ruleDetail,
            reason: item.accidentParam.reason,
            teacher: item.teacher.name,
            leaderName: item.teacher.leaderName,
            status: item.accidentParam.result
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
    // 搜索
    onSearch(form) {
      this.queryKeys = {
        teacher: {
          name: form.teacher,
          leaderName: form.leaderName,
          schoolId: this.schoolId
        },
        accidentParam: {
          page: 1,
          pageSize: 20,
          schoolId: this.schoolId,
          startDate: form.startDate ? form.startDate.getTime() :'',
          result: form.status
        },
        rule: {
          type: 1,
          rule: form.rule,
          schoolId: this.schoolId,
          grade: form.grade
        }
      };
      this.queryTableData();
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      window.console.log({ page, pageSize });
    },
    // 表单提交
    handleSubmit() {
      const { teacherId, ruleId, reason } = this.dialogForm;
      this.$root
        .request({
          url: `/man/teacher/accident/add`,
          method: "POST",
          data: { teacherId, ruleId, reason, schoolId: this.schoolId }
        })
        .then(() => {
          this.queryTableData();
          this.dialogForm = {
            teacherId: "",
            ruleId: "",
            reason: "",
            schoolId: "",
            type: "",
            level: ""
          };
          this.dialogVisible = false;
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>
