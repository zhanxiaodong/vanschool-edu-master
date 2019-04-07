<template>
  <div class="task-conf">
    <el-card
      class="card-style "
      shadow="never"
    >
      <el-radio-group v-model="selectedClass">
        <el-radio
          v-for="item in classesList"
          :key="item.id"
          :label="item.id"
          border
          class="my-radio"
        >{{item.name}}</el-radio>
      </el-radio-group>
    </el-card>
    <el-card
      class="card-style "
      shadow="never"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="主线任务分配"
          name="first"
        >
          <main-task-conf :class-id="selectedClass" :school-id="schoolId"/>
        </el-tab-pane>
        <el-tab-pane
          label="支线任务验收"
          name="second"
          lazy
        >
          <branch-task-conf :class-id="selectedClass" :school-id="schoolId"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import MainTaskConf from "./MainTaskConf.vue";
import BranchTaskConf from "./BranchTaskConf.vue";
export default {
  name: "TaskConfIndex",
  components: { MainTaskConf, BranchTaskConf },
  data() {
    return {
      selectedClass: 1,
      activeName: "first",
      taskData: {},
      classesList: []
    };
  },
  created() {
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.classesList = res.result;
        this.selectedClass = res.result.length > 0 ? res.result[0].id : "";
      })
      .catch(() => {});
  },
  computed:{
    schoolId(){
      return Number(this.$store.state.schoolId)
    }
  }
};
</script>