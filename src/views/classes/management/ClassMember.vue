<template>
  <div class="class-member">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-date-picker
          v-model="week"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          size="small"
        >
        </el-date-picker>
      </el-col>
      <el-col
        :span="19"
        style="text-align:right;"
      >
        <el-button>发起结课申请</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column
          prop="f1"
          label="姓名"
          min-width="60"
        />
        <el-table-column
          prop="f2"
          label="学号"
          min-width="60"
          align="center"
        />
        <el-table-column
          prop="f3"
          label="今日纪律扣分"
          min-width="70"
          align="center"
        />
        <el-table-column
          prop="f4"
          label="累计纪律扣分"
          min-width="70"
          align="center"
        />
        <el-table-column
          prop="f5"
          label="今日卫生扣分"
          min-width="70"
          align="center"
        />
        <el-table-column
          prop="f6"
          label="累计卫生扣分"
          min-width="70"
          align="center"
        />
        <el-table-column
          prop="f7"
          label="科目及成绩"
          min-width="160"
          align="center"
        />
        <el-table-column
          label="操作"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({path:'/students/list/student?id=1'})"
              type="text"
            >学员详情</el-button>
            <el-button
              @click="$router.push({path:'/classes/manage/details/studentScore',query:{id:scope.row.f1}})"
              type="text"
            >成绩详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassMember",
  data() {
    return {
      week: "",
      tableData: [
        {
          f1: "张三",
          f2: "1801001",
          f3: "-1",
          f4: "-2",
          f5: "-2",
          f6: "-10",
          f7: "数学 | 90、物理 | 55、政治 | 80"
        },
        {
          f1: "张三",
          f2: "1801001",
          f3: "-1",
          f4: "-2",
          f5: "-2",
          f6: "-10",
          f7: "数学 | 90、物理 | 55、政治 | 80"
        },
        {
          f1: "张三",
          f2: "1801001",
          f3: "-1",
          f4: "-2",
          f5: "-2",
          f6: "-10",
          f7: "数学 | 90、物理 | 55、政治 | 80"
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