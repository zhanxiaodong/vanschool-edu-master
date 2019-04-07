<template>
  <el-card shadow="never">
    <el-table :data="[]">
      <el-table-column label="班级"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "AdmissionTicket"
};
</script>