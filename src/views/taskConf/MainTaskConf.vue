<template>
  <div
    v-loading="isLoading"
    class="main-task-container"
  >
    <template v-if="taskList.length > 0">
      <ul class="main-task-list">
        <li
          class="main-task-item"
          v-for="(item,index) in taskList"
          :key="item.id"
        >
          <p
            v-show="!isEditMode"
            class="main-task-progress"
          >章节已完成({{item.complete}}/{{item.sum}})</p>
          <div
            :class="['main-task-title',...status2class(item.status)]"
            @click="handleTaskClick(index,item)"
          >
            <div class="task-no">{{index+1}}</div>
            <div
              v-if="isEditMode && item.status === 2 && item.checked"
              class="planned"
            ></div>
            {{item.taskTitle}}
          </div>
        </li>
      </ul>
      <div class="main-task-footer">
        <template v-if="isEditMode">
          <p>选择需要教学的任务，点击提交即可已完成；已完成和进行中的任务不能调整</p>
          <el-button
            type="primary"
            @click="handleTaskEditSubmit"
          >提交调整</el-button>
          <el-button
            type="info"
            @click="isEditMode = false"
          >取消调整</el-button>
        </template>
        <template v-else>
          <p>当前主线任务全部完成后，自动进入下一个主线任务</p>
          <el-button
            type="primary"
            @click="isEditMode = true"
          >任务数量调整</el-button>
        </template>
      </div>
    </template>
    <div
      v-else
      class="no-data"
    >
      <p>暂时还没有主线任务！</p>
    </div>
    <el-dialog
      title="章节教学进度确认"
      width="780px"
      :visible.sync="dialogVisible"
    >
      <ul class="main-task-list">
        <li
          class="main-task-item chapter"
          v-for="(item,index) in chapterList"
          :key="item.id"
        >
          <div
            :class="['main-task-title',item.status ? 'active':'finished']"
            @click="handleChapterClick(item)"
          >
            <div class="task-no">{{index+1}}</div>
            {{item.taskTitle}}
          </div>
        </li>
      </ul>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <span class="hint-text">提示：已经标记为完成的，不可再取消；点击选择完成章节，再次点击取消选择</span>
        <div>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
          >确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MainTaskConf",
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
      isLoading: false,
      isEditMode: false,
      dialogVisible: false,
      taskList: [],
      chapterList: []
    };
  },
  created() {
    this.getTaskList();
  },
  watch: {
    classId: function() {
      this.getTaskList();
    }
  },
  methods: {
    // 获取任务列表
    getTaskList() {
      this.isLoading = true;
      this.$root
        .request({
          url: `/task/task/query/list`,
          method: "POST",
          data: { parentId: 0, classId: this.classId }
        })
        .then(res => {
          this.taskList = res.map(item => {
            let statusCode = 2;
            if (item.complete === 0) {
              statusCode = 2;
            } else if (item.complete === item.sum) {
              statusCode = 0;
            } else {
              statusCode = 1;
            }
            return {
              id: item.id,
              classId: item.classId,
              taskTitle: item.taskTitle,
              complete: item.complete,
              sum: item.sum,
              status: statusCode,
              checked: item.result === 1 ? true : false
            };
          });
        })
        .catch(err => {
          window.console.error(err);
        }).finally(() => {
          this.isLoading = false;
        });
    },
    // 任务编辑
    handleTaskClick(index, item) {
      if (!this.isEditMode) {
        this.$root
          .request({
            url: `/task/task/query/chapter`,
            method: "POST",
            data: { parentId: item.id, classId: item.classId }
          })
          .then(res => {
            this.chapterList = res.map(item => ({
              id: item.id,
              taskTitle: item.taskTitle,
              status: item.success === -1 ? 1 : 0,
              success: item.success,
              classId: item.classId,
              teacherId: item.teacherId,
              type: "",
              remark: "",
              taskId: item.id
            }));
            this.dialogVisible = true;
          })
          .catch(err => {
            window.console.error(err);
          });
      } else {
        // 编辑模式
        let currTask = { ...this.taskList[index] };
        currTask.checked = !currTask.checked;
        this.taskList.splice(index, 1, currTask);
      }
    },
    // 章节选择
    handleChapterClick(n) {
      // 未完成状态，可以标记为完成
      if (n.success === -1) {
        this.chapterList = this.chapterList.map(item => {
          if (item.id === n.id) {
            return { ...item, status: item.status ? 0 : 1 };
          } else {
            return { ...item };
          }
        });
      }
    },
    // 根据任务状态计算对应的样式
    status2class(status) {
      // ‘underway’：进行中， ‘finished’：已经完成，‘budgetary’：’计划中‘
      const className = { "1": "underway", "0": "finished", "2": "budgetary" }[
        status
      ];
      if (className === "underway") {
        return !this.isEditMode ? [className, "unfold"].join(" ") : className;
      } else if (className === "budgetary") {
        return this.isEditMode
          ? [className, "adjust", "active"].join(" ")
          : className;
      } else {
        return className;
      }
    },
    // 提交
    handleSubmit() {
      const finalList = this.chapterList
        .filter(item => item.success === -1 && item.status === 0)
        .map(item => ({
          classId: item.classId,
          teacherId: item.teacherId,
          taskId: item.taskId,
          remark: "",
          type: 1
        }));
      this.$root
        .request({
          url: `/task/task/schedule/opt/chapter/add`,
          method: "POST",
          data: finalList
        })
        .then(() => {
          this.dialogVisible = false;
          this.getTaskList();
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 主任务编辑提交
    handleTaskEditSubmit() {
      // 过滤出未进行的任务,并格式化成需要的数据
      const finalList = this.taskList
        .filter(item => item.complete === 0 && item.complete !== item.sum)
        .map(item => ({
          id: item.id,
          result: item.checked ? 1 : 0
        }));
      this.$root
        .request({
          url: `/task/task/update/all`,
          method: "POST",
          data: finalList
        })
        .then(res => {
          window.console.log(res);
          this.isEditMode = false;
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-task-container {
  min-height: 160px;
}
.main-task-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 2em 0;
  .main-task-item {
    padding: 1em 1.2em;
    width: 25%;
    box-sizing: border-box;
  }
  .main-task-progress {
    text-align: center;
    margin: 0 0 0.5em 0;
    font-size: 90%;
  }
  .main-task-title {
    position: relative;
    border: 1px solid #dddddd;
    height: 3em;
    padding: 0.6em 1em;
    text-align: center;
    transition: all 0.3s;
    &.adjust {
      border-style: dashed;
    }
    &.adjust.active {
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
.main-task-footer {
  border-top: 1px solid #eeeeee;
  text-align: center;
}
.unfold:hover {
  border-color: #ffcd38;
  cursor: pointer;
  .task-no {
    background-color: #ffcd38;
    color: #333333;
  }
}

.chapter .main-task-title:hover {
  cursor: pointer;
}
.active,
.underway {
  border-color: #ffcd38 !important;
  color: #333333;
  .task-no {
    background-color: #ffcd38;
    color: #333333;
  }
}
.finished {
  background-color: #f5f5f5 !important;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hint-text {
  color: #999999;
}

.planned {
  position: absolute;
  top: 0;
  right: 0.5em;
  width: 0.6em;
  height: 1em;
  border-bottom: 2px solid #ffcd38;
  border-right: 2px solid #ffcd38;
  border-bottom-right-radius: 2px;
  transform: rotate(45deg);
}
</style>
