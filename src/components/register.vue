<template>
  <div class="container">
      <h1></h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
        <el-button @click="goBackToDiscovery()">返回主页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
 import {postRegister,  getUserAll} from '@/api/user';
 import bus from '@/bus'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[a-zA-Z0-9._+=!,?]{6,12}$/.test(value)) {
        callback(
          new Error(
            "请输入6-12位且特殊字符仅包含('.', '_', '+', '=', '!', '?', ',')的正确密码"
          )
        );
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入用户名"));
      } else if (value.length >12 || value.length < 6) {
        callback(new Error("请输入6~12位用户名"));
      } else {
        getUserAll(value).then(res => {
          if (res.length === 0) {
            callback();
          } else {
            callback(new Error("用户名已经存在!请重新输入"));
          }
        })
        
      }
    }
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        email: ""
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "用户名的长度在8到16个字符",
            trigger: "blur"
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postRegister(this.ruleForm).then(res => {
            if (res.data === "success") {
                bus.$emit('registerSuccess', true);
                this.$router.push("/discovery");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBackToDiscovery() {
      this.$router.push("/discovery");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 40px;
  /deep/ .demo-ruleForm {
    margin: 0 auto;
    width: 60%;
  }
}
</style>