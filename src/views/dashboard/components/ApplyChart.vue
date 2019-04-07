<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <el-row class="dashboard-switch-header">
      <el-col :sm="{span:8}" :md="{span:5}">
        <el-select
          v-model="value"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <v-chart
      :forceFit="true"
      :height="300"
      :data="data"
      :scale="scale"
      :padding = "{ top: 20, right: 30, bottom: 20, left: 30 }"
    >
      <v-tooltip />
      <v-axis />
      <v-smooth-line
        position="year*value"
        :size="2"
      />
      <v-smooth-area position="year*value" />
    </v-chart>
  </el-card>
</template>

<script>
export default {
  name: "DashboardApplyChart",
  data() {
    return {
      data: [
        { year: "1991", value: 15 },
        { year: "1992", value: 36 },
        { year: "1993", value: 99 },
        { year: "1994", value: 154 },
        { year: "1995", value: 47 },
        { year: "1996", value: 31 },
        { year: "1997", value: 69 },
        { year: "1998", value: 84 },
        { year: "1999", value: 33 }
      ],
      scale: [
        {
          dataKey: "value",
          min: 0
        },
        {
          dataKey: "year",
          min: 0,
          max: 1
        }
      ],
      options: [
        {
          value: "选项1",
          label: "校区报名人数"
        }
      ],
      value: "选项1"
    };
  }
};
</script>