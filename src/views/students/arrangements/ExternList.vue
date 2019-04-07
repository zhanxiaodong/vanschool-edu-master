<template>
  <el-dialog
    title="学生列表"
    :visible="visible"
    width="720px"
    @close="$emit('close')"
  >
    <el-table :data="gridData">
      <el-table-column
        prop="name"
        label="学生"
        align="center"
      />
      <el-table-column
        prop="className"
        label="班级"
        align="center"
      />
      <el-table-column
        prop="studNo"
        label="学号"
        align="center"
      />
      <el-table-column
        prop="classAdviser"
        label="班主任"
        align="center"
      />
      <el-table-column
        prop="isExtern"
        label="是否为走读生"
        align="center"
      />
    </el-table>
    <div class="table-container-footer">
      <pagination
        v-show="total"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="handlePageChange"
      />
    </div>
  </el-dialog>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "ExternList",
  components: { Pagination },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gridData: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0
    };
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.queryTableData();
      }
    }
  },
  methods: {
    // 获取列表数据
    queryTableData(queryKeys = {}) {
      const { page, limit } = this.listQuery;
      const {classAdviser,className} = this.rowData;
      this.$root
        .request({
          url: `/man/class/student/query`,
          method: "POST",
          data: {
            page,
            pageSize: limit,
            classId: this.rowData.id,
            subjectId: this.rowData.courseId,
            ...queryKeys
          }
        })
        .then(res => {
          this.gridData = res.result.map(item => ({
            name: item.name,
            studNo: item.studNo,
            classAdviser,
            className,
            isExtern: { 1: "否", 2: "是" }[item.type]
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryTableData({ page, pageSize })
    }
  }
};
</script>