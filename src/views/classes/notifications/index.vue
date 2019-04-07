<template>
  <el-card shadow="never">
    <el-form
      class="notifications-form"
      label-width="6em"
      label-position="left"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="通知对象：">
            <el-select v-model="formData.target">
              <el-option
                label="全体家长"
                value="parents"
              />
              <el-option
                label="按班级"
                value="classes"
              />
              <el-option
                label="按学生"
                value="students"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通知类型：">
            <el-select v-model="formData.type">
              <el-option
                label="班级说说"
                :value="1"
              />
              <el-option
                label="通知"
                :value="2"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        v-show="formData.target === 'students'"
        label="通知学生："
      >
        <el-select
          v-model="formData.targetStudents"
          multiple
          placeholder="请选择学生"
        />
      </el-form-item>
      <el-form-item label="通知标题：">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="通知内容：">
        <el-input
          type="textarea"
          rows="5"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          plain
        >预 览</el-button>
        <el-button
          icon="el-icon-check"
        >发 布</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Notifications",
  data() {
    return {
      formData: {}
    };
  }
};
</script>
<style lang="scss" scoped>
.notifications-form {
  width: 70%;
  max-width: 740px;
}
</style>
