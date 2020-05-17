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
          <el-button @click="handleEdit(addressArr[0])">修改</el-button>
          <el-row gutter="24" type="flex">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <div class="people">
                  <span>
                    <i>收货人：</i>{{addressArr[0].name}}
                  </span>
                  <span style="margin-left:20px">
                    <i>联系方式：</i>{{addressArr[0].phone}}
                  </span>
                </div>
                <div class="address">
                  <span>
                    <i>收货地址：</i>{{addressArr[0].address}}
                  </span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-button type="text">更换收货地址</el-button>
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
                <el-button type="danger">提交订单</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <AddressModal ref="modalForm" :record="currentRecord" />
  </div>
</template>

<script>
import Head from "@/page/goods/head";
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
      addressArr: null,
      uId: storage.get(UID_KEY),
    };
  },
  async created() {
    // console.info(JSON.parse(this.$route.query.obj));
    // this.addressArr = await getAddress()
    getAddress(this.uId).then(res => {
        this.addressArr = res
    })
    const {
      allPrice,
      goodsNum,
      id,
      imgUrl,
      name,
      singlePrice,
      type
    } = JSON.parse(this.$route.query.obj);
    if (JSON.parse(this.$route.query.obj)) {
      this.tableData.splice(0);
      this.tableData.push({
        goodsInfo: { img: imgUrl, type: type, name: name },
        singlePrice,
        goodsNum,
        allPrice
      });
      this.tableData.forEach(item => {
        this.allGoodsPrice += item.allPrice;
      });
    }
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
    }
  },
  components: { Head, AddressModal }
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