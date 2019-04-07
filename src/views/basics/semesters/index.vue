<template>
  <div class="base-semesters">
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
        <el-table :data="listData">
          <el-table-column
            prop="ternName"
            label="年份"
            align="center"
          />
          <el-table-column
            prop="ternValue"
            label="学期"
            align="center"
          />
          <el-table-column
            prop="startDay"
            label="开始时间"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.startDay | date2dateStr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="endDay"
            label="结束时间"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.endDay | date2dateStr}}
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
              >修改</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
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
      title="编辑学期"
      @opened="$refs.editForm.clearValidate()"
    >
      <el-form
        ref="editForm"
        :model="dialogForm"
        label-width="7em"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="ternName"
              label="年份："
              :rules="[{ required: true, message: '请选择年份'}]"
            >
              <el-date-picker
                v-model="dialogForm.ternName"
                type="year"
                value-format="yyyy"
                placeholder="选择年"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="ternValue"
              label="学期："
              :rules="[{ required: true, message: '请输入学期'}]"
            >
              <el-input v-model="dialogForm.ternValue">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="startDay"
              label="开始时间："
              :rules="[{ required: true, message: '请选择日期'}]"
            >
              <el-date-picker
                v-model="dialogForm.startDay"
                type="date"
                value-format="timestamp"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="endDay"
              label="结束时间："
              :rules="[{ required: true, message: '请选择日期'}]"
            >
              <el-date-picker
                v-model="dialogForm.endDay"
                type="date"
                value-format="timestamp"
                placeholder="选择日期"
              />
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
import Pagination from "@/components/Pagination";
export default {
  name: "BaseSemesters",
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      dialogVisible: false,
      loading: false,
      dialogForm: {
        ternValue: "",
        ternName: "",
        startDay: "",
        endDay: ""
      },
      listData: []
    };
  },
  created() {
    this.queryTableData();
  },
  methods: {
    // 获取列表数据
    queryTableData(queryKeys = {}) {
      const { page, limit: pageSize } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/man/tern/querys`,
          method: "POST",
          data: { page, pageSize, ...queryKeys }
        })
        .then(res => {
          this.listData = res.result;
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryTableData({ page, pageSize });
    },
    // 编辑
    handleEdit(row) {
      if (row) {
        this.dialogForm = {
          id: row.id,
          ternValue: row.ternValue || "",
          ternName: row.ternName || "",
          startDay: row.startDay || "",
          endDay: row.endDay || ""
        };
      } else {
        this.dialogForm = {
          ternValue: "",
          ternName: "",
          startDay: "",
          endDay: ""
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
              url: `/man/tern/delete/${row.id}`,
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
    // 提交
    handleSubmit() {
      const { id, ternValue, ternName, startDay, endDay } = this.dialogForm;
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (id) {
            this.$root
              .request({
                url: `/man/tern/update/${id}`,
                method: "POST",
                data: { id, ternValue, ternName, startDay, endDay }
              })
              .then(this.handleSucceed)
              .catch(err => {
                window.console.error(err);
              });
          } else {
            this.$root
              .request({
                url: `/man/tern/add`,
                method: "POST",
                data: { ternValue, ternName, startDay, endDay }
              })
              .then(this.handleSucceed)
              .catch(err => {
                window.console.error(err);
              });
          }
        }
      });
    },
    // 操作成功
    handleSucceed() {
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
