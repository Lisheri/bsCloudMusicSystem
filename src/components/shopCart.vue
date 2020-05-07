<template>
    <div class="el-container">
        <div class="el-main">
            <div class="container">
                <Head class="head"/>
                <div class="section1">
                    <h1 class="shopCartTitle">购物车</h1>
                    <hr>
                </div>
                <div class="section2">
                    <div class="clear">
                        <el-checkbox class="fl allElection" v-model="checked">全选</el-checkbox>
                        <div class="fl"><div class="productInfo listitem">商品信息</div></div>
                        <div class="fl"><div class="kong listitem"></div></div>
                        <div class="fl"><div class="unitPrice listitem">单价</div></div>
                        <div class="fl"><div class="number listitem">数量</div></div>
                        <div class="fl"><div class="amountOfMoney listitem">金额</div></div>
                        <div class="fl"><div class="operation listitem">操作</div></div>
                    </div>
                </div>
                <div class="section3">
                    <div class="cartBox">
                        <div class="boxTab"><span class="allGoods">全部商品(<i>0</i>)</span></div>
                        <ul class="cartBoxUl">
                            <li class="cartBoxLi clear" v-for="(item, index) in cartList" :key="index">
                                <el-checkbox class="fl checkGood" v-model="checkedArr[index]"></el-checkbox>
                                <div class="fl goodPic">
                                    <img class="picture" :src="item.imgUrl">
                                </div>
                                <div class="fl goodInfo">
                                    <p class="goodName" :title="item.name">{{item.name}}</p>
                                    <p class="goodType">{{item.type}}</p>
                                </div>
                                <div class="fl goodPrice"><i>¥</i><span>{{item.singlePrice}}</span></div>
                                <div class="fl num">
                                    <el-input-number v-model="item.goodsNum" @change="handleChange(item.goodsNum, item.id, checkedArr[index])" :min="1" :max="item.stock" label="描述文字" class="numInput"></el-input-number>
                                </div>
                                <div class="fl allPrice" :title="item.singlePrice * item.goodsNum">¥{{item.singlePrice * item.goodsNum}}</div>
                                <div class="fl operation" @click="handleDelete(item.id)"><span style="cursor: pointer">删除</span></div>
                            </li>
                        </ul>
                        <div class="boxBottom">
                            <el-checkbox v-model="checked">全选</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Head from '../page/goods/head';
    import { mapGetters } from "@/store/helper/goods";
    import {getShopCartAll, postGoodNum, postDeleteGoodAtCart} from "@/api/goods";
    import bus from '../bus';
    export default {
        name: "shopCart",
        async mounted() {
            this.cartList = await getShopCartAll();
            console.info(this.cartList);
            this.renderCheckArr(this.cartList);
        },
        data() {
            return {
                checked: false,
                goodsNum: 1,
                cartList:[],
                checkedArr: [],
            }
        },
        methods: {
            ...mapGetters(['getGoodData']),
            handleChange(value, id, checked) {
                // console.log(value+ "..." + id);
                const params = {
                    num: value,
                    id: id,
                    checked: checked
                };
                postGoodNum(params).then(res => {
                    console.info(res);
                });
                bus.$emit('goodNum', value);
            },
            handleDelete(id) {
                // console.info(id);
                postDeleteGoodAtCart({id: id}).then(res => {
                    if (res.data === "ok") {
                        this.$nextTick(() => {
                            this.cartList = [];
                            getShopCartAll().then(res => {
                                res.forEach(item => {
                                    this.cartList.push(item);
                                })
                            })
                        })
                    }
                })
                bus.$emit('goodNum', {});
            }
        },
        components: {Head},
        computed: {
            renderCheckArr(checkArr) {
                console.info(checkArr);
                this.checkedArr = [];
                for (let i = 0; i < this.cartList.length; i++) {
                    this.checkedArr.push(checkArr.cartList[i].checked);
                }
            },

        },

    }
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
    }
    div {
        box-sizing: content-box;
    }
    i, em {
        font-style: normal;
    }
    .clear:after {
        content: '';
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
                    margin-top: 5px;
                    width: 100%;
                    /deep/ .allElection {
                        width: 60px;
                        min-height: 24px;
                        margin-right: 20px;
                    }
                    .listitem {
                        width: 120px;
                        min-height: 24px;
                        text-align: left;
                        /*padding-left: 5px;*/
                    }
                    .operation {
                        width: 60px;
                        margin-left: 55px;
                    }
                }
                .section3 {
                    margin-top: 10px;
                    width: 100%;
                    .cartBox {
                        width: 100%;
                        min-height: 150px;
                        border: 1px solid #eee;
                        .boxTab {
                            height: 40px;
                            background-color: rgba(244, 244, 244, 1);
                            position: relative;
                            margin-top: -1px;
                            .allGoods {
                                position: absolute;
                                top: 20px;
                                transform: translateY(-50%);
                                left: 40px;
                                color: #bbb;
                            }
                        }
                        .boxBottom {
                            height: 40px;
                            width: 100%;
                            border-top: 1px solid #eee;
                            position: relative;
                            /deep/ .el-checkbox {
                                position: absolute;
                                left: 1px;
                                top: 10px;
                            }
                        }
                        .cartBoxUl {
                            .cartBoxLi {
                                height: 118px;
                                padding: 19px 0 19px 80px;
                                position: relative;
                                div {
                                    user-select: none;
                                }
                                .checkGood {
                                    position: absolute;
                                    top: 59px;
                                    transform: translateY(-50%);
                                    left: 20px;
                                }
                                .goodPic {
                                    width: 80px;
                                    height: 80px;
                                    background: rgb(245, 245, 245);
                                    cursor: pointer;
                                    .picture {
                                        width: 80px;
                                        height: 80px;
                                    }
                                }
                                .goodInfo {
                                    height: 80px;
                                    // padding: 20px 0 20px 0;
                                    margin-left: 10px;
                                    .goodName {
                                        font-size: 10px;
                                        width: 120px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        margin-bottom: 10px;
                                        cursor: pointer;
                                    }
                                    .goodType {
                                        font-size: 10px;
                                        color: #ccc;
                                    }
                                }
                                .goodPrice {
                                    height: 40px;
                                    vertical-align: middle;
                                    padding-top: 35px;
                                    margin-left: 30px;
                                    color: #000;
                                    font-weight: 600;
                                    width: 35px;
                                }
                                .num {
                                    padding-top: 25px;
                                    /deep/ .numInput {
                                        height: 30px;
                                        width: 120px;
                                        margin-left: 50px;
                                        /*padding-top: 35px;*/
                                        span {
                                            width: 30px;
                                            height: 30px;
                                            border-radius: 0;
                                            border: 1px solid #e5e5e5;
                                        }
                                        .el-input {
                                            width: 60px;
                                            margin: 0 auto;
                                            .el-input__inner {
                                                height: 30px !important;
                                                background-color: #fff !important;
                                                border: 1px solid !important;
                                                padding: 0 !important;
                                                border-radius: 0;
                                                border-left-color: transparent !important;
                                                border-right-color: transparent !important;
                                                border-top-color: #e5e5e5 !important;
                                                border-bottom-color: #e5e5e5 !important;
                                            }
                                        }
                                    }
                                }
                                .allPrice {
                                    color: #f40;
                                    font-weight: 600;
                                    height: 40px;
                                    vertical-align: middle;
                                    padding-top: 35px;
                                    margin-left: 45px;
                                    width: 50px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .operation {
                                    height: 40px;
                                    vertical-align: middle;
                                    padding-top: 35px;
                                    margin-left: 150px;
                                }
                                .operation:hover {
                                    color: #f40;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>