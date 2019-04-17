<template>
  <div class="invalids">
    <div class="button-header">
      <el-button @click="handleEdit(null)">添加</el-button>
    </div>
    <div style="padding: 12px 18px">
      <div class="table-container">
        <el-table
          :data="list"
          row-key="id"
        >
          <el-table-column
            prop="followName"
            label="字典编码"
          />
          <el-table-column
            prop="desc"
            label="字典描述"
          />
          <el-table-column
            prop="seq"
            label="代码值"
          />
          <el-table-column
            prop="doubleVal"
            label="代码描述"
          />
          <el-table-column label="操作">
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
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑跟进阶段"
      width="520px"
    >
      <el-form label-width="6em">
        <el-form-item label="字典编码:">
          <el-input v-model="formData.followName" />
        </el-form-item>
        <el-form-item label="字典描述:">
          <el-input v-model="formData.seq" />
        </el-form-item>
        <el-form-item label="代码值:">
          <el-input v-model="formData.doubleVal" />
        </el-form-item>
        <el-form-item label="代码描述:">
          <el-input
            v-model="formData.desc"
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
  name: 'Invalids',
  data() {
    return {
      list: [],
      dialogVisible: false,
      formData: {
        followName: '',
        seq: '',
        desc: '',
        doubleVal: ''
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.$root
        .http({
          url: `/dict/query`,
          method: 'POST',
          data: { type: 7, orderBy: 'intVal' }
        })
        .then(res => {
          this.list = res.result.map(item => ({
            ...JSON.parse(item.dictValue),
            id: item.id,
            doubleVal: item.doubleVal
          }))
        })
        .catch(err => {
          window.console.error(err)
        })
    },
    handleEdit(row) {
      if (row) {
        this.formData = {
          id: row.id,
          followName: row.followName,
          seq: row.seq,
          desc: row.desc,
          doubleVal: row.doubleVal
        }
      } else {
        this.formData = {
          followName: '',
          seq: '',
          desc: '',
          doubleVal: ''
        }
      }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$root
            .http({
              url: `/tag/clue/source/delete/${row.id}`,
              method: 'POST',
              data: { id: row.id }
            })
            .then(res => {
              this.getTableData()
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
            })
            .catch(err => {
              window.console.error(err)
            })
        })
        .catch(() => {})
    },
    handleSubmit() {
      if (this.formData.id) {
        this.$root
          .http({
            url: `/tag/clue/source/update/${this.formData.id}`,
            method: 'POST',
            data: {
              id: this.formData.id,
              intVal: this.formData.seq,
              doubleVal: this.formData.doubleVal,
              dictValue: JSON.stringify({
                followName: this.formData.followName,
                seq: this.formData.seq,
                desc: this.formData.desc
              })
            }
          })
          .then(this.submitSucceed)
          .catch(err => {
            window.console.error(err)
          })
      } else {
        this.$root
          .http({
            url: `/tag/follow/stage/add`,
            method: 'POST',
            data: {
              intVal: this.formData.seq,
              doubleVal: this.formData.doubleVal,
              dictKey: 'followstage' + new Date().getTime(),
              dictValue: JSON.stringify({ ...this.formData })
            }
          })
          .then(this.submitSucceed)
          .catch(err => {
            window.console.error(err)
          })
      }
    },
    submitSucceed() {
      this.dialogVisible = false
      this.getTableData()
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>