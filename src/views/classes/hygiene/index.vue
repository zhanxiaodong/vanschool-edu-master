<template>
  <el-card shadow="never">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="班级"
        name="classes"
      >
        <tab-classes />
      </el-tab-pane>

      <el-tab-pane
        label="寝室"
        name="dorms"
      >
        <tab-dorms />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabClasses from "./components/tab-classes";
import TabDorms from "./components/tab-dorms";
export default {
  name: "Hygiene",
  components: { TabClasses, TabDorms },
  data() {
    return {
      activeTab: "classes"
    };
  }
};
</script>
