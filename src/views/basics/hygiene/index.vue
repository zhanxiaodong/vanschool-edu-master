<template>
  <div class="base-hygiene">
    <el-card shadow="never">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="班级卫生"
          name="first"
        >
          <class-health />
        </el-tab-pane>
        <el-tab-pane
          label="寝室卫生"
          name="second"
        >
          <dorm-health />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ClassHealth from "./ClassHealth.vue";
import DormHealth from "./DormHealth.vue";
export default {
  name: "BaseHygiene",
  components: { ClassHealth, DormHealth },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
