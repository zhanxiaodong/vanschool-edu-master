<template>
  <div class="management-templates">
    <el-card shadow="never">
      <el-row
        type="flex"
        align="middle"
        class="simple-search-bar"
      >
        <el-col :span="6">
          <el-select v-model="selectedTemplate">
            <el-option
              v-for="item in templateOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-col>
        <el-col
          :span="18"
          style="text-align:right"
        >
          <el-button
            icon="el-icon-edit"
            @click="editDialogVisible = true"
          >编 辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="onDelete"
          >删 除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
          >新 增</el-button>
        </el-col>
      </el-row>
      <template-table
        :template-data="currentTemplateData"
        :selected-course="selectedCourse"
      />

      <div class="course-container">
        <div class="course-label">主课：</div>
        <el-radio-group v-model="selectedCourse">
          <el-radio-button
            v-for="item in mainCourses"
            :key="item"
            :label="item"
          ></el-radio-button>
        </el-radio-group>
      </div>

      <div class="course-container">
        <div class="course-label">副课：</div>
        <el-radio-group v-model="selectedCourse">
          <el-radio-button
            v-for="item in substituteCourses"
            :key="item"
            :label="item"
          ></el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="editDialogVisible"
      title="编辑模板"
    >
      <el-form label-width="80px">
        <el-form-item label="模板名称">
          <el-input
            v-model="templateOptions.find(v => v.id === selectedTemplate).name"
            placeholder="请输入模板名称"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          icon="el-icon-document"
          @click="dialogVisible = false"
        >另存为</el-button>
        <el-button
          icon="el-icon-check"
          @click="dialogVisible = false"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TemplateTable from "./components/template-table";
export default {
  name: "Templates",
  components: { TemplateTable },
  data() {
    return {
      templateOptions: [{ id: 1, name: "模板一" }, { id: 2, name: "模板二" }],
      selectedTemplate: 1,
      currentTemplateData: [
        {
          period: "早读",
          time: "7:30-8:00",
          mon: "A",
          tue: "B",
          wed: "C",
          thu: "D",
          fri: "A",
          sat: "C",
          sun: ""
        },
        {
          period: "第一节",
          time: "8:10-8:55",
          mon: "A",
          tue: "B",
          wed: "C",
          thu: "D",
          fri: "A",
          sat: "C",
          sun: ""
        },
        {
          period: "第二节",
          time: "9:05-9:50",
          mon: "A",
          tue: "B",
          wed: "C",
          thu: "D",
          fri: "A",
          sat: "C",
          sun: ""
        },
        {
          period: "第三节",
          time: "10:00-10:45",
          mon: "A",
          tue: "B",
          wed: "C",
          thu: "D",
          fri: "A",
          sat: "C",
          sun: ""
        },
        {
          period: "第四节",
          time: "10:55-11:40",
          mon: "A",
          tue: "B",
          wed: "C",
          thu: "D",
          fri: "A",
          sat: "C",
          sun: ""
        },
        {
          period: "错峰午饭",
          time: "11:40-12:00",
          mon: "B",
          tue: "延续",
          wed: "延续",
          thu: "延续",
          fri: "延续",
          sat: "延续",
          sun: ""
        },
        {
          period: "中餐、午休",
          time: "",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },
        {
          period: "第五节",
          time: "13:20-14:05",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },
        {
          period: "第六节",
          time: "14:15-15:00",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第七节",
          time: "15:10-15:55",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第八节",
          time: "16:05-16:50",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "错峰晚餐",
          time: "16:50-17:10",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "晚餐",
          time: "",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "听力",
          time: "18:00-18:30",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第九节",
          time: "18:30-19:15",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第十节",
          time: "19:25-20:10",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第十一节",
          time: "20:20-21:20",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },{
          period: "第十二节",
          time: "21:30-22:30",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        }
      ],
      mainCourses: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], // 主课
      substituteCourses: ["自习", "听力", "班会", "体育"], // 副课
      selectedCourse: "",
      editDialogVisible: false
    };
  },
  methods: {
    onDelete() {
      this.$confirm(
        `确定要永久删除模板「${
          this.templateOptions.find(v => v.id === this.selectedTemplate).name
        }」吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.course-container {
  display: flex;
  align-items: center;
  margin: 1.5em 0;
  .course-label {
    flex-shrink: 0;
    width: 4em;
  }
}
</style>

