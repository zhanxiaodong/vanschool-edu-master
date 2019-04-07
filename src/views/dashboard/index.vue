<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col :span="12">
        <apply-overview />
      </el-col>
      <el-col :span="12">
        <entrance-overview/>
      </el-col>
    </el-row>
    <notice-overview />
    <audit-overview />
    <el-row :gutter="24">
      <el-col :span="12">
        <apply-chart />
      </el-col>
      <el-col :span="12">
        <apply-chart />
      </el-col>
      <el-col :span="12">
        <teachers-amount-tab />
      </el-col>
      <el-col :span="12">
        <teachers-amount-tab />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ApplyOverview from "./components/ApplyOverview.vue";
import EntranceOverview from "./components/EntranceOverview.vue";
import NoticeOverview from "./components/NoticeOverview.vue";
import AuditOverview from "./components/AuditOverview.vue";
import ApplyChart from "./components/ApplyChart.vue";
import TeachersAmountTab from "./components/TeachersAmountTab.vue";

export default {
  name: "Dashboard",
  components: {
    ApplyOverview,
    EntranceOverview,
    NoticeOverview,
    AuditOverview,
    ApplyChart,
    TeachersAmountTab
  },
  data() {
    return {};
  }
};
</script>
