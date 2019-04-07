<template>
  <div class="class-health">
    <el-row class="simple-search-bar">
      <el-col :span="6">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit(null)"
        >添加</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="listData">
        <el-table-column
          prop="position"
          label="位置"
          align="center"
        />
        <el-table-column
          prop="ruleDetail"
          label="检查内容"
          min-width="280"
        />
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑卫生规则"
    >
      <el-form label-width="6em">
        <el-form-item label="检查位置：">
          <el-input v-model="dialogForm.position" />
        </el-form-item>
        <el-form-item label="检查内容：">
          <el-input
            v-model="dialogForm.ruleDetail"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false;">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ClassHealth",
  data() {
    return {
      listData: [],
      dialogVisible: false,
      dialogForm: {
        position: "",
        ruleDetail: "",
        rule: "班级卫生",
        type: 4
      }
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
    queryTableData() {
      this.$root
        .request({
          url: `/man/rule/query`,
          method: "POST",
          data: { type: 4, schoolId: this.schoolId, rule: "班级卫生" }
        })
        .then(res => {
          this.listData = res;
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 编辑
    handleEdit(row) {
      if (row) {
        this.dialogForm.id = row.id;
        this.dialogForm.position = row.position;
        this.dialogForm.ruleDetail = row.ruleDetail;
      } else {
        this.dialogForm = {
          position: "",
          ruleDetail: "",
          rule: "班级卫生",
          type: 4
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
              url: `/man/rule/delete/${row.id}`,
              method: "POST",
              data: { id: row.id, schoolId: this.schoolId }
            })
            .then(this.handleSuccessed)
            .catch(err => {
              window.console.error(err);
            });
        })
        .catch(() => {});
    },
    // 提交编辑
    handleSubmit() {
      const sendData = { ...this.dialogForm };
      if (sendData.id) {
        this.$root
          .request({
            url: `/man/rule/update/${sendData.id}`,
            method: "POST",
            data: {
              schoolId: this.schoolId,
              ...sendData
            }
          })
          .then(this.handleSuccessed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/rule/add`,
            method: "POST",
            data: {
              schoolId: this.schoolId,
              ...sendData
            }
          })
          .then(this.handleSuccessed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 添加编辑成功回调
    handleSuccessed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableData();
      this.dialogVisible = false;
    }
  }
};
</script>