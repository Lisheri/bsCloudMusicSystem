<template>
  <div class="el-container">
    <div class="el-main">
      <div class="container">
        <Head />
        <div class="section1">
          <h1 class="shopCartTitle">订单确认</h1>
          <hr />
        </div>
        <div class="section2">
          <p class="buyInfo">收货信息</p>
          <el-button @click="handleEdit(address)">修改</el-button>
          <el-row gutter="24" type="flex">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <div class="people">
                  <span>
                    <i>收货人：</i>
                    {{address.name}}
                  </span>
                  <span style="margin-left:20px">
                    <i>联系方式：</i>
                    {{address.phone}}
                  </span>
                </div>
                <div class="address">
                  <span>
                    <i>收货地址：</i>
                    {{address.address}}
                  </span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-button type="text" @click="changeAddress">更换收货地址</el-button>
                <el-button @click="handleAddAddress">新建地址</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <template>
          <el-table :data="tableData" style="width: 100%" class="goods-info-buy">
            <el-table-column label="商品信息" width="500">
              <template slot-scope="scope">
                <!-- <span style>{{ scope.row.date }}</span> -->
                <el-row>
                  <el-col :span="5">
                    <img
                      :src="scope.row.goodsInfo.img"
                      :alt="scope.row.goodsInfo.name"
                      width="80"
                      height="80"
                      class="goodImg"
                    />
                  </el-col>
                  <el-col :span="19">
                    <p
                      :title="scope.row.goodsInfo.name"
                      class="goods-name"
                    >{{scope.row.goodsInfo.name}}</p>
                    <p>{{scope.row.goodsInfo.type}}</p>
                  </el-col>
                </el-row>
                <img src alt />
              </template>
            </el-table-column>
            <el-table-column label="金额" width="180">
              <template slot-scope="scope">
                <span style>{{ scope.row.singlePrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="180">
              <template slot-scope="scope">
                <span style>{{ scope.row.goodsNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="小计">
              <template slot-scope="scope">
                <span style>{{ scope.row.allPrice }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>-->
          </el-table>
          <el-row class="summary">
            <el-col :span="18">
              <p>&nbsp;</p>
            </el-col>
            <el-col :span="6">
              <p class="all-goods-price">
                <i>商品合计:&nbsp;&nbsp;</i>
                <span>￥{{allGoodsPrice}}</span>
              </p>
              <p class="transport-price">
                <i>运费:&nbsp;&nbsp;</i>
                <span>￥10</span>
              </p>
              <p>
                <i>实付金额:&nbsp;&nbsp;</i>
                <span>￥{{allGoodsPrice+10}}</span>
              </p>
              <div class="commit-order">
                <el-button type="danger" @click="handleCommitOrder">提交订单</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <AddressModal ref="modalForm" :record="currentRecord" />
    <AddressListModal ref="modalFormList" />
    <payOrderModal ref="modalFormPay" />
  </div>
</template>

<script>
import Head from "@/page/goods/head";
import { getAddress, removeAddress } from "@/api/user";
import { postCommitOrder, getAllOrder } from "@/api/goods";
import storage from "good-storage";
import { UID_KEY, isDef } from "@/utils";
import AddressModal from "@/page/goods/addressModal";
import AddressListModal from "@/page/goods/addresListModal";
import PayOrderModal from "@/page/goods/payOrder";
import bus from "@/bus";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      allGoodsPrice: null,
      address: null,
      uId: storage.get(UID_KEY),
      addressArr: null,
      outTradeNo: null
    };
  },
  async created() {
    // console.info(JSON.parse(this.$route.query.obj));
    // this.addressArr = await getAddress()
    getAddress(this.uId).then(res => {
      this.address = res[0];
      this.addressArr = res;
    });
    // debugger
    if (this.$route.query.obj) {
      const {
        allPrice,
        goodsNum,
        id,
        imgUrl,
        name,
        singlePrice,
        type
      } = JSON.parse(this.$route.query.obj);
      this.tableData.splice(0);
      this.tableData.push({
        goodsInfo: { img: imgUrl, type: type, name: name },
        singlePrice,
        goodsNum,
        allPrice,
        orderArr: []
      });
      this.tableData.forEach(item => {
        this.allGoodsPrice += item.allPrice;
      });
    } else {
      this.tableData.splice(0);
      // console.info(JSON.parse(this.$route.query.arr));
      // this.tableData = JSON.parse(this.$route.query.arr);
      JSON.parse(this.$route.query.arr).forEach(item => {
        this.tableData.push(item);
        this.allGoodsPrice += item.allPrice;
      });
    }
  },
  mounted() {
    bus.$on("updateSuccess", async () => {
      getAddress(this.uId).then(res => {
        this.address = res[0];
        this.addressArr = res;
      });
    });
    bus.$on("chose", res => {
      console.info(res);
      this.address = res;
    });
  },
  methods: {
    handleAddAddress() {
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.dialogFormVisible = true;
      this.$refs.modalForm.add();
    },
    handleEdit(row) {
      //   console.log(index, row);
      this.$refs.modalForm.currentRecord = row;
      this.$refs.modalForm.edit(row);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.dialogFormVisible = true;
    },
    changeAddress() {
      this.$refs.modalFormList.title = "切换地址";
      this.$refs.modalFormList.dialogFormVisible = true;
      this.$refs.modalFormList.tableData = this.addressArr;
    },
    async handleCommitOrder() {
      // 订单号，标题，描述
      // req.body.outTradeNo, req.body.subject, req.body.body
      let params = {};
      this.tableData.forEach(item => {
        // params.outTradeNo = Math.random().toFixed(8) * Math.pow(10, 8) + "_" + Math.random().toFixed(5) * Math.pow(10, 5) + "_" + Math.random().toFixed(2) * Math.pow(10, 2)
        this.outTradeNo = Math.random().toFixed(8) * Math.pow(10, 8);
        params.outTradeNo = this.outTradeNo;
        params.subject = item.goodsInfo.name;
        params.body = item.goodsInfo.type;
      });
      const url = await postCommitOrder(params);
      this.$refs.modalFormPay.dialogFormVisible = true;
      this.$refs.modalFormPay.title = "下单支付页面";
      this.$refs.modalFormPay.outTradeNo = this.outTradeNo;
      window.open(url.data)
    }
  },
  components: { Head, AddressModal, AddressListModal, PayOrderModal },
  watch: {
    outTradeNo: {
      async handler(newVal, oldVal) {
        this.orderArr = await getAllOrder();
        this.orderArr.forEach(item => {
          if (item.outTradeNo === newVal) {
            debugger
            newVal++;
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
      .section2 {
        border: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 12px;
        .buyInfo {
          width: 100%;
          height: 40px;
          line-height: 28px;
          background: url(https://s2.music.126.net/store/web/img/bgg.png?0c23ca248106cb83d2535d63c5d75d1c)
            repeat-x;
          background-color: white;
          color: #999;
          padding-left: 20px;
          font-size: 12px;
        }
        .el-row.el-row--flex {
          padding: 10px;
          .grid-content {
            border-right: 1px solid rgba(0, 0, 0, 0.05);
            span > i {
              color: #999;
              text-align: left;
            }
          }
        }
      }
      /deep/ .el-table {
        margin-top: 40px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 12px;
        /deep/ .el-table__header-wrapper thead > tr {
          //   height: 40px;
          > th {
            box-sizing: content-box;
            height: 30px;
            //   line-height: 0px;
            background: url(https://s2.music.126.net/store/web/img/bgg.png?0c23ca248106cb83d2535d63c5d75d1c)
              repeat-x;
            background-color: white;
            color: #999;
            padding: 0 !important;
          }
        }
      }
      /deep/ .el-table th,
      .el-table td {
        padding: 0 !important;
        height: 30px;
      }
      .goods-info-buy {
        .goodImg {
          background-color: #f9f9f9;
        }
        .goods-name {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-col-19 {
          margin-top: 15px;
        }
      }
      .summary {
        .el-col-6 p {
          color: #333;
          > i {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            text-align: right;
            color: #333;
            display: inline-block;
            width: 100px;
          }
          > span {
            width: 100px;
            text-align: right;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            text-align: right;
            display: inline-block;
          }
        }
        .commit-order {
          display: flex;
          .el-button {
            margin-left: auto;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>