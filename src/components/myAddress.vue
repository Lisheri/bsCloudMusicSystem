<template>
  <div class="el-container">
    <div class="el-main">
      <div class="container">
        <Head />
        <div class="section1">
          <h1 class="shopCartTitle">我的收货地址</h1>
          <hr />
          <div class="myAddress">
            <h2>我的收货地址</h2>
            <p>
              (共
              <i>{{tableData.length}}</i>条, 最多保存10条)
            </p>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="btnAdd"
              @click="handleAddAddress"
            >新增</el-button>
          </div>
          <template>
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
                  <!-- <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>收货地址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.phone }}</el-tag>
                    </div>
                  </el-popover>-->
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <AddressModal ref="modalForm" :record="currentRecord" />
  </div>
</template>

<script>
import Head from "../page/goods/head";
import { getAddress, removeAddress } from "@/api/user";
import storage from "good-storage";
import { UID_KEY, isDef } from "@/utils";
import AddressModal from "@/page/goods/addressModal";
import bus from "@/bus";
export default {
  data() {
    return {
      tableData: [
        {
          phone: "18181612986",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      uId: storage.get(UID_KEY),
      currentRecord: null
    };
  },
  async created() {
    this.tableData = await getAddress(this.uId);
    // console.info(this.tableData)
  },
  mounted() {
    bus.$on("updateSuccess", async () => {
      this.tableData = await getAddress(this.uId);
    });
  },
  methods: {
    handleAddAddress() {
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.dialogFormVisible = true;
      this.$refs.modalForm.add();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.modalForm.currentRecord = row;
      this.$refs.modalForm.edit(row);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      removeAddress({_id: row._id}).then(res => {
        if (res.data === "ok") {
          this.$notify({
              title: "成功",
              message: "删除地址成功",
              type: "success",
              duration: 3000,
              position: "top-right"
            });
            bus.$emit("updateSuccess")
        } else {
          this.$notify({
              title: "失败",
              message: "删除地址失败",
              type: "error",
              duration: 3000,
              position: "top-right"
            })
        }
      })
      // this.$refs.modalForm
      // this.$refs.modalForm.add()
    }
  },
  components: { Head, AddressModal },
  watch: {}
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
div {
  box-sizing: content-box;
}
i,
em {
  font-style: normal;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.el-container {
  div {
    box-sizing: content-box;
  }
  .el-main {
    width: 100%;
    min-height: 650px;
    .container {
      margin: 0 auto;
      width: 800px;
      height: auto;
      /deep/ .el-checkbox__input {
        .el-checkbox__inner {
          border-radius: 0;
          border-color: #ccc;
        }
        .el-checkbox__inner:hover {
          border-color: #ccc;
        }
      }
      /deep/ .el-checkbox__label {
        color: #333;
      }
      .head {
        border-bottom: 1px solid #eee;
      }
      .section1 {
        margin-top: 20px;
        width: 100%;
        .shopCartTitle {
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }
        .myAddress {
          display: flex;
          margin-bottom: 24px;
          .btnAdd {
            margin-left: auto;
          }
        }
      }
    }
  }
}
/deep/ .el-table__header-wrapper .el-table__header .has-gutter,
/deep/ .el-table__body-wrapper .el-table__body tbody {
  > tr {
    border-bottom: solid 1px #d9d9d9 !important;
    background-color: rgba(0, 0, 0, 0.02) !important;
    > th,
    > td {
      box-sizing: content-box;
      height: 30px;
      line-height: 30px;
      border: solid 1px #d9d9d9;
      background-color: rgba(0, 0, 0, 0.02);
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: solid 1px #d9d9d9 !important;
    }
    td {
      border-top: none;
    }
    > th:not(:nth-child(4)),
    > td:not(:nth-child(4)) {
      border-right: none !important;
    }
    > th:not(:first-child),
    > td:not(:first-child) {
      border-left: none !important;
    }
  }
}
/deep/ .el-table td,
.el-table th,
.el-table tr,
.el-table td,
.el-table th,
.el-table tr {
  border-bottom: 1px solid #d9d9d9 !important;
  // background-color: rgba(0, 0, 0, 0.02) !important;
}
</style>