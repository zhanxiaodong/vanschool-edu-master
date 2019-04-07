<template>
  <div class="tab-exchange">
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="author"
          label="发起人"
          align="center"
        />
        <el-table-column
          prop="original"
          label="原课程"
          align="center"
        />
        <el-table-column
          prop="type"
          label="方式"
          align="center"
        />
        <el-table-column
          prop="target"
          label="目标老师"
          align="center"
        />
        <el-table-column
          prop="result"
          label="调换课程"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        />
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
export default {
  name: "TabExchange",
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          author: "张三",
          original: "6-23 第2节、第3节",
          type: "调课",
          target: "李四",
          result: "6-23 第4节、第5节",
          status: "已审核：确认无误"
        }
      ]
    };
  },
  methods: {
    handleChangePage({ page, pageSize }) {
      window.console.log({ page, pageSize });
    }
  }
};
</script>
