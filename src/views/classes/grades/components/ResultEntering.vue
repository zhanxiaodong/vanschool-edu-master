<template>
  <el-dialog
    :visible="visible"
    title="录入成绩"
    @close="$emit('close')"
  >
    <el-form label-width="6em">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="所属班级：">
            <el-select v-model="dialogForm.class">
              <el-option
                label="班级一"
                value="1"
              ></el-option>
              <el-option
                label="班级二"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属科目：">
            <el-select v-model="dialogForm.subjects">
              <el-option
                label="英语"
                value="1"
              ></el-option>
              <el-option
                label="语文"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考试：">
            <el-select v-model="dialogForm.exam">
              <el-option
                label="第一场考试"
                value="1"
              ></el-option>
              <el-option
                label="第二场考试"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col
          v-for="(stu,index) in studentList"
          :key="index"
          :span="8"
        >
          <el-form-item :label="`${stu.name}：`">
            <el-input
              v-model="stu.grade"
              placeholder="分数"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="info"
        icon="el-icon-upload2"
      >批量导入</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ResultEntering",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogForm: {},
      studentList: [
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三风" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" },
        { name: "张三" }
      ]
    };
  }
};
</script>