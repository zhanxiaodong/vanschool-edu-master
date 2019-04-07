<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="专业"
        name="profession"
        lazy
      >
        <tab-profession />
      </el-tab-pane>
      <el-tab-pane
        label="籍贯"
        name="hometown"
        lazy
      >
        <tab-hometown :should-update="activeTab === 'hometown'" />
      </el-tab-pane>
      <el-tab-pane
        label="学校"
        name="school"
        lazy
      >
        <tab-school :should-update="activeTab === 'school'" />
      </el-tab-pane>
      <el-tab-pane
        label="画室／机构"
        name="facility"
        lazy
      >
        <tab-facility :should-update="activeTab === 'facility'" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabProfession from "./components/tab-profession";
import TabHometown from "./components/tab-hometown";
import TabSchool from "./components/tab-school";
import TabFacility from "./components/tab-facility";
export default {
  name: "Sources",
  components: { TabProfession, TabHometown, TabSchool, TabFacility },
  data() {
    return {
      activeTab: "profession"
    };
  }
};
</script>
