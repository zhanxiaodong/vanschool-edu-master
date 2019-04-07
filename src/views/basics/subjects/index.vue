<template>
  <div class="base-grades">
    <el-card shadow="never">
      <el-row class="simple-search-bar">
        <el-col :span="6">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleEdit(null)"
          >添 加</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="subjects">
          <el-table-column
            prop="courseName"
            label="科目"
            align="center"
          />
          <!-- <el-table-column prop="hours" label="课时" align="center"/> -->
          <el-table-column
            label="是否主课"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.type===1">
                <i class="el-icon-check t-green" />
              </template>
              <template v-else>
                <i class="el-icon-close t-pink" />
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="是否选课"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.type===2">
                <i class="el-icon-check t-green" />
              </template>
              <template v-else>
                <i class="el-icon-close t-pink" />
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="520px"
      title="编辑科目"
    >
      <el-form label-width="4em">
        <el-form-item label="科目：">
          <el-input v-model="dialogForm.courseName" />
        </el-form-item>
        <el-form-item label="主课：">
          <el-select v-model="dialogForm.type">
            <el-option
              :value="1"
              label="是（主课）"
            />
            <el-option
              :value="2"
              label="否（选课）"
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
          @click="updateSubjectType"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseGrades",
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        courseName: "",
        type: "",
        remark: ""
      },
      subjects: [],
      loading: false
    };
  },
  created() {
    this.getSubjectData();
  },
  methods: {
    // 获取所有学科的数据
    getSubjectData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/subject/querys`,
          method: "POST"
        })
        .then(res => {
          this.subjects = res.result;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 更新学科数据 - 主课|选课
    updateSubjectType() {
      const { id, courseName, remark, type } = this.dialogForm;
      if (id) {
        this.$root
          .request({
            url: `/man/subject/update/${id}`,
            method: "POST",
            data: { id, courseName, remark, type }
          })
          .then(this.handleSucceed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/subject/add`,
            method: "POST",
            data: { courseName, remark, type }
          })
          .then(this.handleSucceed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 添加编辑操作
    handleEdit(row) {
      if (row) {
        this.dialogForm = {
          id: row.id,
          courseName: row.courseName,
          type: row.type,
          remark: row.remark
        };
      } else {
        this.dialogForm = {
          courseName: "",
          type: "",
          remark: ""
        };
      }
      this.dialogVisible = true;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$root
            .request({
              url: `/man/subject/delete/${row.id}`,
              method: "POST",
              data: { id: row.id }
            })
            .then(this.handleSucceed)
            .catch(err => {
              window.console.error(err);
            });
        })
        .catch(() => {});
    },
    // 操作成功
    handleSucceed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.getSubjectData();
      this.dialogVisible = false;
    }
  }
};
</script>
