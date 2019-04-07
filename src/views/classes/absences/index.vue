<template>
  <div class="classes-absences">
    <el-card shadow="never">
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <el-row class="table-tools-bar">
        <el-col style="text-align:right">
          <el-button
            type="primary"
            @click="dialogVisible = true"
          >添加缺课记录</el-button>
        </el-col>
      </el-row>
      <div class="table-container">
        <el-table :data="list">
          <el-table-column
            prop="num"
            label="学号"
          />
          <el-table-column
            prop="name"
            label="学生姓名"
            align="center"
          />
          <el-table-column
            prop="class"
            label="班级"
            align="center"
          />
          <el-table-column
            prop="classTime"
            label="上课时间"
            width="110"
            align="center"
          />
          <el-table-column
            prop="subject"
            label="科目"
            align="center"
          />
          <el-table-column
            prop="teacher"
            label="上课老师"
            align="center"
          />
          <el-table-column
            label="缺课状态"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.absenceStatus === 0 ? '未到' : '请假' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hours"
            label="授课课时"
            align="center"
          />
          <el-table-column
            label="是否扣课时"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.deduction ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="recordTime"
            label="录入时间"
            width="150"
            align="center"
          />
          <el-table-column
            prop="note"
            label="备注"
            min-width="180"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="selectedRow = scope.row; dialogVisible = true;"
              >修改</el-button>
            </template>
          </el-table-column>
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

    <el-dialog
      :visible.sync="dialogVisible"
      :title="Object.keys(selectedRow).length ? `编辑违纪` : '添加违纪'"
    >
      <el-form
        :model="selectedRow"
        label-width="6em"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="学号：">
              <el-input v-model="selectedRow.num" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input v-model="selectedRow.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-select v-model="selectedRow.class" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上课时间：">
              <el-date-picker
                v-model="selectedRow.classTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科目：">
              <el-input v-model="selectedRow.subject" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="老师：">
              <el-input v-model="selectedRow.teacher" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缺课状态：">
              <el-select v-model="selectedRow.absenceStatus" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扣工时：">
              <el-select
                v-model="selectedRow.deduction"
                placeholder="请选择是否扣工时"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input
                v-model="selectedRow.note"
                type="textarea"
                rows="4"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          class="themed-button"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "Absences",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "姓名", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        class: { label: "班级", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        lesson: { label: "课程", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        teacher: { label: "老师", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        dates: {
          label: "时间",
          type: "daterange",
          col: { md: 8, lg: 6, xl: 6 }
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
          num: "1212",
          class: "xxx",
          dorm: "xxx",
          name: "xxx",
          classTime: "2018-06-05 19:00~20:00",
          subject: "语文",
          teacher: "xxx",
          absenceStatus: 0,
          hours: 1,
          deduction: true,
          recordTime: "2018-04-04 12:00",
          note: "Lorem ipsum dolor sit."
        },
        {
          id: 2,
          num: "1212",
          class: "xxx",
          dorm: "xxx",
          name: "xxx",
          classTime: "2018-06-05 19:00~20:00",
          subject: "语文",
          teacher: "xxx",
          absenceStatus: 1,
          hours: 1,
          deduction: false,
          recordTime: "2018-04-04 12:00",
          note: "Lorem ipsum dolor sit."
        }
      ],
      dialogVisible: false,
      selectedRow: {}
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
