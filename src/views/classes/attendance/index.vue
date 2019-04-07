<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="班级"
        name="class"
      >
        <tab-class />
      </el-tab-pane>

      <el-tab-pane
        label="寝室"
        name="dorm"
      >
        <tab-dorm />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabClass from "./components/tab-class";
import TabDorm from "./components/tab-dorm";
export default {
  name: "Attendance",
  components: { TabClass, TabDorm },
  data() {
    return {
      activeTab: "class"
    };
  }
};
</script>
