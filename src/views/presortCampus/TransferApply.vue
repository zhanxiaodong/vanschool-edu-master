<template>
  <el-card shadow="never">
    <div class="table-container">
      <el-table :data="listData">
        <el-table-column
          prop="f1"
          label="学生姓名"
          align="center"
        />
        <el-table-column
          prop="f2"
          label="报读科目"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="f3"
          label="报名时间"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="f4"
          label="预估入学时间"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="f5"
          label="产品"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="f6"
          label="跟进状态"
          align="center"
        />
        <el-table-column
          prop="f7"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="f8"
          label="顾问"
          align="center"
        />
        <el-table-column
          prop="f9"
          label="发起校区"
          align="center"
        />
        <el-table-column
          prop="f10"
          label="转到校区"
          align="center"
        />
        <el-table-column
          prop="f11"
          label="理由"
        />
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
            >同意</el-button>
            <el-button type="text">驳回</el-button>
            <el-button type="text">修改目标校区</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "transferApply",
  data() {
    return {
      listData: [
        {
          f1: "张三丰",
          f2: "语、数、英",
          f3: "2018-05-29",
          f4: "2018-05-29",
          f5: "浙江联考冲刺营",
          f6: "预报名",
          f7: "",
          f8: "李明明",
          f9: "银湖校区",
          f10: "校区二",
          f11: ""
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      window.console.log(row);
    }
  }
};
</script>