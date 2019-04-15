<template>
  <el-dialog
    title="任务编辑"
    width="620px"
    :visible="visible"
    @close="$emit('close')"
  >
    <el-form label-width="8em">
      <el-form-item label="任务标题：">
        <el-input
          v-model="formData.taskTitle"
          maxlength="20"
          placeholder="任务标题最多输入20个汉字"
        />
      </el-form-item>
      <el-form-item label="任务描述：">
        <el-input
          v-model="formData.taskContent"
          type="textarea"
          rows="3"
          placeholder="描述最多输入100个汉字"
        />
      </el-form-item>
      <el-form-item label="难度等级：">
        <el-select v-model="formData.taskDifficultyLevel">
          <el-option
            v-for="n in 10"
            :key="n"
            :label="n"
            :value="n"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="items.chapter.length > 0"
        label="章节录入："
      >
        <el-row
          v-for="(item,index) in items.chapter"
          :key="item+index"
          class="task-item"
        >
          <el-col :span="20">
            <el-input v-model="item.taskTitle" />
          </el-col>
          <el-col
            :span="4"
            style="text-align:right"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDeleteItems(index,'chapter')"
            ></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-show="items.branch.length > 0"
        label="支线任务录入："
      >
        <el-row
          v-for="(item,index) in items.branch"
          :key="item+index"
          class="task-item"
        >
          <el-col :span="20">
            <el-input v-model="item.taskTitle" />
          </el-col>
          <el-col
            :span="4"
            style="text-align:right"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDeleteItems(index,'branch')"
            ></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <div>
        <el-button
          type="primary"
          @click="handleAddItems('chapter')"
        >添加章节</el-button>
        <el-button
          type="primary"
          @click="handleAddItems('branch')"
        >添加支线</el-button>
      </div>
      <div>
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "TaskEditDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object,
      default: () => ({})
    },
    subjectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: {
        taskTitle: "",
        taskContent: "",
        taskDifficultyLevel: "",
        type: 2
      },
      items: {
        chapter: [
          {
            type: 2,
            taskTitle: ""
          }
        ],
        branch: [
          {
            type: 3,
            taskTitle: ""
          }
        ]
      }
    };
  },
  watch: {
    visible: function(isVisible) {
      if (isVisible) {
        const val = this.editInfo;
        if (JSON.stringify(val) === "{}") {
          this.formData = {
            taskTitle: "",
            taskContent: "",
            taskDifficultyLevel: "",
            type: 2
          };
          this.items = {
            chapter: [
              {
                type: 2,
                taskTitle: ""
              }
            ],
            branch: [
              {
                type: 3,
                taskTitle: ""
              }
            ]
          };
        } else {
          this.formData = {
            taskTitle: val.taskTitle,
            taskContent: val.taskContent,
            taskDifficultyLevel: val.taskDifficultyLevel,
            type: val.type
          };
          this.getChapterAndBranch(val.id);
        }
      }
    }
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取章节或者支线
    getChapterAndBranch(parentId) {
      this.$root
        .request({
          url: `/task/task/template/query`,
          method: "POST",
          data: { parentId, status: 1, subId: this.subjectId }
        })
        .then(res => {
          let chapter = res.result.filter(item => item.type === 2);
          let branch = res.result.filter(item => item.type === 3);
          if (chapter.length === 0) {
            chapter = [
              {
                type: 2,
                taskTitle: ""
              }
            ];
          }
          if (branch.length === 0) {
            branch = [
              {
                type: 3,
                taskTitle: ""
              }
            ];
          }
          this.items = { chapter, branch };
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 添加条目
    handleAddItems(key) {
      this.items[key].push({
        type: key === "chapter" ? 2 : 3,
        taskTitle: ""
      });
    },
    // 删除条目
    handleDeleteItems(index, key) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.items[key].splice(index, 1);
        })
        .catch(() => {});
    },
    // 提交保存
    handleSubmit() {
      const sendData = { ...this.formData };
      const items = [...this.items.chapter, ...this.items.branch];
      const isEdit = JSON.stringify(this.editInfo) !== "{}";
      window.console.log(this.schoolId);

      this.$root
        .request({
          url: isEdit
            ? `/task/task/template/opt/update`
            : `/task/task/template/opt/add`,
          method: "POST",
          data: isEdit
            ? [
                {
                  id: this.editInfo.id,
                  schoolId: this.schoolId,
                  subId: this.subjectId,
                  taskTitle: sendData.taskTitle,
                  taskContent: sendData.taskContent,
                  taskDifficultyLevel: sendData.taskDifficultyLevel,
                  type: 1,
                  status: 1,
                  result: 1
                },
                ...items.map(item => ({
                  type: item.type,
                  status: 1,
                  schoolId: this.schoolId,
                  subId: this.subjectId,
                  taskTitle: item.taskTitle,
                  taskContent: "",
                  parentId: this.editInfo.id
                }))
              ]
            : [
                {
                  schoolId: this.schoolId,
                  subId: this.subjectId,
                  taskTitle: sendData.taskTitle,
                  taskContent: sendData.taskContent,
                  taskDifficultyLevel: sendData.taskDifficultyLevel,
                  type: 1,
                  status: 1,
                  result: 1
                },
                ...items.map(item => ({
                  type: item.type,
                  status: 1,
                  schoolId: this.schoolId,
                  subId: this.subjectId,
                  taskTitle: item.taskTitle,
                  taskContent: ""
                }))
              ]
        })
        .then(() => {
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
          this.$emit("complete");
        })
        .catch(err => {
          window.console.error(err);
        });
    }
    // 添加子任务
    // handleSubTask(subListData) {
    //   const isEdit = JSON.stringify(this.editInfo) !== "{}";
    //   this.$root
    //     .request({
    //       url: isEdit
    //         ? `/task/task/template/opt/update/${this.editInfo.id}`
    //         : `/task/task/template/opt/add`,
    //       method: "POST",
    //       data: subListData || []
    //     })
    //     .then(() => {
    //       this.$notify({
    //         title: "操作成功！",
    //         type: "success"
    //       });
    //       this.$emit("complete");
    //     })
    //     .catch(err => {
    //       window.console.error(err);
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
.task-item {
  margin: 0 0 1.4em 0;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
