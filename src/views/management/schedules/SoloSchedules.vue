<template>
  <div class="solo-schedules">
    <el-card
      shadow="never"
      class="card-style"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form class="info-form">
            <el-form-item label="学生：">
              <span>张三</span>
            </el-form-item>
            <el-form-item label="学号：">
              <span>1111111</span>
            </el-form-item>
            <el-form-item label="班级：">
              <span>401</span>
            </el-form-item>
            <el-form-item label="报读课程：">
              <span>大冲班、VIP课</span>
            </el-form-item>
            <el-form-item label="科目：">
              语文、数学、英语、政治
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="purchaseData"
            border
          >
            <el-table-column
              prop="course"
              label="课程"
              align="center"
            />
            <el-table-column
              prop="period"
              label="购买课时"
              align="center"
            />
            <el-table-column
              prop="presented"
              label="赠送课时"
              align="center"
            />
            <el-table-column
              prop="plan"
              label="排课课时"
              align="center"
            />
            <el-table-column
              prop="surplus"
              label="剩余课时"
              align="center"
            />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <el-row
        type="flex"
        align="middle"
        class="simple-search-bar"
      >
        <el-col
          :sm="{span:6}"
          :md="{span:4}"
        >
          <el-date-picker
            :picker-options="{firstDayOfWeek:1}"
            v-model="week"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            @change="handlePickerChange"
          >
          </el-date-picker>
        </el-col>
        <el-col
          :sm="{span:18}"
          :md="{span:20}"
          style="text-align:right"
        >
          <el-button
            style="margin:0 0.5em 0 0"
            type="primary"
          >打印</el-button>
          <el-button type="primary">
            走读
          </el-button>
          <el-button type="primary">
            vip排课
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SoloSchedules",
  data() {
    return {
      purchaseData: [
        {
          course: "主课",
          period: "100",
          presented: "20",
          plan: "80",
          surplus: "40"
        },
        {
          course: "VIP课",
          period: "50",
          presented: "0",
          plan: "30",
          surplus: "20"
        }
      ],
      week: ""
    };
  },
  created(){
    window.console.log(this.$root.formatDate.toStr(new Date(),'MM/DD'));
  },
  methods: {
    handlePickerChange() {
      let currWeek = new Date(this.week);
      window.console.log(
        new Date(currWeek.setDate(currWeek.getDate() - 1)),
        new Date(currWeek.setDate(currWeek.getDate() + 6))
      );
    }
  }
};
</script>
