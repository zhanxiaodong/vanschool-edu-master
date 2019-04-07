<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <search-bar
      :form-map="searchFormData"
      url="url"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="num"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="dorm"
          label="寝室"
          align="center"
        />
        <el-table-column
          prop="semester"
          label="学期"
          align="center"
        />
        <el-table-column label="寝室成员" align="center">
          <template slot-scope="scope">
            {{ scope.row.members.join('、') }}
          </template>
        </el-table-column>
        <el-table-column label="纪律扣分(当天/本周)" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.discipline }}/{{ totals.discipline }}
          </template>
        </el-table-column>
        <el-table-column label="卫生扣分(当天/本周)" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.hygiene }}/{{ totals.hygiene }}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalDeduction"
          label="总扣分"
          align="center"
        />
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Dorms",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        dates: {
          label: "选择日期",
          type: "daterange",
          col: { md: 9, lg: 6, xl: 6 }
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          id: 1,
          num: "xx",
          dorm: "xxx",
          semester: "201802",
          members: ["aa", "bb", "cc"],
          discipline: 12,
          hygiene: 10,
          totalDeduction: 32
        }
      ],
      totals: {
        discipline: 42,
        hygiene: 20
      }
    };
  },
  methods: {
    onSearch(payload) {
      window.console.log(payload.form);
    },
    getList() {
      // this.getTableData()
    }
  }
};
</script>
