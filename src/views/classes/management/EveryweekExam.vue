<template>
  <div class="classes-everyweek-exam">
    <el-table :data="[]">
      <el-table-column label="考试" prop="f1" />
      <el-table-column label="时间" prop="f2" />
      <el-table-column label="科目" prop="f3" />
      <el-table-column label="语文" prop="f4" />
      <el-table-column label="数学" prop="f5" />
      <el-table-column label="英语" prop="f6" />
      <el-table-column label="政治" prop="f7" />
      <el-table-column label="历史" prop="f8" />
    </el-table>
  </div>
</template>

<script>
export default {
  name:"ClassesEveryweekExam"
}
</script>