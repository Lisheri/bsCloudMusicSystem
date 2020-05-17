<template>
  <div class="el-container">
    <div class="el-main">
      <div class="container">
        <Head />
        <div class="section1">
          <h1 class="shopCartTitle">我的订单</h1>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../page/goods/head";
export default {
  data() {
    return {};
  },
  components: { Head }
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
      }
    }
  }
}
</style>