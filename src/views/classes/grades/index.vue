<template>
  <el-card shadow="never">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="每日"
        name="daily"
        lazy
      >
        <grades-daily/>
      </el-tab-pane>
      <el-tab-pane
        label="考试"
        name="exams"
        lazy
      >
        <grades-exams/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import GradesDaily from "./components/GradesDaily";
import GradesExams from "./components/GradesExams";
export default {
  name: "Grades",
  components: { GradesDaily, GradesExams },
  data() {
    return {
      activeTab: "daily"
    };
  }
};
</script>
