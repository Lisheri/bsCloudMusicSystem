<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="handleCancel">
    <el-button @click="handleCheckPayStatus">查看订单状态</el-button>
    <el-button>返回订单</el-button>
  </el-dialog>
</template>

<script>
// import { postUpdateAddress, addAddress } from "@/api/user";
import storage from "good-storage";
import bus from "@/bus";
import { getOrderMessage } from "@/api/goods";
export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      outTradeNo: null
    };
  },
  created() {
    // debugger
  },
  methods: {
    handleCancel() {
      this.dialogFormVisible = false;
    },
    async handleCheckPayStatus() {
      const message = await getOrderMessage({ outTradeNo: this.outTradeNo });
      // console.info(message)
      if (message.data.status === 2) {
        this.$notify({
          title: "成功",
          message: message.data.message,
          type: "success",
          duration: 3000,
          position: "top-right"
        });
      } else if (message.data.status === 1) {
        this.$notify({
          title: "有问题",
          message: message.data.message,
          type: "warning",
          duration: 3000,
          position: "top-right"
        });
      } else {
        this.$notify({
          title: "失败",
          message: message.data.message,
          type: "error",
          duration: 3000,
          position: "top-right"
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
  width: 60%;
}
</style>