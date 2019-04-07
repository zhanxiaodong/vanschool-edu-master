<template>
  <el-card shadow="never">
    <el-row class="simple-search-bar">
      <el-col :span="12">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="dialogVisible=true"
        >添加人员</el-button>
      </el-col>
    </el-row>
    <div id="personnelTree"></div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="6em">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="姓 名：">
              <el-input v-model="dialogForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：">
              <el-input v-model="dialogForm.mobile" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性 别：">
              <el-select v-model="dialogForm.gender">
                <el-option
                  label="男"
                  value="1"
                />
                <el-option
                  label="女"
                  value="2"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮 箱：">
              <el-input v-model="dialogForm.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="校 区：">
              <el-select v-model="dialogForm.campus">
                <el-option
                  label="硅谷校区"
                  :value="1"
                />
                <el-option
                  label="富阳校区"
                  :value="2"
                />
                <el-option
                  label="K12校区"
                  :value="3"
                />
                <el-option
                  label="广州校区"
                  :value="4"
                />
                <el-option
                  label="福州校区"
                  :value="5"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分 组：">
              <el-select v-model="dialogForm.group">
                <el-option
                  label="分组1"
                  :value="1"
                />
                <el-option
                  label="分组2"
                  :value="2"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教授科目：">
              <el-select v-model="dialogForm.campus">
                <el-option
                  v-for="item in subjects"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直属上级：">
              <el-select v-model="dialogForm.superior" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级姓名：">
              <el-select v-model="dialogForm.superiorName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状 态：">
              <el-select v-model="dialogForm.status" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="头像"
          class="full-width"
        >
          <!-- <el-upload
          :show-file-list="false"
          :on-success="onUploadSuccess"
          action="https://jsonplaceholder.typicode.com/posts/"
          class="avatar-uploader"
        >
          <img
            v-if="dialogForm.avatarUrl"
            :src="dialogForm.avatarUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload> -->
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
  </el-card>
</template>

<script>
export default {
  name: "BasicsPersonnel",
  data() {
    return {
      dialogVisible: false,
      dialogForm: {},
      subjects: []
    };
  },
  mounted() {
    new window.Treant(
      {
        chart: {
          container: "#personnelTree",
          connectors: {
            type: "step"
          },
          levelSeparation: 40
        },
        nodeStructure: {
          innerHTML:
            "<div class='node-inner'><div class='node-inner-text'>校长（张三）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>",
          children: [
            {
              innerHTML:
                "<div class='node-inner'><div class='node-inner-text'>教学主管（李四）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>",
              children: [
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                },
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                },
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                }
              ]
            },
            {
              innerHTML:
                "<div class='node-inner'><div class='node-inner-text'>政教（小吴）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>",
              children: [
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                },
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                },
                {
                  innerHTML:
                    "<div class='node-inner'><div class='node-inner-text'>教师（小王）</div><div class='node-inner-opts'><a href='#' class='node-edit-btn'>编辑</a><a href='#' class='node-del-btn'>删除</a></div></div>"
                }
              ]
            }
          ]
        }
      },
      () => {
        const nodeBtns = document.querySelectorAll(".node-inner-opts a");
        nodeBtns.forEach(item => {
          item.addEventListener("click", e => {
            e.preventDefault();
            if (item.innerText === "编辑") {
              window.console.log("编辑操作！");
              this.dialogVisible = true;
            } else {
              this.$confirm("此操作不可恢复, 您是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  window.console.log("删除操作！");
                })
                .catch(() => {});
            }
          });
        });
      }
    );
  },
  methods: {}
};
</script>
<style lang="scss">
.node-inner {
  position: relative;
  padding: 0.6em 0.4em 1.8em 0.4em;
  width: 130px;
  text-align: center;
  border: 1px solid #999999;
  box-sizing: border-box;
  &:hover {
    & .node-inner-opts {
      opacity: 1;
    }
  }
}
.node-inner-opts {
  position: absolute;
  bottom: 0.3em;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  opacity: 0;
  transition: all 0.3s;
  & a {
    margin: 0 0.6em;
    font-size: 90%;
  }
}
</style>
