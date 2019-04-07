<template>
  <div class="tab-violations">
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="time"
          label="时间"
          align="center"
          width="140"
        />
        <el-table-column
          prop="grade"
          label="事故等级"
          align="center"
          width="100"
        />
        <el-table-column
          prop="type"
          label="事故分类"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="reason"
          label="事故原因"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="teacher"
          label="事故老师"
          align="center"
          width="90"
        />
        <el-table-column
          prop="leader"
          label="教研组长"
          align="center"
          width="90"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="140"
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
  name: "TabViolations",
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
          time: "2018/4/25 12:51",
          grade: "A",
          type: "5、上课迟到或早退5分钟以内（含自习、坐班）",
          reason: "Lorem ipsum dolor sit amet consectetur.",
          teacher: "张三",
          leader: "李四",
          status: "已审核：确认无误"
        },
        {
          time: "2018/4/25 12:51",
          grade: "A",
          type: "5、上课迟到或早退5分钟以内（含自习、坐班）",
          reason: "Lorem ipsum dolor sit amet consectetur.",
          teacher: "张三",
          leader: "李四",
          status: "已审核：确认无误"
        },
        {
          time: "2018/4/25 12:51",
          grade: "A",
          type: "5、上课迟到或早退5分钟以内（含自习、坐班）",
          reason: "Lorem ipsum dolor sit amet consectetur.",
          teacher: "张三",
          leader: "李四",
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
