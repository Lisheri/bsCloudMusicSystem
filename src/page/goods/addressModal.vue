<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="handleCancel">
    <el-form :model="form" :rules="rules">
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleCommit">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { postUpdateAddress, addAddress } from "@/api/user";
import storage from "good-storage";
import bus from "@/bus";
export default {
  data() {
    let validatename = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输入联系人"));
      } else if (value.length > 12) {
        callback(new Error("请输入正确的联系人"));
      } else {
        callback();
      }
    };
    let validatephone = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输入联系方式"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的联系方式"));
      } else {
        callback();
      }
    };
    let validateaddress = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输入收货地址"))
      } else {
        callback();
      }
    }
    return {
      dialogFormVisible: false,
      title: "",
      formLabelWidth: "120px",
      form: {},
      isAdd: true,
      rules: {
        name: [{ validator: validatename, trigger: "blur" }],
        phone: [{ validator: validatephone, trigger: "blur" }],
        address: [{ validator: validateaddress, trigger: "blur" }]
      }
    };
  },
  created() {
    // debugger
  },
  methods: {
    handleCancel() {
      this.dialogFormVisible = false;
    },
    edit2(recod) {
      const { name, phone, address, _id, userId } = recod;
      this.form = Object.assign({}, { name, phone, address, _id, userId });
    },
    edit(recod) {
      this.isAdd = false;
      this.edit2(recod);
    },
    add() {
      this.isAdd = true;
      this.edit2({});
    },
    handleCommit() {
      if (this.isAdd) {
        console.info("增加");
        const params = Object.assign(this.form, {
          userId: parseInt(storage.get("__uid__"))
        });
        console.info(params);
        addAddress(params).then(res => {
          // console.info(res)
          if (res.data === "success") {
            this.$notify({
              title: "成功",
              message: "添加地址成功",
              type: "success",
              duration: 3000,
              position: "top-right"
            });
            this.dialogFormVisible = false;
            bus.$emit("updateSuccess");
          } else {
            this.$notify({
              title: "失败",
              message: "添加地址失败",
              type: "error",
              duration: 3000,
              position: "top-right"
            });
          }
        });
      } else {
        postUpdateAddress(this.form).then(res => {
          if (res.data === "updateSuccess!!") {
            this.$notify({
              title: "成功",
              message: "修改地址成功",
              type: "success",
              duration: 3000,
              position: "top-right"
            });
            this.dialogFormVisible = false;
            bus.$emit("updateSuccess");
          } else {
            this.$notify({
              title: "失败",
              message: "修改地址失败",
              type: "error",
              duration: 3000,
              position: "top-right"
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-form {
  .el-form-item {
    .el-input__inner {
      width: 300px;
    }
  }
}
/deep/ .el-dialog {
  width: 30%;
}
</style>