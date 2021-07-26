<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        size="medium"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="accout">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.accout"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-item" label="" prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            minlength="6"
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="login-item"
          label=""
          prop="checkPass"
          v-if="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            minlength="6"
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isEmail } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    var checkAccount = (rule, value, callback) => {
      // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;Unnecessary escape character: \-  no-useless-escape
      // let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        // if (!reg.test(value)) {
        if (!isEmail(value)) {
          callback(new Error("邮箱格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("密码是6-20数字和字母的组合"));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" },
      ],
      model: "login",
      ruleForm: {
        accout: "",
        password: "",
        checkPass: "",
        code: "",
      },
      rules: {
        accout: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  components: {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach((element) => {
        element.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  margin: 0;
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.demo-ruleForm {
  margin-top: 10px;
  .el-form-item {
    margin-bottom: 7px;
    label {
      display: block;
      color: #fff;
    }
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
// .demo-ruleForm {
//   .el-form-item {
//     .el-form-item__label {
//       text-align: initial;
//       color: #fff;
//     }
//   }
// }
// .login-item .el-form-item__label {
//   color: #fff;
// }
</style>
