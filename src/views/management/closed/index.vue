<template>
  <el-card shadow="never">
    <el-table :data="[]">
      <el-table-column label="发起时间"/>
      <el-table-column label="学生姓名"/>
      <el-table-column label="班级"/>
      <el-table-column label="班主任"/>
      <el-table-column label="结课类别"/>
      <el-table-column label="审核状态"/>
      <el-table-column label="处理人"/>
      <el-table-column label="处理时间"/>
      <el-table-column label="操作"/>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name:"ManagementClosed",
  data(){
    return{

    }
  }
}
</script>