<template>
  <div class="tab-personal">
    <el-row
      type="flex"
      class="simple-search-bar"
    >
      <el-col :span="5">
        <el-date-picker
          v-model="week"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          size="small"
        >
        </el-date-picker>
      </el-col>
      <el-col
        :span="19"
        style="text-align:right;"
      >
        <el-button @click="substituteDialogVisible = true">代 课</el-button>
        <el-button @click="replateDialogVisible = true">换 课</el-button>
      </el-col>
    </el-row>
    <el-alert
      type="info"
      title="颜色指示"
      show-icon
      style="margin-bottom: 12px"
    >
      <slot>
        <div>
          <div class="palatte-tips">
            <div
              class="color"
              style="background-color: #00CB99"
            />
            <div class="desc">已正常结束</div>
          </div>
          <div class="palatte-tips">
            <div
              class="color"
              style="background-color: #409EFF"
            />
            <div class="desc">尚未开始</div>
          </div>
          <div class="palatte-tips">
            <div
              class="color"
              style="background-color: #FFCC47"
            />
            <div class="desc">正在进行</div>
          </div>
          <div class="palatte-tips">
            <div
              class="color"
              style="background-color: #E65D6E"
            />
            <div class="desc">旷课</div>
          </div>
          <div class="palatte-tips">
            <div
              class="color"
              style="background-color: #797979"
            />
            <div class="desc">请假或调换</div>
          </div>
        </div>
      </slot>
    </el-alert>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="period"
          label="节次"
          align="center"
        />
        <el-table-column
          prop="time"
          label="时间"
          align="center"
        />
        <el-table-column
          label="周一"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.mon.status]}`">{{ scope.row.mon.class }} {{ scope.row.mon.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周二"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.tue.status]}`">{{ scope.row.tue.class }} {{ scope.row.tue.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周三"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.wed.status]}`">{{ scope.row.wed.class }} {{ scope.row.wed.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周四"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.thu.status]}`">{{ scope.row.thu.class }} {{ scope.row.thu.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周五"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.fri.status]}`">{{ scope.row.fri.class }} {{ scope.row.fri.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周六"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.sat.status]}`">{{ scope.row.sat.class }} {{ scope.row.sat.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周日"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="`dot-${statusColorMap[scope.row.sun.status]}`">{{ scope.row.sun.class }} {{ scope.row.sun.subject }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="substituteDialogVisible"
      title="代 课"
    >
      <el-form label-width="4em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="substituteForm.date"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程：">
              <el-select v-model="substituteForm.subject" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代课老师：">
              <el-select
                v-model="substituteForm.teacher"
                placeholder="选择代课老师"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="代课理由：">
              <el-input
                v-model="substituteForm.reason"
                type="textarea"
                rows="4"
                placeholder="输入代课理由"
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
          type="primary"
          icon="el-icon-check"
          @click="substituteDialogVisible = false"
        >提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="replateDialogVisible"
      title="换 课"
    >
      <el-form label-width=4em>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="replaceForm.date1"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程：">
              <el-select v-model="replaceForm.subject1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="换课老师：">
              <el-select v-model="replaceForm.teacher" placeholder="请选择换课老师"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="replaceForm.date2"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程：">
              <el-select v-model="replaceForm.subject2" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="换课理由：">
              <el-input
                v-model="replaceForm.reason"
                type="textarea"
                rows="4"
                placeholder="请输入换课理由"
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
          type="primary"
          icon="el-icon-check"
          @click="substituteDialogVisible = false"
        >提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const STATUS_COLOR_MAP = {
  passed: "green",
  about: "blue",
  missed: "pink",
  replaced: "grey",
  ongoing: "orange"
};
export default {
  name: "TabPersonal",
  data() {
    return {
      week: "",
      list: [
        {
          period: "早读",
          time: "7:30-8:00",
          mon: { class: "402", subject: "语文", status: "passed" },
          tue: { class: "402", subject: "语文", status: "about" },
          wed: { class: "402", subject: "语文", status: "passed" },
          thu: { class: "402", subject: "语文", status: "missed" },
          fri: { class: "402", subject: "语文", status: "replaced" },
          sat: { class: "402", subject: "语文", status: "passed" },
          sun: { class: "402", subject: "语文", status: "ongoing" }
        }
      ],
      substituteDialogVisible: false,
      replateDialogVisible: false,
      substituteForm: {},
      replaceForm: {},
      statusColorMap: STATUS_COLOR_MAP
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="scss" scoped>
.palatte-tips {
  display: inline-flex;
  margin-right: 12px;
  .color {
    width: 8px;
    height: 8px;
    border-radius: 50px;
    margin-right: 4px;
    position: relative;
    top: 6px;
  }
  .desc {
    line-height: 20px;
    font-size: 13px;
  }
}
</style>
