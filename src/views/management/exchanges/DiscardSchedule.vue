<template>
  <div class="exchanges-discard">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="8">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col
        :span="16"
        style="text-align:right;"
      >
        <el-button
          type="primary"
          @click="dialogVisible=true"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="[]">
      <el-table-column
        label="时间"
        align="center"
      />
      <el-table-column
        label="学生姓名"
        align="center"
      />
      <el-table-column
        label="班级"
        align="center"
      />
      <el-table-column
        label="班主任"
        align="center"
      />
      <el-table-column
        label="弃课科目"
        align="center"
      />
      <el-table-column
        label="科目老师"
        align="center"
      />
      <el-table-column
        label="弃课原因"
        align="center"
      />
      <el-table-column
        label="弃课时间段"
        align="center"
        min-width="120"
      />
      <el-table-column
        label="审核状态"
        align="center"
      />
      <el-table-column
        label="处理人"
        align="center"
      />
    </el-table>
    <el-dialog
      title="换课"
      :visible.sync="dialogVisible"
      width="640px"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="学生：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班主任：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程老师：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="时间：">
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="弃课原因：">
              <el-input
                type="textarea"
                rows="3"
                placeholder=""
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ExchangesDiscard",
  data() {
    return {
      daterange: "",
      dialogVisible: false,
      value6:""
    };
  }
};
</script>