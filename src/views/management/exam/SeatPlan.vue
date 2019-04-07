<template>
  <el-card shadow="never">
    <el-table :data="[]">
      <el-table-column label="班级"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="准考生号码"></el-table-column>
      <el-table-column label="座位"></el-table-column>
      <el-table-column label="考试教室"></el-table-column>
      <el-table-column label="备注"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name:"ExamsSeatPlan"
}
</script>