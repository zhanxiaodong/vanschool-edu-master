<template>
  <el-dialog :visible.sync="dialogVisible" title="录入学生" top="5vh" class="add-dialog">
    <h4>基础信息</h4>
    <el-form label-width="80px" class="el-form--split">
      <el-form-item label="学生姓名">
        <el-input v-model="dialogForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="dialogForm.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="dialogForm.grade" />
      </el-form-item>
      <el-form-item label="学期">
        <el-input v-model="dialogForm.semester" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="身分证号">
        <el-input v-model="dialogForm.idCard" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="dialogForm.num" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="dialogForm.mobile" />
      </el-form-item>
      <el-form-item label="户籍">
        <el-input v-model="dialogForm.hometown" />
      </el-form-item>
      <el-form-item label="原学校">
        <el-input v-model="dialogForm.origin" />
      </el-form-item>
      <el-form-item label="画室/机构">
        <el-input v-model="dialogForm.facility" />
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="dialogForm.wechat" />
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="dialogForm.profession" />
      </el-form-item>
      <el-form-item label="目标学校">
        <el-input v-model="dialogForm.goal" />
      </el-form-item>
      <el-form-item label="报读科目" class="full-width">
        <el-checkbox-group v-model="dialogForm.subjects">
          <el-checkbox v-for="item in subjects" :key="item.key" :label="item.key">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="入学成绩" class="full-width">
        <span v-for="item in dialogForm.rollupGrades" :key="item.key">
          <el-checkbox v-model="item.selected" @change="onCheckNested">{{ item.name }}</el-checkbox>
          <el-input v-model="item.grade" :disabled="!item.selected" size="mini" placeholder="分" class="grade-input" />
        </span>
      </el-form-item>
      <el-form-item label="目标成绩" class="full-width">
        <span v-for="item in dialogForm.goalGrades" :key="item.key">
          <el-checkbox v-model="item.selected" @change="onCheckNested">{{ item.name }}</el-checkbox>
          <el-input v-model="item.grade" :disabled="!item.selected" size="mini" placeholder="分" class="grade-input" />
        </span>
      </el-form-item>
    </el-form>

    <h4>背景信息</h4>
    <el-form label-width="80px" class="el-form--split">
      <el-form-item label="父亲姓名">
        <el-input v-model="dialogForm.father" />
      </el-form-item>
      <el-form-item label="父亲电话">
        <el-input v-model="dialogForm.fatherTel" />
      </el-form-item>
      <el-form-item label="父亲职业">
        <el-input v-model="dialogForm.fatherOccupation" />
      </el-form-item>
      <br>
      <el-form-item label="母亲姓名">
        <el-input v-model="dialogForm.mother" />
      </el-form-item>
      <el-form-item label="母亲电话">
        <el-input v-model="dialogForm.motherTel" />
      </el-form-item>
      <el-form-item label="母亲职业">
        <el-input v-model="dialogForm.motherOccupation" />
      </el-form-item>
      <br>
      <el-form-item label="家庭住址" class="full-width">
        <el-input v-model="dialogForm.familyAddress" type="textarea" />
      </el-form-item>
    </el-form>

    <h4>报读信息</h4>
    <el-form label-width="80px" class="el-form--split">
      <el-form-item label="课程顾问">
        <el-input v-model="dialogForm.counselor" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="报名日期">
        <el-input v-model="dialogForm.rollupDate" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="报到日期">
        <el-input v-model="dialogForm.checkinDate" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="报读产品">
        <el-input v-model="dialogForm.product" placeholder="自动读取" readonly />
      </el-form-item>
      <el-form-item label="选考科目" class="full-width">
        <el-checkbox-group v-model="dialogForm.exams">
          <el-checkbox v-for="item in subjects" :key="item.key" :label="item.key">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="退费银行账号" class="full-width">
        <el-input v-model="dialogForm.bankAccount" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="dialogForm.username" />
      </el-form-item>
      <el-form-item label="银行支行">
        <el-input v-model="dialogForm.bankBranch" />
      </el-form-item>
    </el-form>

    <h4>其他信息</h4>
    <el-form label-width="130px">
      <el-form-item label="最喜欢科目">
        <el-input v-model="dialogForm.favouriteSubject" />
      </el-form-item>
      <el-form-item label="最不喜欢科目">
        <el-input v-model="dialogForm.leastFavouriteSubject" />
      </el-form-item>
      <el-form-item label="文化学习基础">
        <el-radio-group v-model="dialogForm.cultureBasis">
          <el-radio label="强">强</el-radio>
          <el-radio label="一般">一般</el-radio>
          <el-radio label="弱">弱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学习专注力">
        <el-radio-group v-model="dialogForm.focus">
          <el-radio label="强">强</el-radio>
          <el-radio label="一般">一般</el-radio>
          <el-radio label="弱">弱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学习习惯">
        <el-radio-group v-model="dialogForm.learningHabits">
          <el-radio label="好">好</el-radio>
          <el-radio label="一般">一般</el-radio>
          <el-radio label="弱">弱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否接受严格管理">
        <el-radio-group v-model="dialogForm.canAcceptStrictness">
          <el-radio label="能">能</el-radio>
          <el-radio label="否">否</el-radio>
          <el-radio label="有困难">有困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="遇到困难如何解决">
        <el-radio-group v-model="dialogForm.copingMethod">
          <el-radio label="放弃">放弃</el-radio>
          <el-radio label="坚持">坚持</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性格">
        <el-radio-group v-model="dialogForm.characters">
          <el-radio label="内向">内向</el-radio>
          <el-radio label="外向">外向</el-radio>
          <el-radio label="居中">居中</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好">
        <el-input v-model="dialogForm.hobby" />
      </el-form-item>
      <el-form-item label="身高">
        <el-input v-model="dialogForm.height" />
      </el-form-item>
      <el-form-item label="体重">
        <el-input v-model="dialogForm.weight" />
      </el-form-item>
      <el-form-item label="有无精神病、遗传性、传染性等疾病">
        <el-radio-group v-model="dialogForm.hasDiseases">
          <el-radio label="无">无</el-radio>
          <el-radio label="有">有</el-radio>
        </el-radio-group>
        <el-input v-if="Number(dialogForm.hasDiseases) === '无'" v-model="dialogForm.diseases" placeholder="请输入有哪些疾病..." />
      </el-form-item>
      <el-form-item label="父母是否经常与其沟通">
        <el-radio-group v-model="dialogForm.communicationWithParents">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父母对其评价">
        <el-input v-model="dialogForm.commentFromParents" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button plain>不通过</el-button>
      <el-button class="themed-button" icon="el-icon-check" @click="dialogVisible = false">通 过</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data(){
    return{
      subjects:[]
    }
  },
  computed: {
    dialogForm() {
      return {
        rollupGrades: this.subjects.map(v => ({
          name: v.name,
          key: v.key,
          selected: false,
          grade: null
        })),
        goalGrades: this.subjects.map(v => ({
          name: v.name,
          key: v.key,
          selected: false,
          grade: null
        })),
        subjects: []
      }
    }
  },
  methods: {
    onCheckNested() {
      this.$forceUpdate()
    }
  }
}
</script>
