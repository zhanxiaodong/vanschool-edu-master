<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="login-title">
        <i class="logo"></i>
        <span>非凡教育</span>
        <div class="sub-title">艺术生文化课高考冲刺营开创者</div>
      </h1>
      <el-alert
        v-if="errorText.length > 0"
        :title="errorText"
        type="error"
        show-icon
        class="login-error"
        @close="errorText=''"
      >
      </el-alert>
      <el-form
        :model="loginForm"
        ref="loginForm"
      >
        <el-form-item
          prop="user"
          :rules="[{ required: true, message:  '请输入用户名或手机号码', trigger: 'blur' }]"
        >
          <el-input
            v-model="loginForm.user"
            placeholder="用户名(admin)"
          >
            <font-awesome-icon
              slot="prefix"
              icon="user"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码(123456)"
          >
            <font-awesome-icon
              slot="prefix"
              icon="unlock"
            />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            @click="handleSubmit('loginForm')"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        user: "",
        password: ""
      },
      errorText: ""
    };
  },
  created() {
    // 添加回车支持
    document.addEventListener("keydown", this.handleEnter);
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { user, password } = this.loginForm;
          this.errorText = "";
          if (user === "admin" && password === "123456") {
            this.$store.commit("logIn", {
              token: "login",
              userInfo: {
                name: "admin",
                password: "123456"
              }
            });
            this.$router.replace({ path: "/" });
          } else {
            this.errorText = "用户名或密码错误！";
          }
        }
      });
    },
    handleEnter(e) {
      if (e.code === "Enter") {
        this.handleSubmit("loginForm");
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleEnter);
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  background-image: url("../../assets/login-bg.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  height: 100vh;
  .login-title {
    position: relative;
    text-align: center;
    margin: 0.5em 0 2.5em 0;
    text-align: center;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: #000;
    & > span {
      font-size: 1.5em;
    }
    .sub-title {
      position: absolute;
      font-size: 10px;
      bottom: -0.5em;
      right: 5em;
      color: #333333;
    }
  }
  .login-box {
    padding: 1em 2em 2em 2em;
    width: 360px;
    margin: -6em 0 0 0;
  }
  .submit-btn {
    width: 100%;
  }
  .logo {
    display: inline-block;
    width: 2em;
    height: 2em;
    background-color: red;
    margin: 0.1em 0.8em 0 0;
    background: url("../../assets/logo.png") no-repeat 50% 50% / 100%;
  }
  .login-error {
    margin: 0 0 1em 0;
  }
}
</style>
