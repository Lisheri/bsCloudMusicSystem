<template>
  <div class="user">
    <!-- 登录前 -->
    <div @click="visible=true" class="login-trigger" v-if="!isLogin">
      <i class="user-icon iconfont icon-yonghu" />
      <p class="user-name">未登录</p>
    </div>
    <!-- 登录后 -->
    <div @click="onLogout" class="logined-user" v-else>
      <img v-lazy="$utils.genImgUrl(user.pic, 80)" class="avatar" />
      <p class="user-name">{{ user.username }}</p>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :modal="true"
      :visible.sync="visible"
      :width="$utils.toRem(320)"
      @close="onCloseModal"
    >
      <p slot="title">登录</p>
      <!-- <el-form
        label-width="80px"
        :model="formLabelAlign"
        ref="formLabelAlign"
      >
        <el-form-item
          label="账号"
          :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
        >
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button :loading="loading" @click="onLogin" class="login-btn" type="primary">登 录</el-button>
        <el-button :loading="loading" @click="goRegister" class="register-btn" type="primary">注 册</el-button>
      </span>-->
      <el-form
        :model="formLabelAlign"
        status-icon
        :rules="rules"
        ref="formLabelAlign"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="formLabelAlign.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLabelAlign.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="onLogin" class="login-btn" type="primary">登 录</el-button>
          <el-button :loading="loading" @click="goRegister" class="register-btn" type="primary">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from "good-storage";
import { UID_KEY, isDef } from "@/utils";
import { confirm } from "@/base/confirm";
import {
  mapActions as mapUserActions,
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user";
import bus from "@/bus";
import {postCheckLogin} from '@/api/user';

export default {
  // 自动登录
  created() {
    const username = storage.get("_username_");
    if (isDef(username)) {
      this.onLogin2(username);
    }
  },
  mounted() {
    bus.$once("registerSuccess", res => {
      this.$notify({
        title: "成功",
        message: "注册成功",
        type: "success",
        duration: 3000,
        position: "top-right"
      });
    });
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      loading: false,
      registerVisible: false,
      uid: "",
      formLabelAlign: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      }
      // top: "top"
    };
  },
  methods: {
    async onLogin() {
      this.$refs.formLabelAlign.validate(async valid => {
        postCheckLogin(this.formLabelAlign).then(async res => {
          // debugger
          if (res.data === "success") {
            if (valid) {
          this.loading = true;
          const success = await this.login(
            this.formLabelAlign.username
          ).finally(() => {
            this.loading = false;
          });
          if (success) {
            this.onCloseModal();
            this.$router.push("/discovery");
          }
        } else {
          console.log("错误提交!!");
          return false;
        }
          } else {
            this.$notify({
              title: "失败",
              message: "账号密码错误，请重新登录",
              type: "error",
              duration: 3000,
              position: "top-right"
            });
          }
        }) 
        
      });
    },
    async onLogin2(username) {
      const success = await this.login(username).finally(() => {
        this.loading = false;
      });
      if (success) {
        this.onCloseModal();
      }
    },
    onCloseModal() {
      this.visible = false;
    },
    onLogout() {
      confirm("确定要注销吗？", () => {
        this.logout();
        this.$router.push("/discovery");
      });
    },
    goRegister() {
      this.$router.push("/register");
      this.visible = false;
    },
    open1() {
      this.$notify({
        title: "成功",
        message: "注册成功",
        type: "success",
        duration: 3000,
        position: "top-right"
      });
      // Notification.success({
      //   title: "成功",
      //   message: "注册成功",
      //   type: "success",
      //   duration: 3000,
      //   position: "top-right"
      // })
    },
    ...mapUserActions(["login", "logout"])
  },
  computed: {
    ...mapUserState(["user"]),
    ...mapUserGetters(["isLogin"])
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
  }

  .logout {
    transform: translateY(1px);
    margin-left: 8px;
    color: var(--font-color-shallow-grey);
  }

  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .login-help {
      .help {
        margin-bottom: 4px;
      }
    }
  }

  .dialog-footer {
    display: flex;
    .login-btn {
      width: 45%;
      padding: 8px 0;
      margin-right: auto;
    }

    .register-btn {
      width: 45%;
      padding: 8px 0;
      margin-left: 0;
      margin-right: auto;
    }
  }

  .logined-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      @include round(40px);
    }
  }
}
/deep/ .el-dialog {
  height: 270px;
}
</style>
