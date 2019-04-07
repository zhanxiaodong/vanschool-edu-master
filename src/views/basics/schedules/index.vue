<template>
  <div class="base-schedules">
    <el-card shadow="never">
      <el-row class="simple-search-bar">
        <el-col :span="6">
          <el-button
            icon="el-icon-plus"
            type="primary"
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
            prop="course"
            label="节次"
            align="center"
          />
          <el-table-column
            label="时间"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.courseStar }} - {{scope.row.courseEnd }}
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
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="isEditMode ? '编辑课时' : '添加课时'"
      width="520px"
    >
      <el-form label-width="4em">
        <el-form-item label="节次：">
          <el-input
            v-model="formData.course"
            placeholder="输入节次名称"
          />
        </el-form-item>
        <el-form-item label="时间：">
          <div class="time-select-row">
            <el-time-select
              placeholder="起始时间"
              v-model="formData.courseStar"
              :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            >
            </el-time-select>
            <span>至</span>
            <el-time-select
              placeholder="起始时间"
              v-model="formData.courseEnd"
              :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            >
            </el-time-select>
          </div>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input
            v-model="formData.seq"
            placeholder="输入序号"
          />
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
export default {
  name: "BasicsSchedules",
  data() {
    return {
      dialogVisible: false,
      formData: {
        course: "",
        courseStar: "",
        courseEnd: "",
        seq: ""
      },
      listData: [],
      loading: false,
      isEditMode: false
    };
  },
  created() {
    this.queryTableList();
  },
  methods: {
    // 获取列表数据
    queryTableList() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/lesson/day/queryList`,
          method: "POST",
          data: {}
        })
        .then(res => {
          this.listData = res;
        })
        .catch(err => {
          window.console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 添加编辑
    handleEdit(row) {
      if (row) {
        this.formData = {
          id: row.id,
          course: row.course,
          courseStar: row.courseStar,
          courseEnd: row.courseEnd,
          seq: row.seq
        };
        this.isEditMode = true;
      } else {
        this.formData = {
          course: "",
          courseStar: "",
          courseEnd: "",
          seq: ""
        };
        this.isEditMode = false;
      }
      this.dialogVisible = true;
    },
    // 删除操作
    handleDelete(row) {
      this.$root
        .request({
          url: `/man/lesson/day/delete/${row.id}`,
          method: "POST",
          data: { id: row.id, seq: row.seq }
        })
        .then(this.handleSuccessed)
        .catch(err => {
          window.console.error(err);
        });
    },
    // 编辑修改提交
    handleSubmit() {
      let { course, seq, id, courseStar, courseEnd } = this.formData;
      if (this.isEditMode) {
        this.$root
          .request({
            url: `/man/lesson/day/update/${id}`,
            method: "POST",
            data: { id, course, courseStar, courseEnd, seq }
          })
          .then(this.handleSuccessed)
          .catch(err => {
            window.console.log(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/lesson/day/add`,
            method: "POST",
            data: { course, seq, courseStar, courseEnd }
          })
          .then(this.handleSuccessed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 操作成功
    handleSuccessed() {
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

<style lang="scss" scoped>
.time-select-row {
  display: flex;
  & span {
    margin: 0 1.6em;
  }
}
</style>
