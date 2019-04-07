<template>
  <div class="table-container">
    <el-table :data="list">
      <el-table-column
        prop="period"
        label="节次"
        align="center"
      />
      <el-table-column
        prop="time"
        label="时间"
        align="center"
      />
      <el-table-column
        prop="mon"
        label="星期一"
        align="center"
      />
      <el-table-column
        prop="tue"
        label="星期二"
        align="center"
      />
      <el-table-column
        prop="wed"
        label="星期三"
        align="center"
      />
      <el-table-column
        prop="thu"
        label="星期四"
        align="center"
      />
      <el-table-column
        prop="fri"
        label="星期五"
        align="center"
      />
      <el-table-column
        prop="sat"
        label="星期六"
        align="center"
      />
      <el-table-column
        prop="sun"
        label="星期日"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TabSchedule",
  data() {
    return {
      week: "",
      list: [
        {
          period: "早读",
          time: "7:30-8:00",
          mon: "数学402",
          tue: "数学402",
          wed: "数学402",
          thu: "数学402",
          fri: "数学402",
          sat: "数学402",
          sun: ""
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
