<template>
  <el-row
    type="flex"
    align="middle"
    class="simple-search-bar"
  >
    <el-col :span="12">
      <el-radio-group v-model="radio4">
        <el-radio-button label="本周"></el-radio-button>
        <el-radio-button label="本学期"></el-radio-button>
      </el-radio-group>
    </el-col>
    <el-col
      :span="12"
      style="text-align:right"
    >
      <el-button @click="handleExport">导出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:"StatsTeachersToolBar",
  data(){
    return{
      radio4:""
    }
  },
  methods: {
    //导出有问题 待解决!!!
    handleExport() {
      let queryKeys = { result: 0, type: 2 }
      queryKeys = this.$root.urlQuerys(queryKeys)
      const loadingVM = this.$loading({
        fullscreen: true,
        text: '正在导出,请稍后...'
      })
      this.$root
        .http({
          url: `/client/export?${queryKeys}`,
          method: 'GET'
        })
        .then(res => {
          if (res) {
            const fileName = res.headers
              .get('content-disposition')
              .split('=')[1]
            res.blob().then(blob => {
              const a = document.createElement('a')
              const aclickEvnet = document.createEvent('MouseEvent')
              aclickEvnet.initEvent('click', true, true)
              a.href = URL.createObjectURL(blob)
              a.download = fileName
              a.dispatchEvent(aclickEvnet)
              loadingVM.close()
            })
          } else {
            loadingVM.close()
          }
        })
        .catch(err => {
          window.console.error(err)
          loadingVM.close()
        })
    }
  }
  
};
</script>