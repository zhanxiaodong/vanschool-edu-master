<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <el-row class="dashboard-switch-header">
      <el-col :sm="{span:8}" :md="{span:5}">
        <el-select
          v-model="value"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <table class="dashboard-stata-table">
      <thead>
        <th>班级/科目</th>
        <th>语</th>
        <th>数</th>
        <th>英</th>
        <th>物</th>
        <th>化</th>
        <th>生</th>
        <th>政</th>
        <th>史</th>
        <th>地</th>
        <th>日</th>
        <th>人数</th>
      </thead>
      <tbody>
        <tr
          v-for="(row,index) in tableData"
          :key="row[0]+index"
        >
          <td
            v-for="(col,idx) in row"
            :key="`${row[0]}-${col}-${idx}`"
          >{{col}}</td>
        </tr>
      </tbody>
    </table>
  </el-card>
</template>

<script>
export default {
  name: "DashboardTeachersAmount",
  data() {
    return {
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "科目报读人数"
        }
      ],
      value: "选项1"
    };
  },
  created() {
    this.tableData = [
      "一班",
      "二班",
      "三班",
      "四班",
      "五班",
      "六班",
      "七班",
      "八班",
      "九班",
      "十班",
      "十一班",
      "十二班",
      "合计"
    ].map(item => {
      let row = [];
      row.push(item);
      for (let i = 0; i < 11; i++) {
        row.push(Math.floor(Math.random() * 20 + 1));
      }
      return row;
    });
  }
};
</script>