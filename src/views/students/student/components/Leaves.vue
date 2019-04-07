<template>
  <div class="table-container">
    <el-table
      :data="list"
    >
      <el-table-column
        prop="type"
        label="请假类型"
        align="center"
      />
      <el-table-column
        prop="leaveTime"
        label="请假时间"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="applicationTime"
        label="申请时间"
         align="center"
      />
      <el-table-column
        prop="applicant"
        label="申请人"
         align="center"
      />
      <el-table-column label="状态"  align="center">
        <template slot-scope="scope">
          <span :class="`dot-${STATUS_MAP[scope.row.status].color}`">
            {{ STATUS_MAP[scope.row.status].name }}
            <small>{{ scope.row.reviewer }}</small>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const STATUS_MAP = {
  1: { name: "已销假", color: "green" },
  2: { name: "不通过", color: "pink" }
};

export default {
  name: "TabLeaves",
  data() {
    return {
      list: [
        {
          type: "事假申请",
          leaveTime: "2018-05-08 14:58 至 06-03 14:58",
          applicationTime: "2018/5/8 14:58",
          applicant: "张三",
          status: 1
        },
        {
          type: "事假申请",
          leaveTime: "2018-05-08 14:58 至 06-03 14:58",
          applicationTime: "2018/5/8 14:58",
          applicant: "张三",
          status: 2,
          reviewer: "李四"
        }
      ],
      STATUS_MAP
    };
  }
};
</script>
