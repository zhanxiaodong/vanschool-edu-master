<template>
  <el-card shadow="never">
    <el-table
      v-loading="loading"
      :data="checkList"
    >
      <el-table-column
        prop="name"
        :label="type === '2' ? '班级' :'寝室'"
        align="center"
      ></el-table-column>
      <el-table-column
        min-width="100"
        label="位置"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.list"
            :key="item.id"
            class="cell-row"
          >
            {{item.position}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="260"
        label="检查内容"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.list"
            :key="item.id"
            class="cell-row"
          >
            {{item.content}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="检查"
        align="center"
        width="340"
      >
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.list"
            :key="item.id"
            class="cell-row"
          >
            <el-radio-group
              v-model="item.result"
              size="small"
              @change="(val)=>{handleCheckState(val,item,scope.row)}"
            >
              <el-radio-button label="完全符合+1"></el-radio-button>
              <el-radio-button label="基本符合"></el-radio-button>
              <el-radio-button label="较差-1"></el-radio-button>
              <el-radio-button label="较差-2"></el-radio-button>
            </el-radio-group>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="值日生名单"
        align="center"
        min-width="130"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.duty"
            multiple
            placeholder="请选择"
            @change="(arr)=>{handleDutyChange(arr,scope.row)}"
          >
            <el-option
              v-for="item in scope.row.studentList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "HygieneInspectionin",
  data() {
    return {
      type: 2,
      loading: false,
      checkList: []
    };
  },
  activated() {
    this.type = this.$route.query.type || 2;
    this.queryCheckList();
  },
  computed: {
    schoolId() {
      return Number(this.$store.state.schoolId);
    }
  },
  methods: {
    queryCheckList() {
      const roomId = this.$route.query.roomId || "";
      this.loading = true;
      this.$root
        .request({
          url: `/man/room/hygiene/add/${this.schoolId}`,
          method: "POST"
        })
        .then(() => {
          this.$root
            .request({
              url: `/man/room/hygiene/query`,
              method: "POST",
              data: { schoolId: this.schoolId, type: this.type, roomId }
            })
            .then(res => {
              const listData = res.result.map(item => ({
                roomId: this.type == 2 ? item.manClass.roomId : item.room.id,
                list: item.hygienes
                  ? item.hygienes.map(h => ({
                      ...h,
                      result: {
                        "1": "完全符合+1",
                        "0": "基本符合",
                        "-1": "较差-1",
                        "-2": "较差-2"
                      }[h.inspect]
                    }))
                  : [],
                name: this.type == 2 ? item.manClass.name : item.room.roomName,
                studentList: item.students ? item.students : [],
                duty:
                  item.hygienes && item.hygienes[0] && item.hygienes[0].name
                    ? item.hygienes[0].name.split(",")
                    : []
              }));
              this.checkList = listData;
            })
            .catch(err => {
              window.console.error(err);
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 卫生检查状态切换
    handleCheckState(val, pos, row) {
      const inspect = {
        "完全符合+1": 1,
        基本符合: 0,
        "较差-1": -1,
        "较差-2": -2
      }[val];
      this.handleModifyHygiene({
        id: pos.id,
        roomId: row.roomId,
        name: "",
        inspect
      });
    },
    // 选择值日生
    handleDutyChange(val, row) {
      const dutys = [...val].join(",");
      const inspectPos = row.list[0] || { id: "" };
      this.handleModifyHygiene({
        id: inspectPos.id,
        roomId: row.roomId,
        name: dutys,
        inspect: ""
      });
    },
    //
    handleModifyHygiene(sendData) {
      this.$root
        .request({
          url: `/man/room/hygiene/update`,
          method: "POST",
          data: sendData
        })
        .then(() => {
          this.$notify({
            title: "操作成功！",
            type: "success"
          });
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-tools-bar {
  margin: 1em 0 0 0;
  text-align: right;
}
</style>
