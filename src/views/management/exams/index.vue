<template>
  <div class="management-exams">
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
          >新增考试</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="isLoading"
        class="table-container"
      >
        <el-table :data="list">
          <el-table-column
            prop="examName"
            label="考试名称"
            min-width="100"
          />
          <el-table-column
            prop="time"
            label="考试时间"
            align="center"
            min-width="190"
          >
            <template slot-scope="scope">
              {{scope.row.examStartTime}} - {{scope.row.examEndTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="classId"
            label="考试班级"
            align="center"
            min-width="140"
          />
          <el-table-column
            prop="subject"
            label="考试科目"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-button type="text">
                <router-link :to="`/management/exams/details?id=${scope.row.id}&batch=${scope.row.batch}&type=${scope.row.type}`">安排考试</router-link>
              </el-button>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
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
            @pagination="handleChangePage"
          />
        </div>
      </div>

    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="isEditMode ? '编辑考试' : '添加考试'"
      width="520px"
    >
      <el-form label-width="6em">
        <el-form-item label="考试名称：">
          <el-input v-model="dialogForm.examName" />
        </el-form-item>
        <el-form-item label="考试类型：">
          <el-select v-model="dialogForm.type">
            <el-option
              label="月考"
              :value="1"
            />
            <el-option
              label="周考"
              :value="2"
            />
            <el-option
              label="入学摸底"
              :value="3"
            />
            <el-option
              label="教学任务考试"
              :value="4"
            />
            <el-option
              label="自定义"
              :value="5"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班型：">
          <el-select
            v-model="dialogForm.classes"
            multiple
            placeholder="选择班型"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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
  name: "ManagementExams",
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      dialogVisible: false,
      dialogForm: {
        examName: "",
        type: "",
        schoolId: 1,
        classes: []
      },
      isEditMode: false,
      classList: [],
      isLoading: false
    };
  },
  created() {
    this.queryTableList();
    // 获取班级列表
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.classList = res.result;
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  methods: {
    // 获取列表
    queryTableList(queryKeys = {}) {
      const { page, limit } = this.listQuery;
      this.isLoading = true;
      this.$root
        .request({
          url: `/task/exam/exam/query`,
          method: "POST",
          data: { page, pageSize: limit,subId:0, ...queryKeys }
        })
        .then(res => {
          this.list = res.result.map(item => ({
            ...item,
            classId: item.classId ? item.classId.replace(",", "") : "",
            examEndTime: this.$root.formatDate.toStr(item.examEndTime),
            examStartTime: this.$root.formatDate.toStr(item.examStartTime)
          }));
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 翻页
    handleChangePage({ page, pageSize }) {
      this.queryTableList({ page, pageSize });
    },
    // 编辑
    handleEdit(row) {
      if (row) {
        const classes = row.classId
          .split(",")
          .map(item => {
            const curr = this.classList.find(c => c.name === item);
            return curr ? curr.id : "";
          })
          .filter(item => item);

        this.dialogForm = {
          id: row.id,
          examName: row.examName,
          type: row.type,
          schoolId: 1,
          classes
        };
        this.isEditMode = true;
      } else {
        this.dialogForm = {
          examName: "",
          type: "",
          schoolId: 1,
          classes: []
        };
        this.isEditMode = false;
      }
      this.dialogVisible = true;
    },
    // 创建和编辑提交
    handleSubmit() {
      const { schoolId, type, examName, classes, id } = this.dialogForm;
      let sendData = { schoolId, type, examName };
      sendData.examClassParams = classes.map(item => ({ classId: item, type }));
      if (this.isEditMode) {
        this.$root
          .request({
            url: `/task/exam/update/exam`,
            method: "POST",
            data: { ...sendData, id }
          })
          .then(this.handleEditSucceed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/task/exam/add`,
            method: "POST",
            data: sendData
          })
          .then(this.handleEditSucceed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    handleEditSucceed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableList();
      this.dialogVisible = false;
    }
  }
};
</script>
