<template>
  <div class="base-grades">
    <el-card shadow="never">
      <div v-loading="loading" class="table-container">
        <el-table :data="listData">
          <el-table-column
            prop="name"
            label="科目"
            align="center"
          />
          <el-table-column
            prop="score"
            label="危分"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑危分"
    >
      <el-form label-width="4em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="科目：">
              <el-input
                v-model="dialogForm.name"
                disabled
              />
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="危分：">
              <el-input
                type="number"
                v-model="dialogForm.score"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseGrades",
  data() {
    return {
      loading:false,
      dialogVisible: false,
      dialogForm: {
        name: "",
        score: ""
      },
      listData: []
    };
  },
  created() {
    this.queryTableData();
  },
  methods: {
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/danger/score/query`,
          method: "POST",
          data: { type: 1 }
        })
        .then(res => {
          this.listData = res;
        })
        .catch(err => {
          window.console.error(err);
        }).finally(()=>{
          this.loading = false;
        });
    },
    handleEdit(row) {
      this.dialogForm = {
        id: row.id,
        score: row.score,
        name: row.name
      };
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.$root
        .request({
          url: `/man/danger/score/update/${this.dialogForm.id}`,
          method: "POST",
          data: { ...this.dialogForm, type: 1 }
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
  }
};
</script>
