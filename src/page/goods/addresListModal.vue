<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="handleCancel">
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column label="收货人" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货地址" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="334">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { postUpdateAddress, addAddress } from "@/api/user";
import storage from "good-storage";
import bus from "@/bus";
export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      formLabelWidth: "120px",
      form: {},
      isAdd: true,
      tableData: []
    };
  },
  created() {
    // debugger
  },
  methods: {
    handleCancel() {
      this.dialogFormVisible = false;
    },
    handleChoose(index, row) {
      console.info(index, row);
      bus.$emit("chose", row);
      this.$notify({
        title: "成功",
        message: "更换地址成功",
        type: "success",
        duration: 3000,
        position: "top-right"
      });
      this.dialogFormVisible = false;
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