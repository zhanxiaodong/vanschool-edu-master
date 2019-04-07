<template>
  <el-card
    class="card-style"
    shadow="never"
  >
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
        <el-table-column
          prop="name"
          label="班级名称"
          align="center"
        />
        <el-table-column
          prop="status"
          label="班级状态"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="classAdviser"
          label="班主任"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.classAdviser|| '-'}}</template>
        </el-table-column>
        <el-table-column
          prop="tern"
          label="学期"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="subjects"
          label="上课科目"
          align="center"
          min-width="140"
        >

        </el-table-column>
        <el-table-column
          label="学员数"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.numbers}} / {{scope.row.capacity}}
          </template>
        </el-table-column>
        <el-table-column
          label="走读数"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.goReadNumber}} / {{scope.row.goReadMax}}
          </template>
        </el-table-column>
        <el-table-column
          label="纪律扣分"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.dayHygiene}} / {{scope.row.monthHygiene}}
          </template>
        </el-table-column>
        <el-table-column
          label="卫生扣分"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.dayDiscipline}} / {{scope.row.monthDiscipline}}
          </template>
        </el-table-column>
        <el-table-column
          prop="arrangeCourseState"
          label="排课状态"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({path:`/classes/manage/details`,query:{id:scope.row.id}})"
              type="text"
            >查看详情</el-button>
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
  </el-card>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Management",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "班级", type: "input", col: { md: 8, lg: 5, xl: 5 } },
        classAdviser: {
          label: "班主任",
          type: "input",
          col: { md: 8, lg: 5, xl: 5 }
        },
        subject: {
          label: "科目",
          type: "select",
          multiple: true,
          options: [],
          col: { md: 8, lg: 5, xl: 5 }
        },
        status: {
          label: "状态",
          type: "select",
          col: { md: 8, lg: 5, xl: 5 },
          options: [
            {
              label: "待开课",
              value: "1"
            },
            {
              label: "已开课",
              value: "2"
            },
            {
              label: "已结课",
              value: "3"
            },
            {
              label: "所有",
              value: "4"
            }
          ]
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      listData: [],
      loading: false,
      tern: [],
      queryKeys: {
        subjects: [],
        manClass: {
          page: 1,
          pageSize: 20,
          termId: "",
          name: "",
          classAdviser: "",
          result: "",
          type: ""
        },
        classDeductionDto: {}
      }
    };
  },
  created() {
    this.queryTableData();
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.searchFormData.subject.options = res.result.map(item => ({
          label: item.courseName,
          value: item.id
        }));
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  computed: {
    shcoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取班级数据
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/class/query/class/info`,
          method: "POST",
          data: this.queryKeys
        })
        .then(res => {
          this.listData = res.result.map(item => ({
            name: item.manClass.name,
            status: { 1: "待开课", 2: "已开课", 3: "已结课" }[
              item.manClass.result
            ],
            classAdviser: item.manClass.classAdviser,
            tern: `${item.manClass.graduate}年第${item.manClass.tern}期`,
            subjects: item.subjects.map(s => s.courseName).join(" , "),
            numbers: item.manClass.numbers,
            capacity: item.manClass.capacity,
            goReadNumber: item.manClass.goReadNumber,
            goReadMax: item.manClass.goReadMax,
            arrangeCourseState: item.manClass.arrangeCourseState,
            dayHygiene: item.classDeductionDto.dayHygiene,
            monthHygiene: item.classDeductionDto.monthHygiene,
            dayDiscipline: item.classDeductionDto.dayDiscipline,
            monthDiscipline: item.classDeductionDto.monthDiscipline
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
      this.queryKeys.manClass.page = page;
      this.queryKeys.manClass.pageSize = pageSize;
      this.queryTableData();
    },
    // 查询
    onSearch({ name, classAdviser, subject, status }) {
      this.queryKeys.manClass.page = 1;
      this.queryKeys.manClass.pageSize = 20;
      this.queryKeys.manClass.name = name;
      this.queryKeys.manClass.classAdviser = classAdviser;
      this.queryKeys.manClass.result = status;
      this.queryKeys.subjects = subject.map(item => ({ id: item }));
      this.queryTableData();
    }
  }
};
</script>


