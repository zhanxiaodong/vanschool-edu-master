<template>
  <div class="management-schedules">
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
        <el-col
          :span="24"
          style="text-align:right"
        >
          <el-button @click="dialogVisible = true">批量导出课表</el-button>
        </el-col>
      </el-row>
      <div class="table-container">
        <el-table :data="list">
          <el-table-column
            type="selection"
            width="36"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            width="96"
            label="学号"
            align="center"
          />
          <el-table-column
            prop="semester"
            label="学期"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="className"
            label="班级"
            align="center"
          />
          <el-table-column
            label="报读课程"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.courses.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="purchased"
            label="购买主课时(小时)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="used"
            label="消耗主课时(小时)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="left"
            label="剩余主课时(小时)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="purchasedVip"
            label="购买VIP主课时(小时)"
            min-width="160"
            align="center"
          />
          <el-table-column
            prop="usedVip"
            label="消耗VIP主课时(小时)"
            min-width="160"
            align="center"
          />
          <el-table-column
            prop="usedVip"
            label="未排课时(小时)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="leftVip"
            label="剩余VIP主课时(小时)"
            min-width="160"
            align="center"
          />
          <el-table-column
            prop="status"
            label="状态"
            align="center"
          />
          <el-table-column
            width="164"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({path:'/management/schedules/solo'})">一人一课表</el-button>
              <el-button
                type="text"
                @click="handleExport(scope.row)"
              >导出课表</el-button>
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
      title="批量导出课表"
      width="520px"
    >
      <el-form label-width="6em">
        <el-form-item label="选择周：">
          <el-date-picker
            v-model="dialogForm.week"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
          />
        </el-form-item>
        <el-form-item label="班级：">
          <el-select
            v-model="dialogForm.class"
            placeholder="选择班级"
          />
        </el-form-item>
        <el-form-item label="课表情况：">
          <el-select
            v-model="dialogForm.type"
            placeholder="选择课表情况"
          >
            <el-option
              value="1"
              label="所有学生课表"
            />
            <el-option
              value="2"
              label="走读学生课表"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "managementSchedules",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "姓名", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        num: { label: "学号", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        class: { label: "班级", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        courses: {
          label: "报课",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 }
        },
        status: {
          label: "状态",
          type: "select",
          options: [
            { label: "在校", value: 1 },
            { label: "预报名", value: 2 },
            { label: "未入学", value: 3 },
            { label: "结课", value: 4 },
            { label: "退学", value: 5 },
            { label: "辞退", value: 6 },
            { label: "休学", value: 7 }
          ],
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
          num: "201800872",
          name: "xxx",
          className:"1任-A班",
          semester: "20182",
          courses: ["大冲班", "VIP"],
          status: "在读",
          purchased: 2,
          used: 1,
          left: 1,
          purchasedVip: 1,
          usedVip: 0,
          leftVip: 1
        },
        {
          id: 1,
          num: "201800872",
          name: "xxx",
          className:"1任-A班",
          semester: "20182",
          courses: ["大冲班", "VIP"],
          status: "在读",
          purchased: 2,
          used: 1,
          left: 1,
          purchasedVip: 1,
          usedVip: 0,
          leftVip: 1
        },
        {
          id: 1,
          num: "201800872",
          name: "xxx",
          className:"1任-A班",
          semester: "20182",
          courses: ["大冲班", "VIP"],
          status: "在读",
          purchased: 2,
          used: 1,
          left: 1,
          purchasedVip: 1,
          usedVip: 0,
          leftVip: 1
        },
        {
          id: 1,
          num: "201800872",
          name: "xxx",
          className:"1任-A班",
          semester: "20182",
          courses: ["大冲班", "VIP"],
          status: "在读",
          purchased: 2,
          used: 1,
          left: 1,
          purchasedVip: 1,
          usedVip: 0,
          leftVip: 1
        }
      ],
      dialogVisible: false,
      dialogForm: {}
    };
  },
  methods: {
    onSearch(payload) {
      window.console.log(payload.form);
    },
    getList() {
      // this.getTableData()
    },
    handleExport(row) {
      this.dialogVisible = true;
      window.console.log(row);
    }
  }
};
</script>
