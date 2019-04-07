<template>
  <div class="stats-student">
    <el-card
      class="card-style"
      shadow="never"
    >
      <div class="indicator-wrapper">
        <div class="indicator-item">
          <div class="indicator-header">今日入学</div>
          <div class="indicator-body">
            <count-to :amount="2090" />
          </div>

        </div>
        <div class="indicator-item">
          <div class="indicator-header">今日退学</div>
          <div class="indicator-body">
            <count-to :amount="2090" />
          </div>
        </div>
        <div class="indicator-item">
          <div class="indicator-header">在校人数</div>
          <div class="indicator-body">
            <count-to :amount="22090" />
          </div>
        </div>
      </div>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane
          label="所有校区学生数据"
          name="students"
        >
          <all-students />
        </el-tab-pane>
        <el-tab-pane
          label="校区学生数据"
          name="1"
        >
          <campus-students />
        </el-tab-pane>
        <el-tab-pane
          label="入学数据"
          name="2"
        >
          <entrance-data />
        </el-tab-pane>
        <el-tab-pane
          label="预转入率"
          name="3"
        >预转入率</el-tab-pane>
        <el-tab-pane
          label="学生人数统计"
          name="4"
        >入学数据</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AllStudents from "./components/AllStudents";
import CampusStudents from "./components/CampusStudents";
import EntranceData from "./components/EntranceData";
import CountTo from "@/components/CountTo.vue";
export default {
  name: "Students",
  components: { AllStudents, CampusStudents, EntranceData, CountTo },
  data() {
    return {
      activeTab: "students"
    };
  }
};
</script>

<style lang="scss" scoped>
.indicator-wrapper {
  display: flex;
  padding: 1em 0;
  .indicator-item {
    width: 33.33%;
    text-align: center;
    border-right: 1px solid #eeeeee;
    &:last-child {
      border-right-color: #ffffff;
    }
  }
  .indicator-body {
    font-size: 2.2em;
    font-weight: 400;
    padding: 0.4em 0 0 0;
  }
}
</style>
