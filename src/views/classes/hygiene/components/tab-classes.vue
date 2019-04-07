<template>
  <div class="classes-hygiene">
    <el-row>
      <el-col :span="18">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col
        :span="6"
        style="text-align:right"
      >
        <el-button
          type="primary"
          @click="$router.push({path:'/classes/hygiene/inspection',query:{type:2}})"
        >卫生检查</el-button>
        <el-button type="danger">确认</el-button>
      </el-col>
    </el-row>
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
        <el-table-column
          prop="className"
          label="班级"
          align="center"
        />
        <el-table-column
          prop="score"
          label="分数"
          align="center"
        />
        <el-table-column
          prop="dutys"
          label="值日生"
          align="center"
        />
        <el-table-column
          label="位置"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.hygienes"
              :key="item.id"
              class="cell-row"
            >{{item.position}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="检查情况"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.hygienes"
              :key="item.id"
              class="cell-row"
            >{{({'1':'完全符合 ','0':'基本符合','-1':'较差','-2':'很差'})[item.inspect] || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default {
  name: "HygieneClasses",
  components: { SearchBar, Pagination },
  data() {
    return {
      loading: false,
      searchFormData: {
        date: { label: "选择日期", type: "date", col: { md: 10, lg: 9, xl: 9 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      listData: []
    };
  },
  created() {
    this.queryTableData();
  },
  computed: {
    schoolId() {
      return Number(this.$store.state.schoolId);
    }
  },
  methods: {
    queryTableData(queryKeys = {}) {
      const { page, limit: pageSize } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/man/room/hygiene/query`,
          method: "POST",
          data: {
            type: 2,
            schoolId: this.schoolId,
            page,
            pageSize,
            ...queryKeys
          }
        })
        .then(res => {
          this.listData = res.result.map(item => ({
            className: item.manClass.name,
            score: item.score,
            hygienes: item.hygienes,
            dutys: item.hygienes[0].name,
            roomId: item.manClass.roomId
          }));
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryTableData({ page, pageSize });
    },
    // 搜索
    onSearch({ date }) {
      this.queryTableData({ startDate: date.getTime() });
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: "/classes/hygiene/inspection",
        query: { type: 2 ,roomId:row.roomId}
      });
    }
  }
};
</script>
