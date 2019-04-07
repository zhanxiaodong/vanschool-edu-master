<template>
  <div class="analysis-risk">
    <div class="table-container">
      <el-table
        :data="listData"
        @cell-click="handleCellClick"
      >
        <el-table-column
          prop="className"
          label="班级/科目"
        />
        <el-table-column
          prop="f1"
          label="政治"
        />
        <el-table-column
          prop="f2"
          label="历史"
        />
        <el-table-column
          prop="f3"
          label="地理"
        />
        <el-table-column
          prop="f4"
          label="物理"
        />
        <el-table-column
          prop="f5"
          label="化学"
        />
        <el-table-column
          prop="f6"
          label="生物"
        />
        <el-table-column
          prop="f7"
          label="技术"
        />
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="学生列表"
    >
      显示学生列表
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AnalysisRisk",
  data() {
    return {
      listData: [
        {
          className: "1任-A班",
          f1: "20",
          f2: "40",
          f3: "",
          f4: "",
          f5: "",
          f6: "",
          f7: ""
        },
        {
          className: "2姜刘-E班",
          f1: "20",
          f2: "",
          f3: "70",
          f4: "",
          f5: "",
          f6: "",
          f7: ""
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    handleCellClick(row, column) {
      window.console.log(row, column.property, row[column.property],this.dialogVisible);
      this.dialogVisible = true;
    }
  }
};
</script>