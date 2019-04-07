<template>
  <el-row
    type="flex"
    align="middle"
    class="simple-search-bar"
  >
    <el-col :span="12">
      <el-radio-group v-model="radio4">
        <el-radio-button label="本周"></el-radio-button>
        <el-radio-button label="本学期"></el-radio-button>
      </el-radio-group>
    </el-col>
    <el-col
      :span="12"
      style="text-align:right"
    >
      <el-button>导出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:"StatsTeachersToolBar",
  data(){
    return{
      radio4:""
    }
  }
};
</script>