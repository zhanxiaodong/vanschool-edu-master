<template>
  <div class="courses-scheduling">
    <el-card
      shadow="never"
      class="card-style "
    >
      <div
        slot="header"
        class="card-title"
      >
        <strong>班级信息</strong>
      </div>
      <table class="info-table">
        <tbody>
          <tr>
            <td>班级名称：</td>
            <td>A班</td>
            <td>班主任：</td>
            <td>张三</td>
            <td>学届：</td>
            <td>2018学届</td>
            <td>学生数：</td>
            <td>18/30</td>
          </tr>
          <tr>
            <td>校区：</td>
            <td>银湖校区</td>
            <td>教室：</td>
            <td>401</td>
            <td>科目：</td>
            <td>语文、数学、英语</td>
            <td>状态：</td>
            <td>正常</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card
      shadow="never"
      class="card-style "
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="选择时间：">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选用模版：">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            style="text-align:right"
          >
            <el-button type="primary">开始排课</el-button>
            <el-button type="primary">人工排课</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData">
        <el-table-column
          prop="f1"
          label="节次"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f2"
          label="时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f3"
          label="星期一(6-25)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f4"
          label="星期二(6-24)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f5"
          label="星期三(6-23)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f6"
          label="星期四(6-22)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f7"
          label="星期五(6-21)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f8"
          label="星期六(6-20)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="f9"
          label="星期日(6-19)"
          align="center"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CoursesScheduling",
  data() {
    return {
      tableData: [
        {
          f1: "早读",
          f2: "7:30-8:00",
          f3: "语文【张三】",
          f4: "B",
          f5: "语文【张三】",
          f6: "C",
          f7: "语文【张三】",
          f8: "C",
          f9: "",
        },
        {
          f1: "第一节",
          f2: "8:10-8:55",
          f3: "语文【张三】",
          f4: "B",
          f5: "语文【张三】",
          f6: "C",
          f7: "语文【张三】",
          f8: "C",
          f9: "",
        },
        {
          f1: "第二节",
          f2: "9:05-9:50",
          f3: "语文【张三】",
          f4: "B",
          f5: "语文【张三】",
          f6: "C",
          f7: "语文【张三】",
          f8: "C",
          f9: "",
        },
        {
          f1: "第三节",
          f2: "10:00-10:45",
          f3: "B",
          f4: "B",
          f5: "语文【张三】",
          f6: "C",
          f7: "语文【张三】",
          f8: "C",
          f9: "A",
        },
        {
          f1: "第四节",
          f2: "10:55-11:40",
          f3: "语文【张三】",
          f4: "B",
          f5: "语文【张三】",
          f6: "C",
          f7: "语文【张三】",
          f8: "C",
          f9: "",
        },
        {
          f1: "错峰午饭",
          f2: "11:40-12:00",
          f3: "",
          f4: "",
          f5: "",
          f6: "",
          f7: "",
          f8: "",
          f9: "",
        },
        {
          f1: "中餐、午休",
          f2: "",
          f3: "",
          f4: "",
          f5: "",
          f6: "",
          f7: "",
          f8: "",
          f9: "",
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.info-table {
  width: 100%;
  border-collapse: collapse;
  & td {
    padding: 0.8em 1em;
    border: 1px solid #eeeeee;
  }
  & td:nth-of-type(2n-1){
    font-weight: bold;
    color: #666666;
  }
}
</style>
