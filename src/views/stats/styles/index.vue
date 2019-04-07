<template>
  <el-card shadow="never">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="当前纪律分"
        name="score"
      >
        <tab-score />
      </el-tab-pane>
      <el-tab-pane
        label="教学区纪律扣分统计"
        name="area"
      >
        <tab-area />
      </el-tab-pane>
      <el-tab-pane
        label="违纪统计"
        name="discipline"
      >
        <tab-discipline />
      </el-tab-pane>
      <el-tab-pane
        label="教室卫生统计"
        name="hygiene"
      >
        <tab-hygiene />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabScore from "./components/tab-score";
import TabArea from "./components/tab-area";
import TabDiscipline from "./components/tab-discipline";
import TabHygiene from "./components/tab-hygiene";
export default {
  name: "Attendance",
  components: { TabScore, TabArea, TabDiscipline, TabHygiene },
  data() {
    return {
      activeTab: "score"
    };
  }
};
</script>
