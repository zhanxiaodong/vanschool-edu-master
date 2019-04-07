<template>
  <div class="tab-hours">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月份"
          size="small"
        >
        </el-date-picker>
      </el-col>
      <el-col
        :span="19"
        style="text-align:right;"
      >
        <el-button @click="detailsVisible = true">查看详情</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="type"
          label="总课时"
        />
        <el-table-column
          :label="list.reduce((accu, curr) => accu + curr.hours, 0).toString()"
          prop="hours"
          align="center"
        />
      </el-table>
    </div>
    <period-details :visible="detailsVisible" @close="detailsVisible = false"/>
  </div>
</template>

<script>
import PeriodDetails from "./PeriodDetails.vue";
export default {
  name: "TabHours",
  components: { PeriodDetails },
  data() {
    return {
      month: "",
      detailsVisible:false,
      list: [
        {
          type: "主课时",
          hours: 10
        },
        {
          type: "自习课时",
          hours: 2
        },
        {
          type: "VIP课时",
          hours: 1
        },
        {
          type: "晚坐班",
          hours: 1
        },
        {
          type: "监考",
          hours: 1
        },
        {
          type: "代课次数",
          hours: 1
        },
        {
          type: "换课次数",
          hours: 1
        }
      ]
    };
  }
};
</script>
