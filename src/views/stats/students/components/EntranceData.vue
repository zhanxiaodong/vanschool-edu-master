<template>
  <div class="entrance-data">
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
          size="small"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-table
      :data="tableData6"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1"
      >
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2"
      >
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "EntranceData",
  data() {
    return {
      daterange: "",
      tableData6: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ]
    };
  },
  methods: {
    // eslint-disable-next-line 
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    }
  }
};
</script>