<template>
  <div class="table-container">
    <el-table
      :data="list"
    >
      <el-table-column
        prop="time"
        label="时间"
        align="center"
      />
      <el-table-column
        prop="name"
        label="纪律问题"
        align="center"
      />
      <el-table-column
        prop="deduction"
        label="扣分"
        align="center"
      />
      <el-table-column
        prop="checker"
        label="检查人"
        align="center"
      />
      <el-table-column
        prop="status"
        label="状态"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TabDiscipline",
  data() {
    return {
      list: [
        {
          time: "2018/4/22 9:40",
          name: "四戒[ 上课睡觉 ]",
          deduction: 3,
          checker: "张三",
          status: "已被审核：确认无误"
        }
      ]
    };
  }
};
</script>
