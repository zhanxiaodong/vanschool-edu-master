<template>
  <div class="class-schedule">
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
    </el-row>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column
          prop="f1"
          label="节次"
        />
        <el-table-column
          prop="f2"
          label="时间"
          align="center"
        />
        <el-table-column
          prop="f3"
          label="星期一6-18"
          align="center"
        />
        <el-table-column
          prop="f4"
          label="星期二6-19"
          align="center"
        />
        <el-table-column
          prop="f5"
          label="星期三6-20"
          align="center"
        />
        <el-table-column
          prop="f6"
          label="星期四6-21"
          align="center"
        />
        <el-table-column
          prop="f7"
          label="星期五6-22"
          align="center"
        />
        <el-table-column
          prop="f8"
          label="星期六6-23"
          align="center"
        />
        <el-table-column
          prop="f9"
          label="星期日6-24"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassSchedule",
  data() {
    return {
      week: "",
      tableData: [
        {
          f1: "早读",
          f2: "7:30-8:00",
          f3: "数学 李四",
          f4: "语文 张三",
          f5: "数学 李四",
          f6: "语文 张三",
          f7: "数学 李四",
          f8: "语文 张三",
          f9: "休息"
        },
        {
          f1: "第一节",
          f2: "8:10-8:55",
          f3: "数学 李四",
          f4: "语文 张三",
          f5: "数学 李四",
          f6: "语文 张三",
          f7: "数学 李四",
          f8: "语文 张三",
          f9: "休息"
        },
        {
          f1: "第二节",
          f2: "9:05-9:50",
          f3: "数学 李四",
          f4: "语文 张三",
          f5: "数学 李四",
          f6: "语文 张三",
          f7: "数学 李四",
          f8: "语文 张三",
          f9: "休息"
        },
        {
          f1: "第三节",
          f2: "10:00-10:45",
          f3: "数学 李四",
          f4: "语文 张三",
          f5: "数学 李四",
          f6: "语文 张三",
          f7: "数学 李四",
          f8: "语文 张三",
          f9: "休息"
        }
      ]
    };
  }
};
</script>