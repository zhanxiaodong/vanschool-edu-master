<template>
  <el-card shadow="never">
    <el-row
      type="flex"
      align="top"
      class="simple-search-bar"
    >
      <el-col :span="12">
        <search-bar
          :form-map="searchFormData"
          @search="onSearch"
        />
      </el-col>
      <el-col
        :span="12"
        style="text-align:right"
      >
        <el-radio-group v-model="radio4">
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="本学期"></el-radio-button>
        </el-radio-group>
        <el-button style="margin:0 0 0 1em">导出</el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="group"
          label="学科组"
        />
        <el-table-column
          prop="rollups"
          label="报名"
        />
        <el-table-column
          prop="replaceClass"
          label="换班"
        />
        <el-table-column
          prop="replaceLesson"
          label="换课"
        />
        <el-table-column
          prop="abandonLesson"
          label="弃课"
        />
        <el-table-column
          prop="kickedOut"
          label="退学"
        />
        <el-table-column
          prop="present"
          label="在读"
        />
        <el-table-column
          prop="ratio"
          label="留存率"
        />
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="onSearch"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Transfer",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        time: { label: "时间段", type: "daterange", col: 18 }
      },
      filterData: [
        { label: "本周", value: "week" },
        { label: "本学期", value: "semester" }
      ],
      selectedFilter: "week",
      radio4: "",
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 30,
      list: [
        {
          group: "401",
          rollups: 40,
          replaceClass: 10,
          replaceLesson: 10,
          abandonLesson: 3,
          kickedOut: 1,
          present: 28,
          ratio: "78%"
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
