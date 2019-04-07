<template>
  <el-card shadow="never">
    <div v-loading="loading" class="table-box">
      <table class="exams-verify-list">
        <thead>
          <tr>
            <th>班级</th>
            <th>姓名</th>
            <th>准考证号</th>
            <template v-if="listData[0]">
              <template v-for="n in listData[0].examLicenceListVos.length">
                <th :key="n+'a'">考试科目</th>
                <th :key="n+'b'">考场</th>
                <th :key="n+'c'">座位号</th>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in listData" :key="row.id">
            <td>{{row.className}}</td>
            <td>{{row.subName}}</td>
            <td>{{row.examNumber}}</td>
            <template v-for="(s,idx) in row.examLicenceListVos">
              <td :key="idx+'a'">{{s.subName}}</td>
              <td :key="idx+'b'">{{row.roomName}}</td>
              <td :key="idx+'c'">{{row.seatNumber}}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ExamsVerifyList",
  data() {
    return {
      loading:false,
      listData: []
    };
  },
  activated() {
    this.queryTableData();
  },
  methods: {
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/task/exam/exam/check`,
          method: "POST",
          data: { batch: this.$route.query.batch }
        })
        .then(res => {
          this.listData = res;
        })
        .catch(err => {
          window.console.error(err);
        }).finally(()=>{
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  overflow: auto;
  min-height: 200px;
}
.exams-verify-list {
  width: 100%;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  & td,
  th {
    text-align: center;
    border: 1px solid #ebeef5;
    padding: 0.8em 0;
    min-width: 6em;
  }
  & th {
    background-color: #f0f0f0;
    border: 1px solid #eeeeee;
  }
}
</style>
