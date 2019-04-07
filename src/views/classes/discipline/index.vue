<template>
  <div class="classes-discipline">
    <el-card shadow="never">
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <el-row class="table-tools-bar">
        <el-col style="text-align:right">
          <el-button type="primary">导出</el-button>
          <el-button
            type="primary"
            @click="dialogVisible=true"
          >添加违纪</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="tableData">
          <el-table-column
            prop="className"
            label="班级"
            align="center"
          />
          <el-table-column
            prop="dormName"
            label="寝室"
            align="center"
          />
          <el-table-column
            prop="name"
            label="学生姓名"
            align="center"
          />
          <el-table-column
            prop="disciplineType"
            label="纪律分类"
            align="center"
          />
          <el-table-column
            prop="dharma"
            label="戒条"
            align="center"
          />
          <el-table-column
            prop="content"
            label="纪律问题"
            align="center"
            min-width="200"
          />
          <el-table-column
            prop="score"
            label="分值"
            align="center"
          />
          <el-table-column
            prop="dateTime"
            label="时间"
            align="center"
            min-width="140"
          >
            <template slot-scope="scope">{{scope.row.dateTime | date2str}}</template>
          </el-table-column>
          <el-table-column
            prop="result"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.result | status}}</template>
          </el-table-column>
          <el-table-column
            prop="handlePeople"
            label="处理人"
            align="center"
          />
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
      title="添加违纪"
    >
      <el-form
        :model="dialogForm"
        label-width="6em"
      >
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="学号：">
              <el-input
                v-model="dialogForm.studNo"
                @blur="handleQueryInfo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input
                v-model="dialogForm.name"
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
                v-model="dialogForm.dormName"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纪律分类：">
              <el-select
                v-model="dialogForm.disciplineType"
                @change="handleTypeChange"
              >
                <el-option
                  :value="2"
                  label="寝室"
                ></el-option>
                <el-option
                  :value="3"
                  label="课堂"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="disciplineList.length > 0"
            :span="24"
          >
            <el-form-item label="纪律问题：">
              <el-select v-model="disciplineId">
                <el-option
                  v-for="item in disciplineList"
                  :key="item.id"
                  :label="`${item.rule} ${item.ruleDetail} -${item.deduct}`"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Discipline",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        dates: {
          label: "时间",
          type: "daterange",
          col: { md: 8, lg: 5, xl: 5 }
        },
        class: {
          label: "班级",
          type: "select",
          options: [],
          col: { md: 6, lg: 5, xl: 5 }
        },
        name: { label: "姓名", type: "input", col: { md: 6, lg: 5, xl: 5 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogForm: {
        className: "",
        dormName: "",
        studNo: "",
        name: "",
        disciplineType: "",
        dharma: "",
        content: "",
        score: "",
        handlePeople: "",
        studentId: ""
      },
      disciplineId: "",
      queryParam: {
        student: {
          name: "",
          studNo: ""
        },
        deductionParam: {
          content: "",
          disciplineType: "",
          startDate: "",
          endDate: "",
          page: 1,
          pageSize: 20
        },
        manClass: {
          name: ""
        },
        room: {
          roomName: ""
        }
      },
      loading: false,
      disciplineList: []
    };
  },
  created() {
    this.queryTableData();
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.searchFormData.class.options = res.result.map(item => ({
          label: item.name,
          value: item.name
        }));
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取列表数据
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/deduct/query`,
          method: "POST",
          data: this.queryParam
        })
        .then(res => {
          this.tableData = res.result.map(item => ({
            className: item.manClass.name,
            dormName: item.room.roomName,
            name: item.student.name,
            disciplineType: item.deductionParam.disciplineType,
            dharma: item.deductionParam.dharma,
            content: item.deductionParam.content,
            score: item.deductionParam.score,
            handlePeople: item.deductionParam.handlePeople,
            dateTime: item.deductionParam.startDate,
            result: item.deductionParam.result
          }));
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSearch(keys) {
      if (keys.dates) {
        this.queryParam.deductionParam.startDate = keys.dates[0]
          ? keys.dates[0].getTime()
          : "";
        this.queryParam.deductionParam.endDate = keys.dates[1]
          ? keys.dates[1].getTime()
          : "";
      }
      this.queryParam.manClass.name = keys.class || "";
      this.queryParam.student.name = keys.name;
      this.queryTableData();
    },
    // 翻页
    handleChangePage({ page, pageSize }) {
      this.queryParam.deductionParam.page = page;
      this.queryParam.deductionParam.pageSize = pageSize;
      this.queryTableData();
    },
    // 输入学号和姓名时，查询学生信息
    handleQueryInfo() {
      const { studNo, name } = this.dialogForm;
      if (studNo || name) {
        this.$root
          .request({
            url: `/man/student/find/condition`,
            method: "POST",
            data: { studNo: studNo || "", name: name || "" }
          })
          .then(res => {
            if (res[0]) {
              this.dialogForm.className = res[0].studentClass.name;
              this.dialogForm.dormName = res[0].studentInfo.room;
              this.dialogForm.studentId = res[0].student.id;
              this.dialogForm.studNo = res[0].student.studNo;
              this.dialogForm.name = res[0].student.name;
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
    // 纪律分类切换
    handleTypeChange(id) {
      this.$root
        .request({
          url: `/man/rule/query`,
          method: "POST",
          data: {
            schoolId: this.schoolId,
            type: id
          }
        })
        .then(res => {
          this.disciplineList = res;
          this.dialogForm.problem = "";
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 提交
    handleSubmit() {
      const { studentId, disciplineType, handlePeople } = this.dialogForm;
      const currDiscipline = this.disciplineList.find(
        item => item.id === this.disciplineId
      );
      let sendData = {
        studentId,
        disciplineType: { "2": "寝室", 3: "课堂" }[disciplineType],
        handlePeople,
        dharma: currDiscipline.rule,
        content: currDiscipline.ruleDetail,
        score: currDiscipline.deduct
      };
      this.$root
        .request({
          url: `/man/deduct/add`,
          method: "POST",
          data: sendData
        })
        .then(() => {
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
          this.queryTableData();
          this.dialogVisible = false;
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  },
  filters: {
    status(val) {
      return { 1: "发起", 2: "已被审核，确定无误", 3: "审核驳回" }[val];
    }
  }
};
</script>
