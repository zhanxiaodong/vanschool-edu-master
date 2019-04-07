<template>
  <div class="management-vip">
    <el-card shadow="never">
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <div class="table-container">
        <el-table :data="list">
          <el-table-column
            prop="name"
            label="学生姓名"
            align="center"
          />
          <el-table-column
            prop="teacher"
            label="负责老师"
            align="center"
          />
          <el-table-column
            prop="subject"
            label="科目"
            align="center"
          />
          <el-table-column
            prop="method"
            label="收货方式"
            align="center"
          />
          <el-table-column label="小组成员" align="center">
            <template slot-scope="scope">
              {{ scope.row.members.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间范围"
            align="center"
          />
          <el-table-column label="已用课时" align="center">
            <template slot-scope="scope">
              {{ scope.row.used }} / {{ scope.row.purchased }}
            </template>
          </el-table-column>
          <el-table-column
            prop="details"
            label="课消详情"
            align="center"
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="dialog1Visible = true; dialogForm = scope.row;"
              >课消</el-button>
              <el-button
                type="text"
                @click="dialog2Visible = true; dialogForm = scope.row;"
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
      :visible.sync="dialog1Visible"
      title="课消"
    >
      <el-form label-width="6em">
        <el-form-item label="科目：">
          <el-input
            v-model="dialogForm.subject"
            readonly
          />
        </el-form-item>
        <el-form-item label="上课老师：">
          <el-select
            v-model="dialogForm.teacher"
            placeholder="选择上课老师"
          />
        </el-form-item>
        <el-form-item label="上课时间：">
          <el-date-picker
            v-model="dialogForm.classTime"
            placeholder="选择上课时间"
          />
        </el-form-item>
        <el-form-item label="时间段：">
          <el-date-picker
            v-model="dialogForm.classTime"
            type="daterange"
          />
        </el-form-item>
        <el-form-item label="课时数：">
          <el-input
            :value="2"
            readonly
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog1Visible = false">取 消</el-button>
        <el-button @click="dialog1Visible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialog2Visible"
      title="修改"
    >
      <el-form label-width="6em">
        <el-form-item label="科目：">
          <el-input
            v-model="dialogForm.subject"
            readonly
          />
        </el-form-item>
        <el-form-item label="负责老师：">
          <el-select
            v-model="dialogForm.teacher"
            placeholder="选择负责老师"
          />
        </el-form-item>
        <el-form-item label="小组成员：">
          <el-select
            v-model="dialogForm.members"
            placeholder="选择小组成员"
            multiple
          />
        </el-form-item>
        <el-form-item label="时间范围：">
          <el-date-picker
            v-model="dialogForm.time"
            type="daterange"
          />
        </el-form-item>
        <el-form-item label="课时数：">
          <el-input
            :value="2"
            readonly
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog2Visible = false">取 消</el-button>
        <el-button @click="dialog2Visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "ManagementVip",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "班级", type: "input", col: { md: 7, lg: 5, xl: 5 } },
        time: { label: "时间", type: "daterange", col: { md: 8, lg: 6, xl: 6 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          name: "张三",
          teacher: "李四",
          subject: "xx",
          method: "一对一",
          members: ["张三"],
          time: "xxxx",
          purchased: 50,
          used: 25,
          remained: 25,
          details: "xxxx"
        }
      ],
      dialog1Visible: false,
      dialog2Visible: false,
      dialogForm: {}
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
