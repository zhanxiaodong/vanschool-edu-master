<template>
  <el-card shadow="never">
    <el-form
      inline
      class="inline-info-form"
    >
      <el-form-item label="学生：">
        <span>张山</span>
      </el-form-item>
      <el-form-item label="班级：">
        <span>102班</span>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="每日过关"
        name="first"
      >
        <everyday-level />
      </el-tab-pane>
      <el-tab-pane
        label="每日作业"
        name="second"
      >
        <everyday-task />
      </el-tab-pane>
      <el-tab-pane
        label="考试成绩"
        name="third"
      >
        <everyweek-exam />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import EverydayLevel from "./EverydayLevel.vue";
import EverydayTask from "./EverydayTask.vue";
import EveryweekExam from "./EveryweekExam.vue";

export default {
  name: "ClassStudentScore",
  components: { EverydayLevel, EverydayTask, EveryweekExam },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>