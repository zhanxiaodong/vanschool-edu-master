<template>
  <div class="base-incidents">
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
            prop="type"
            label="类型"
            align="center"
          />
          <el-table-column
            label="事故内容"
            min-width="140"
            align="center"
          >
            <template slot-scope="scope">
              <div
                class="cell-row"
                v-for="(item, index) in scope.row.content"
                :key="index"
              >{{ item.ruleDetail }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="事故等级"
            align="center"
          >
            <template slot-scope="scope">
              <div
                class="cell-row"
                v-for="(item, index) in scope.row.content"
                :key="index"
              >{{ ['A','B','C','D'][item.grade-1]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div
                class="cell-row"
                v-for="(item, index) in scope.row.content"
                :key="index"
              >
                <el-button
                  type="text"
                  @click="handleEdit(item)"
                >编辑</el-button>
                <el-button
                  type="text"
                  @click="handleDelete(item)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑事故规则"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="事故分类：">
              <el-input v-model="dialogForm.rule"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故内容：">
              <el-input v-model="dialogForm.ruleDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事故等级：">
              <el-select v-model="dialogForm.grade">
                <el-option
                  v-for="(item,index) in ['A','B','C','D']"
                  :key="item"
                  :label="item"
                  :value="index+1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扣分：">
              <el-input v-model="dialogForm.deduct"></el-input>
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
export default {
  name: "BaseIncidents",
  data() {
    return {
      loading: false,
      listData: [],
      dialogVisible: false,
      dialogForm: {
        rule: "",
        ruleDetail: "",
        grade: "",
        deduct: ""
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
      this.loading = true;
      this.$root
        .request({
          url: `/man/rule/query`,
          method: "POST",
          data: { type: 1, schoolId: this.schoolId }
        })
        .then(res => {
          this.listDataClearup(res);
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
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
      this.listData = Object.keys(finalData).map(key => ({
        type: key,
        content: finalData[key]
      }));
    },
    // 编辑
    handleEdit(row) {
      if (row) {
        this.dialogForm = {
          id: row.id,
          rule: row.rule,
          ruleDetail: row.ruleDetail,
          grade: row.grade,
          deduct: row.deduct
        };
      } else {
        this.dialogForm = {
          rule: "",
          ruleDetail: "",
          grade: "",
          deduct: ""
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
          this.$root.request({
            url : `/man/rule/delete/${row.id}`,
            method:'POST',
            data:{id:row.id,schoolId:this.schoolId}
          }).then(this.handleSucceed).catch(err=>{
            window.console.error(err);
          });
        })
        .catch(() => {});
    },
    // 修改添加提交
    handleSubmit() {
      const { rule, ruleDetail, deduct, grade, id } = this.dialogForm;
      if (id) {
        this.$root
          .request({
            url: `/man/rule/update/${id}`,
            method: "POST",
            data: {
              id,
              schoolId: this.schoolId,
              type: 1,
              rule,
              ruleDetail,
              deduct,
              grade
            }
          })
          .then(this.handleSucceed)
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
              type: 1,
              rule,
              ruleDetail,
              deduct,
              grade
            }
          })
          .then(this.handleSucceed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
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