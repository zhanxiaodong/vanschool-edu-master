<template>
  <el-dialog
    :visible="visible"
    width="860px"
    title="课时详情"
    @close="$emit('close')"
  >
    <el-table :data="tableData">
      <el-table-column
        prop="lessons"
        label="节次"
        align="center"
        width="130"
      />
      <el-table-column
        prop="time"
        label="时间"
        width="120"
        align="center"
      />
      <el-table-column
        v-for="n in 15"
        :key="n"
        :prop="`f${n}`"
        :label="`1.${n}`"
      />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "TeachersPeriodDetails",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dateTime: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableData:[{
        lessons:'早读',
        time:'7:30-8:00'
      },{
        lessons:'第一节',
        time:'8:10-8:55'
      },{
        lessons:'第二节',
        time:'9:05-9:50'
      },{
        lessons:'第三节',
        time:'10:00-10:45'
      },{
        lessons:'第四节',
        time:'10:55-11:40'
      },{
        lessons:'错峰吃饭',
        time:'1:40-12:00'
      },{
        lessons:'中餐、午休',
        time:''
      },{
        lessons:'第五节',
        time:'13:20-14:05'
      },{
        lessons:'第六节',
        time:'14:15-15:00'
      },{
        lessons:'第七节',
        time:'5:10-15:55'
      },{
        lessons:'第八节',
        time:'16:05-16:50'
      },{
        lessons:'错峰吃饭',
        time:'16:50-17:10'
      }]
    };
  }
};
</script>