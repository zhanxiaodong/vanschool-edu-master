<template>
  <div class="campus-students">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月份"
          size="small"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="tableData">
      <el-table-column
        prop="f0"
        label="校区"
      />
      <el-table-column
        prop="f1"
        label="分配"
      />
      <el-table-column
        prop="f2"
        label="退学"
      />
      <el-table-column
        prop="f3"
        label="结业"
      />
      <el-table-column
        prop="f4"
        label="换班"
      />
      <el-table-column
        prop="f5"
        label="在读"
      />
      <el-table-column
        prop="f6"
        label="留存率"
      >
        <template slot-scope="scope">{{ scope.row.f6 * 100 + '%' }}</template>
      </el-table-column>
      <el-table-column
        prop="f7"
        label="满班率"
      >
        <template slot-scope="scope">{{ scope.row.f7 * 100 + '%' }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CampusStudents",
  data() {
    return {
      month: "",
      tableData: [
        {
          f0: "银湖校区",
          f1: "29",
          f2: "6",
          f3: "0",
          f4: "1",
          f5: "2",
          f6: 0.35,
          f7: 0.78
        },
        {
          f0: "硅谷校区",
          f1: "29",
          f2: "6",
          f3: "0",
          f4: "1",
          f5: "2",
          f6: 0.35,
          f7: 0.78
        },
        {
          f0: "富阳校区",
          f1: "29",
          f2: "6",
          f3: "0",
          f4: "1",
          f5: "2",
          f6: 0.35,
          f7: 0.78
        },
        {
          f0: "K12校区",
          f1: "29",
          f2: "6",
          f3: "0",
          f4: "1",
          f5: "2",
          f6: 0.35,
          f7: 0.78
        }
      ]
    };
  },
  methods:{
    handleClick(row){
      window.console.log(row);
    }
  }
};
</script>