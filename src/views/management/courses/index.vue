<template>
  <div class="management-courses">
    <el-card shadow="never">
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <el-row
        type="flex"
        align="middle"
        class="simple-search-bar"
      >
        <el-col :span="6">
          <el-switch
            v-model="doNotShowFinishedClasses"
            active-text="不显示结课班级"
          ></el-switch>
        </el-col>
        <el-col
          :span="18"
          style="text-align:right"
        >
          <el-button
            style="margin:0 0.5em 0 0"
            type="primary"
            icon="el-icon-plus"
            @click="$router.push({path:'/management/courses/editClass'})"
          >创建班级</el-button>
          <el-button
            type="primary"
            @click="$router.push({path:'/management/courses/templates'})"
          >排课模板</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="listData">
          <el-table-column
           type="index"
           label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="班级名称"
            align="center"
          />
          <el-table-column
            prop="type"
            label="班级类型"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="classAdviser"
            label="班主任"
            align="center"
          />
          <el-table-column
            prop="tern"
            label="学期"
            align="center"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            prop="subjects"
            label="上课科目"
            min-width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="numbers"
            label="学员数"
            align="center"
          />
          <el-table-column
            prop="goReadNumber"
            label="需要走读学生"
            min-width="120"
            align="center"
          />>
          <!-- <template slot-scope="scope">{{  }}</template>
          </el-table-column>-->
          
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="$router.push({path:'/management/courses/editClass',query:{id:scope.row.id}})"
              >修改</el-button>
              <el-button
                type="text"
                @click="$router.push({path:'/management/courses/scheduling',query:{id:scope.row.id}})"
              >排课</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center"/>
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
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const classTypes = {
  "1": "行政班",
  "2": "临时班"
};

export default {
  name: "ManagementCourses",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "班  级", type: "input", col: { md: 8, lg: 5, xl: 5 } },
        tern: {
          label: "学  期",
          type: "select",
          options: [],
          col: { md: 8, lg: 5, xl: 5 }
        },
        classAdviser: {
          label: "班主任",
          type: "input",
          col: { md: 8, lg: 5, xl: 5 }
        },
        type: {
          label: "班级类型",
          type: "select",
          options: Object.keys(classTypes).map(key => ({
            label: classTypes[key],
            value: key
          })),
          col: { md: 8, lg: 5, xl: 5 }
        }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      doNotShowFinishedClasses: false,
      loading: false,
      classTypes,
      listData: [],
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
      .dispatch("queryTern")
      .then(res => {
        this.searchFormData.tern.options = res.result.map(item => ({
          label: `${item.ternName}年第${item.ternValue}期`,
          value: item.id
        }));
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  methods: {
    // 筛选
    onSearch({ name, tern, classAdviser, type }) {
      this.queryKeys.manClass.page = this.listQuery.page;
      this.queryKeys.manClass.pageSize = this.listQuery.pageSize;
      this.queryKeys.manClass.name = name;
      this.queryKeys.manClass.termId = tern;
      this.queryKeys.manClass.classAdviser = classAdviser;
      this.queryKeys.manClass.type = type;
      this.queryTableData();
    },
    // 获取所有班级Data
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
            id: item.manClass.id,
            name: item.manClass.name,
            status: { 1: "待开课", 2: "已开课", 3: "已结课" }[
              item.manClass.result
            ],
            classAdviser: item.manClass.classAdviser,
            tern: `${item.manClass.graduate}年第${item.manClass.tern}期`,
            subjects: item.subjects.map(s => s.courseName).join(" , "),
            numbers: item.manClass.numbers,
            type: classTypes[item.manClass.type],
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
    }
  }
};
</script>
