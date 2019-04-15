<template>
  <div class="edit-class-info">
    <el-card
      shadow="never"
      class="card-style"
    >
      <div
        slot="header"
        class="card-title"
      >
        <strong>基础信息</strong>
      </div>
      <el-form
        class="edit-form"
        label-width="6em"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="班级名称：">
              <el-input
                v-model="dialogForm.name"
                placeholder="输入班级名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学期：">
              <el-select
                v-model="dialogForm.ternId"
                placeholder="选择学期"
              >
                <el-option
                  v-for="item in terns"
                  :key="item.value"
                  :label="item.label+'年第'+item.tern+'期'"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班主任：">
              <el-select
                v-model="dialogForm.classAdviser"
                placeholder="选择班主任"
                :disabled="dialogForm.type === '2'"
              >
                <el-option
                  v-for="item in teachers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教室：">
              <el-select
                v-model="dialogForm.roomId"
                placeholder="选择教室"
              >
                <el-option
                  v-for="item in roomName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：">
              <el-select
                v-model="dialogForm.result"
                placeholder="选择状态"
              >
                <el-option
                  :value="1"
                  label="待开课"
                />
                <el-option
                  :value="2"
                  label="已开课"
                />
                <el-option
                  :value="3"
                  label="已结课"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级类型：">
              <el-select
                v-model="dialogForm.type"
                placeholder="选择班级类型"
                @change="handleChangeClassType"
              >
                <el-option
                  v-for="(v,k) in classTypes"
                  :key="k"
                  :value="k"
                  :label="v"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生上限：">
              <el-input
                type="number"
                v-model="dialogForm.capacity"
                :disabled="dialogForm.type === '2'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="走读上限：">
              <el-input
                type="number"
                v-model="dialogForm.goReadMax"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="科目：">
          <el-select
            v-model="dialogForm.subjects"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in subjects"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="dialogForm.remark"
            type="textarea"
            rows="5"
            placeholder="填写备注"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit"
          >提 交</el-button>
          <el-button>重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="添加学生"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="5em">
        <el-form-item label="姓 名：">
          <el-input />
        </el-form-item>
        <el-form-item label="学 号：">
          <el-input />
        </el-form-item>
        <el-form-item label="科 目：">
          <el-input disabled />
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
const classTypes = {
  "1": "行政班",
  "2": "临时班"
};
export default {
  name: "ManagementEditClass",
  data() {
    return {
      dialogForm: {
        name: "",
        ternId: "",
        classAdviser: "",
        roomId: "",
        result: "",
        type: "",
        capacity: "",
        goReadMax: "",
        subjects: [],
        remark: ""
      },
      roomName: [],
      studentListData: [],
      teachers: [],
      terns: [],
      subjects: [],
      classTypes,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogVisible: true,
      isEdit: false
    };
  },
  activated() {
    // 获取所有科目
    this.getAllSubject();
    // 获取所有教室名和ID
    this.getAllClass();
    // 获取所有教师数据
    this.getAllTeacherData();
    // 查询学期
    this.getTernData();
    // 是否为编辑模式
    if (this.$route.query.id) {
      this.isEdit = true;
      this.queryEditData();
    } else {
      this.isEdit = false;
      this.dialogForm = {
        name: "",
        ternId: "",
        classAdviser: "",
        roomId: "",
        result: "",
        type: "",
        capacity: "",
        goReadMax: "",
        subjects: [],
        remark: ""
      };
    }
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    // 获取科目列表
    getAllSubject() {
      this.$root
        .request({
          url: `/man/subject/querys`,
          method: "POST"
        })
        .then(res => {
          this.subjects = res.result.map(item => ({
            value: item.id,
            label: item.courseName
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取班级列表
    getAllClass() {
      this.$root
        .request({
          url: `/man/room/query`,
          method: "POST",
          data: { schoolId: this.schoolId, type: 1, result: 0 }
        })
        .then(res => {
          this.roomName = res.result
            .filter(item => item.roomName)
            .map(item => ({ value: item.id, label: item.roomName }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取老师列表
    getAllTeacherData(cb = () => {}) {
      this.$root
        .request({
          url: `/man/teacher/query`,
          method: "POST",
          data: { schoolId: this.schoolId }
        })
        .then(res => {
          this.teachers = res.map(item => ({
            value: item.id,
            label: item.name
          }));
          cb();
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 获取学期列表
    getTernData(cb = () => {}) {
      this.$root
        .request({
          url: `/man/tern/querys`,
          method: "POST"
        })
        .then(res => {
          this.terns = res.result.map(item => ({
            value: item.id,
            label: item.ternName,
            tern: item.ternValue
          }));
          cb();
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 学生列表翻页
    handleChangePage({ page, pageSize }) {
      window.console.log({ page, pageSize });
    },
    // 添加学生
    handleCreate() {
      this.dialogVisible = true;
    },
    // 创建班级
    handleSubmit() {
      let formData = {
        manClass: {
          id : this.dialogForm.id || "",
          name: this.dialogForm.name,
          type: parseInt(this.dialogForm.type),
          result: parseInt(this.dialogForm.result),
          capacity: parseInt(this.dialogForm.capacity),
          goReadMax: parseInt(this.dialogForm.goReadMax),
          remark: this.dialogForm.remark,
          schoolId: this.$store.state.schoolId
        },
        subjects: []
      };
      // 整理表单数据为后台需要的格式
      const roomInfo = this.roomName.find(
        item => item.value === this.dialogForm.roomId
      );
      const ternsInfo = this.terns.find(
        item => item.value === this.dialogForm.ternId
      );
      const teachersInfo = this.teachers.find(
        item => item.value === this.dialogForm.classAdviser
      );
      formData.manClass.roomName = roomInfo ? roomInfo.label : "";
      formData.manClass.roomId = roomInfo ? parseInt(roomInfo.value) : "";
      formData.manClass.termId = ternsInfo ? parseInt(ternsInfo.value) : "";
      formData.manClass.tern = ternsInfo ? parseInt(ternsInfo.tern) : "";
      formData.manClass.graduate = ternsInfo ? ternsInfo.label : "";
      formData.manClass.classAdviser = teachersInfo ? teachersInfo.label : "";
      formData.manClass.classAdviserId = teachersInfo ? teachersInfo.value : "";

      formData.subjects = this.dialogForm.subjects.map(item => ({
        id: parseInt(item)
      }));

      if (this.isEdit) {
        this.$root
          .request({
            url: `/man/class/update/${this.dialogForm.id}`,
            method: "POST",
            data: formData
          })
          .then(() => {
            this.$router.go(-1);
          })
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/class/add`,
            method: "POST",
            data: formData
          })
          .then(() => {
            this.$router.go(-1);
          })
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 创建班级的点击事件
    entrySetClass(row) {
      if (row) {
        this.isEdit = true;
        const currTeachers = this.teachers.find(
          item => item.label === row.classAdviser
        );
        this.dialogForm.name = row.name;
        this.dialogForm.ternId = row.tern;
        this.dialogForm.classAdviser = currTeachers ? currTeachers.value : "";
        this.dialogForm.roomId = row.roomId;
        this.dialogForm.result = row.result;
        this.dialogForm.type = row.type.toString();
        this.dialogForm.capacity = row.capacity;
        this.dialogForm.goReadMax = row.goReadMax;
        this.dialogForm.remark = row.remark;
      } else {
        this.dialogForm = {
          name: "",
          ternId: "",
          classAdviser: "",
          roomId: "",
          result: "",
          type: "",
          capacity: "",
          goReadMax: "",
          subjects: [],
          remark: ""
        };
      }
    },
    // 班级切换时
    handleChangeClassType(val) {
      // 所选班级类型为 临时班 时，无法设置班主任和学生上限
      if (val === "2") {
        this.dialogForm.classAdviser = "";
        this.dialogForm.capacity = "";
      }
    },
    // 获取编辑时数据
    queryEditData() {
      this.$root
        .request({
          url: `/man/class/query/class/subject`,
          method: "POST",
          data: {
            manClass: { id: Number(this.$route.query.id) },
            subjects: [],
            subjectVos: []
          }
        })
        .then(res => {
          const currData = res.result[0];
          const currTern = this.terns.find(
            item => item.tern == currData.manClass.tern
          );
          if (currData) {
            this.dialogForm = {
              id : currData.manClass.id,
              name: currData.manClass.name,
              ternId: currTern ? currTern.value : "",
              classAdviser: currData.manClass.classAdviserId,
              roomId: currData.manClass.roomName,
              result: currData.manClass.result,
              type: currData.manClass.type.toString(),
              capacity: currData.manClass.capacity,
              goReadMax: currData.manClass.goReadMax,
              subjects: currData.subjects.map(item => item.id),
              remark: currData.manClass.remark
            };
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-form {
  max-width: 840px;
}
.table-container-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
