<template>
  <el-card shadow="never">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="查看平均分"
        name="average"
      >
        <tab-average />
      </el-tab-pane>
      <el-tab-pane
        label="分段统计表"
        name="segment"
      >
        <tab-segment />
      </el-tab-pane>
      <el-tab-pane
        label="考试排名表"
        name="ranking"
      >
        <tab-ranking />
      </el-tab-pane>
      <el-tab-pane
        label="成绩对比"
        name="score"
      >
        <tab-score />
      </el-tab-pane>
      <el-tab-pane
        label="学考危分分布"
        name="danger"
      >
        <tab-risk />
      </el-tab-pane>
      <el-tab-pane
        label="学考危分详情"
        name="dangerDesc"
      >
        <tab-risk-details/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabAverage from "./components/tab-average";
import TabSegment from "./components/tab-segment";
import TabRanking from "./components/tab-ranking";
import TabScore from "./components/tab-score";
import TabRisk from "./components/tab-risk";
import TabRiskDetails from "./components/tab-risk-details";

export default {
  name: "Analysis",
  components: {
    TabAverage,
    TabSegment,
    TabRanking,
    TabScore,
    TabRisk,
    TabRiskDetails
  },
  data() {
    return {
      activeTab: "average"
    };
  }
};
</script>
