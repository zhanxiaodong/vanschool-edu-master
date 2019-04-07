<template>
  <el-card shadow="never">
    <div class="table-container">
      <el-table :data="listData">
        <el-table-column
          prop="f1"
          label="报名人数"
          align="center"
        />
        <el-table-column
          prop="f2"
          label="预分配校区数"
          align="center"
        />
        <el-table-column
          prop="f3"
          label="待分配人数"
          align="center"
        />
        <el-table-column
          prop="f4"
          label="转校区申请人数"
          align="center"
        />
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "presortCampusStat",
  data() {
    return {
      listData: [
        {
          f1: 355,
          f2: 255,
          f3: 100,
          f4: 20
        }
      ]
    };
  }
};
</script>
