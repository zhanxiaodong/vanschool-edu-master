<template>
  <div v-loading="isLoading" class="branch-task-container">
    <el-row
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        :sm="{span:8}"
        :md="{span:5}"
        class="task-select"
      >
        <span class="task-select-title">当前主线任务：</span>
        <el-select
          v-model="mainTask"
          @change="getBranchTaskList"
        >
          <el-option
            v-for="item in mainTaskList"
            :key="item.id"
            :value="item.taskTitle"
            :label="item.taskTitle"
          />
        </el-select>
      </el-col>
      <el-col
        :span="16"
        style="color:#999;"
      >选择已完成的主线任务，可以帮助该主线任务下没有完成支线任务的同学，继续完成之前的支线</el-col>
    </el-row>
    <ul class="branch-task-list">
      <li
        :class="['branch-task-item']"
        v-for="(item,index) in taskList"
        :key="item.id"
      >
        <p class="branch-task-progress">({{item.complete}}/{{item.sum}})人完成</p>
        <div
          :class="['branch-task-title',itemStatus(item)]"
          @click="handleTaskClick(item)"
        >
          <div class="task-no">{{index+1}}</div>
          {{item.taskTitle}}
        </div>
      </li>
    </ul>
    <el-dialog
      title="日常任务完成统计："
      width="780px"
      :visible.sync="dialogVisible"
      @close="getBranchTaskList"
    >
      <ul class="student-list">
        <li
          v-for="(item,index) in studentList"
          :key="item.studentId"
          :class="['student-item',item.success === 1 ? 'active':'']"
          @click="handleSelected(index)"
        >{{item.student}}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BranchTaskConf",
  props: {
    classId: {
      type: Number,
      required: true
    },
    schoolId:{
      type:Number
    }
  },
  data() {
    return {
      mainTask: "",
      dialogVisible: false,
      studentList: [],
      taskList: [],
      mainTaskList: [],
      currBranchTask: {},
      isLoading:false
    };
  },
  created() {
    this.getMainTaskList(() => {
      this.mainTask = this.mainTaskList[0]
        ? this.mainTaskList[0].taskTitle
        : "";
      this.getBranchTaskList();
    });
  },
  watch: {
    classId() {
      this.getMainTaskList(() => {
        this.mainTask = this.mainTaskList[0]
          ? this.mainTaskList[0].taskTitle
          : "";
        this.getBranchTaskList();
      });
    }
  },
  methods: {
    getMainTaskList(cb = () => {}) {
      this.isLoading = true;
      // 获取任务列表
      this.$root
        .request({
          url: `/task/task/query/list`,
          method: "POST",
          data: { parentId: 0, classId: this.classId }
        })
        .then(res => {
          this.mainTaskList =
            res.length > 0
              ? res.map(item => ({
                  id: item.id,
                  taskTitle: item.taskTitle,
                  teacherId: item.teacherId,
                  classId: item.classId
                }))
              : [];
          cb();
        })
        .catch(err => {
          this.isLoading =  false;
          window.console.error(err);
        });
    },
    getBranchTaskList() {
      if (this.mainTaskList.length > 0) {
        const parentId = this.mainTaskList.find(
          item => item.taskTitle === this.mainTask
        ).id;
        this.$root
          .request({
            url: `/task/task/query/schedule`,
            method: "POST",
            data: { parentId }
          })
          .then(res => {
            this.taskList = res;
            this.isLoading =  false;
            window.console.log(this.taskList);
          })
          .catch(err => {
            this.isLoading =  false;
            window.console.error(err);
          });
      }else{
        this.taskList = [];
        this.isLoading =  false;
      }
    },
    handleTaskClick(item) {
      this.currBranchTask = item;
      this.$root
        .request({
          url: `/task/task/query/schedule/details`,
          method: "POST",
          data: {
            classId: item.classId,
            taskId: item.id
          }
        })
        .then(res => {
          this.studentList = res;
          this.dialogVisible = true;
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    handleSelected(index) {
      const studentInfo = { ...this.studentList[index] };
      const mainTaskInfo = this.mainTaskList.find(
        item => item.taskTitle === this.mainTask
      );
      if (studentInfo.success === 1) {
        this.$root
          .request({
            url: `/task/task/schedule/student/delete`,
            method: "POST",
            data: {
              studentId: studentInfo.studentId,
              taskId: this.currBranchTask.id
            }
          })
          .then(() => {
            this.studentList.splice(index, 1, {
              ...studentInfo,
              success: -1
            });
          })
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/task/task/schedule/student/add`,
            method: "POST",
            data: {
              classId: mainTaskInfo.classId,
              courseId: 1,
              teacherId: mainTaskInfo.teacherId,
              studentId: studentInfo.studentId,
              taskId: this.currBranchTask.id,
              type: 1
            }
          })
          .then(() => {
            this.studentList.splice(index, 1, {
              ...studentInfo,
              success: 1
            });
          })
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    itemStatus(item) {
      return (item.complete < item.sum) ? "active" : "";
    }
  }
};
</script>
<style lang="scss" scoped>
.branch-task-container{
  min-height: 160px;
}
.task-select {
  display: flex;
  align-items: center;
  .task-select-title {
    flex-shrink: 0;
  }
}

.branch-task-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1em 0 2em 0;
  .branch-task-item {
    padding: 1em 1.2em;
    width: 25%;
    box-sizing: border-box;
  }
  .branch-task-progress {
    text-align: center;
    margin: 0 0 0.5em 0;
    font-size: 90%;
  }
  .branch-task-title {
    position: relative;
    border: 1px solid #dddddd;
    height: 3em;
    padding: 0.6em 1em;
    text-align: center;
    transition: all 0.3s;
    &:hover {
      border-color: #ffcd38;
      cursor: pointer;
      .task-no {
        background-color: #ffcd38;
        color: #ffffff;
      }
    }
    &.active {
      border-color: #ffcd38;
      & .task-no {
        background-color: #ffcd38;
      }
    }
  }
  .task-no {
    position: absolute;
    top: 50%;
    left: -1.25em;
    width: 2.5em;
    line-height: 2.5em;
    border-radius: 100%;
    text-align: center;
    background-color: #dddddd;
    margin: -1.25em 0 0 0;
    transition: all 0.3s;
  }
}

.student-list {
  display: flex;
  flex-wrap: wrap;
  .student-item {
    margin: 0 0.6em 1.2em 0.6em;
    padding: 0.6em 1em;
    min-width: 4.2em;
    text-align: center;
    border: 1px solid #dddddd;
    &:hover {
      cursor: pointer;
      border: 1px solid #ffcd38;
      color: #ffcd38;
    }
    &.active {
      border: 1px solid #ffcd38;
      background-color: #ffcd38;
      color: #ffffff;
    }
  }
}
</style>
