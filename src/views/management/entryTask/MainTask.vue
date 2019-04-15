<template>
  <div class="entry-main-task">
    <el-card shadow="never">
      <div
        slot="header"
        class="card-title"
      >
        <strong>{{course}}科目主线任务</strong>
      </div>
      <quick-filter
        title="选择科目"
        :opts="subjectGroupOpts"
        :active="subjectId"
        title-width="6em"
        @change="handleSubjectChange"
      />
      <div class="task-list">
        <div
          v-for="item in taskList"
          :key="item.id"
          class="task-item"
        >
          <el-card shadow="never">
            <div class="task-item-content">
              <div class="task-title">{{item.taskTitle}}</div>
              <div class="task-opts">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="handleEditItem(item)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  @click="handleDeleteItem(item)"
                ></el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div class="task-item">
          <el-card shadow="never">
            <div class="task-title">
              <el-button
                type="text"
                @click="handleEditItem(null)"
              >添加新条目</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
    <task-edit-dialog
      :visible="editVisible"
      :editInfo="selectTask"
      :subject-id="subjectId"
      @close="editVisible=false"
      @complete="handleSaveComplete"
    />
  </div>
</template>

<script>
import QuickFilter from "@/components/QuickFilter";
import TaskEditDialog from "./TaskEditDialog.vue";
export default {
  name: "EntryTaskMainTask",
  components: { TaskEditDialog, QuickFilter },
  data() {
    return {
      course: "",
      subjectId: 0,
      subjectGroupOpts: [],
      taskList: [],
      editVisible: false,
      selectTask: {}
    };
  },
  created() {
    // 获取科目列表
    this.$store.dispatch("queryCourseList").then(res => {
      this.subjectGroupOpts = res.result.map(item => ({
        label: item.courseName,
        key: item.id
      }));
      this.subjectId = res.result[0].id || 1;
      this.course = res.result[0].courseName || "";
      // 获取任务列表
      this.getTaskList();
    });
  },
  methods: {
    getTaskList() {
      this.$root
        .request({
          url: `/task/task/template/query`,
          method: "POST",
          data: { status: 1, parentId: 0, subId: this.subjectId }
        })
        .then(res => {
          this.taskList = res.result;
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    handleSubjectChange(i) {
      this.subjectId = i.key;
      this.course = i.label;
      this.getTaskList();
    },
    // 编辑
    handleEditItem(item) {
      if (item) {
        this.selectTask = item;
      } else {
        this.selectTask = {};
      }
      this.editVisible = true;
    },
    // 删除
    handleDeleteItem(item) {
      this.$confirm("确定删除这些主线任务？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$root
            .request({
              url: `/task/task/template/delete/${item.id}`,
              method: "POST",
              data: { id: item.id }
            })
            .then(() => {
              this.getTaskList();
            })
            .catch(err => {
              window.console.error(err);
            });
        })
        .catch(() => {});
    },
    // 添加或修改，对话框保存完成
    handleSaveComplete() {
      this.editVisible = false;
      this.getTaskList();
    }
  }
};
</script>
<style lang="scss" scoped>
.task-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1em 0;
  .task-item {
    position: relative;
    width: 25%;
    padding: 0.5em;
    box-sizing: border-box;
    overflow: hidden;
    &:hover {
      .task-opts {
        opacity: 1;
        transform: none;
      }
    }
  }
  .task-item-content {
    position: relative;
  }
  .task-title {
    height: 3.5em;
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .task-opts {
    position: absolute;
    right: -15px;
    bottom: -15px;
    text-align: right;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s;
  }
}

.task-subject-bar {
  display: flex;
  align-items: center;
  max-width: 18em;
  & span {
    flex-shrink: 0;
  }
}
</style>
