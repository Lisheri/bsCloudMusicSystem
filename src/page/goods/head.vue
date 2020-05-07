<template>
    <div class="el-head">
    <div class="head">
        <div class="shopCity"></div>
        <Search class="search"/>
        <div class="topCart icon-wrap" @click="goShopCart">
            <a class="el-icon-shopping-cart-2"></a>
            <i class="goodNum">{{num < 99 ? num: "?" }}</i>
        </div>
        <div class="avatar"><el-popover
                class="popover"
                placement="bottom"
                width="100"
                boundaries-padding="0"
                trigger="click">
            <el-button class="avatarButton" slot="reference" icon="el-icon-user-solid"></el-button>
            <ul class="userInfo">
                <li class="myOrder"><i class="el-icon-document"></i>我的订单</li>
                <li class="myAddress"><i class="el-icon-position"></i>我的收货地址</li>
            </ul>
        </el-popover></div>
    </div>
    </div>
</template>

<script>
    import Search from './search';
    import bus from '../../bus';
    import {getShopCartAll} from "@/api/goods";
    export default {
        name: "head",
        components: {Search},
        methods: {
            goShopCart() {
                this.$router.push('/goods/shopCart');
            }
        },
        created() {
            getShopCartAll().then(res => {
                res.forEach(item => {
                    this.num += item.goodsNum
                })
            });
        },
        data() {
            return {
                num :  0,
            }
        },
        mounted() {
          bus.$on('goodNum', res => {
              getShopCartAll().then(res => {
                    this.num = 0;
                res.forEach(item => {
                    this.num += item.goodsNum
                })
            });
          })
        },
        watch: {
            num: () => {
                getShopCartAll().then(res => {
                    this.num = 0;
                res.forEach(item => {
                    this.num += item.goodsNum
                })
            });
            }
        }
    }
</script>

<style scoped lang="scss">
    i ,em {
        font-style: normal;
    }
    .el-popover {
        padding: 0;
        .userInfo {
            li {
                cursor: default;
                padding-left: 20px;
                height: 40px;
                padding-top: 10px;
                i {
                    margin-right: 5px;
                }
            }
            li:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }
    .el-head {
        height: 50px;
        background: #fff;
        .head {
            margin: 0 auto;
            width: 800px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .shopCity {
                width: 200px;
                height: 50px;
                background: url("../../assets/image/云商城.png") center/cover;
            }
            .search {
                margin-left: 200px;
            }
            .topCart {
                cursor: pointer;
                position: relative;
                .goodNum {
                    font-size: 8px;
                    background-color: #ff0036;
                    border-radius: 50%;
                    position: absolute;
                    top: 5px;
                    left: 30px;
                    width: 15px;
                    height: 15px;
                    text-align: center;
                    vertical-align: middle;
                    font-weight: bolder;
                    color: #fff;
                }
            }
            .icon-wrap {
                font-size: 40px;
                a {
                    color: #000;
                }
            }
            .avatar {
                .avatarButton {
                    font-size: 25px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }

</style>