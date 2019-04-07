<template>
  <el-card shadow="never">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="教师统计"
        name="teachers"
      >
        <tab-teachers />
      </el-tab-pane>
      <el-tab-pane
        label="教师退换课数据"
        name="lessons"
      >
        <tab-lessons />
      </el-tab-pane>
      <el-tab-pane
        label="学科教学事故"
        name="accidents"
      >
        <tab-accidents />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabTeachers from "./components/tab-teachers";
import TabLessons from "./components/tab-lessons";
import TabAccidents from "./components/tab-accidents";
export default {
  name: "Teachers",
  components: { TabTeachers, TabLessons, TabAccidents },
  data() {
    return {
      activeTab: "teachers"
    };
  }
};
</script>
