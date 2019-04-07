<template>
  <div class="table-container">
    <table class="scheduling-table">
      <tbody>
        <tr>
          <td>节次</td>
          <td>时间</td>
          <td>周一</td>
          <td>周二</td>
          <td>周三</td>
          <td>周四</td>
          <td>周五</td>
          <td>周六</td>
          <td>周日</td>
        </tr>
        <tr
          v-for="(row,index) in templateData"
          :key="index"
        >
          <td
            v-for="(col,idx) in ['period','time','mon','tue','wed','thu','fri','sat','sun']"
            :key="idx"
            @click="onClickCell(index,col)"
            :class="{'opts-cell' : ['mon','tue','wed','thu','fri','sat','sun'].includes(col) ,'active':row[col]}"
          >{{row[col]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TemplateTable",
  props: {
    templateData: { type: Array, default: () => [] },
    selectedCourse: { type: String, default: "" }
  },
  methods: {
    onClickCell(index, day) {
      if (["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(day)) {
        if (!this.selectedCourse) return false;
        const row = this.templateData[index];
        const course = row[day];
        // 根据已选课程，设置排课
        course === this.selectedCourse
          ? (row[day] = "")
          : (row[day] = this.selectedCourse);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.opts-cell:hover {
  cursor: pointer;
  background-color: #fffaeb;
}
</style>
