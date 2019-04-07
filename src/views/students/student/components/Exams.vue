<template>
  <div class="table-container">
    <el-table
      :data="list"
    >
      <el-table-column
        prop="exam"
        label="考试"
        align="center"
      />
      <el-table-column
        prop="time"
        label="时间"
        min-width="120"
      />
      <el-table-column label="科目" align="center">
        <template slot-scope="scope">
          <ul class="nested-cells">
            <li
              v-for="(item, index) in scope.row.subjects"
              :key="index"
            >{{ item.name }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="分数" align="center">
        <template slot-scope="scope">
          <ul class="nested-cells">
            <li
              v-for="(item, index) in scope.row.subjects"
              :key="index"
            >{{ item.score }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="总分" align="center">
        <template slot-scope="scope">
          <ul class="nested-cells">
            <li
              v-for="(item, index) in scope.row.subjects"
              :key="index"
            >{{ item.total }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="年级平均分" align="center">
        <template slot-scope="scope">
          <ul class="nested-cells">
            <li
              v-for="(item, index) in scope.row.subjects"
              :key="index"
            >{{ item.average }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="排名" align="center">
        <template slot-scope="scope">
          <ul class="nested-cells">
            <li
              v-for="(item, index) in scope.row.subjects"
              :key="index"
            >{{ item.ranking }} | {{ item.all }}</li>
          </ul>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TabExams",
  data() {
    return {
      list: [
        {
          exam: "6月第二周周考",
          time: "2018.6.20-2018.6.22",
          subjects: [
            {
              name: "语文",
              score: 64,
              total: 150,
              average: 80,
              ranking: 71,
              all: 100
            },
            {
              name: "数学",
              score: 64,
              total: 150,
              average: 80,
              ranking: 71,
              all: 100
            },
            {
              name: "外语",
              score: 64,
              total: 150,
              average: 80,
              ranking: 71,
              all: 100
            },
            {
              name: "地理",
              score: 64,
              total: 150,
              average: 80,
              ranking: 71,
              all: 100
            }
          ]
        }
      ]
    };
  }
};
</script>
