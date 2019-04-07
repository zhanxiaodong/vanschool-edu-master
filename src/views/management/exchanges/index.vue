<template>
  <el-card shadow="never">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="换班级"
        name="first"
      >
        <relieve />
      </el-tab-pane>
      <el-tab-pane
        label="换课"
        name="second"
      >
        <change-schedule />
      </el-tab-pane>
      <el-tab-pane
        label="弃课"
        name="third"
      >
        <discard-schedule />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Relieve from "./Relieve.vue";
import ChangeSchedule from "./ChangeSchedule.vue";
import DiscardSchedule from "./DiscardSchedule.vue";
export default {
  name: "ManagementExchanges",
  components: { Relieve, ChangeSchedule, DiscardSchedule },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>