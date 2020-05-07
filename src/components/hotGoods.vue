<template>
    <div class="el-container">
        <div class="el-main">
            <div class="container">
                <Head/>
                <hr>
                <div class="topImg">
                    <img src="http://p4.music.126.net/IpAYL-UwrQpWDMLMX6cUog==/109951164430758455.jpg" class="topPic">
                </div>
                <ul class="list clear">
                    <li class="goodCard fl" v-for="hotGood in HotGoods" :key="hotGood.id" @click="goGood(hotGood.id)">
                        <div>
                            <a href="javascript: void(0)" class="goodPic">
                                <img :src="hotGood.imgUrl" alt="">
                                <span class="priceTag" v-if="hotGood.hasPriceTag">
                                        <span class="new-price">¥{{hotGood.newPrice}}</span>
                                        <span class="old-price">¥{{hotGood.oldPrice}}</span>
                                    </span>
                            </a>
                            <div class="goodInfo">
                                <h3 class="goodDes" :title="hotGood.goodName">
                                        <span class="goodTag" v-if="hotGood.hasGoodTag">
                                            <em>{{hotGood.goodTag}}</em>
                                        </span>
                                    <a href="javascript:void(0)" class="goodName">
                                        {{hotGood.goodName}}
                                    </a>
                                </h3>
                                <p class="nowPrice">
                                    ¥
                                    <em>{{hotGood.nowPrice}}</em>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {getHotGoods} from "../api";
    import Head from '../page/goods/head';
    export default {
        name: "hotGoods",
        async created() {
            const hotGoods = await getHotGoods();
            this.HotGoods = hotGoods;
        },
        data () {
            return {
                HotGoods:[]

            }
        },
        methods: {
            goGood(id) {
                this.$router.push(`/goods/goodDec/${id}`)
            }
        },
        components: {Head}
    }
</script>

<style scoped lang="scss">
    a {
        text-decoration: none;
    }
    em, i {
        font-style: normal;
        text-align: left;
        font-size: inherit;
    }
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }
    .fl {
        float: left;
    }
    .topPic {
        width: 800px;
    }
    .el-container {
        .el-main {
            width: 100%;
            .container {
                margin: 0 auto;
                width: 800px;
                height: auto;
            }
        }

        .list {
            margin-top: 20px;
            height: auto;
            width: 100%;
            .goodCard {
                position: relative;
                width: 190px;
                height: 320px;
                padding-right: 10px;
                box-sizing: content-box;
                .goodPic {
                    width: 190px;
                    height: 190px;
                    background-color: #f9f9f9;
                    cursor: pointer;
                    display: block;
                    img {
                        width: 190px;
                        height: 190px;
                        display: block;
                        background-color: #f9f9f9;
                    }
                    .priceTag, .new-price, .old-price {
                        position: absolute;
                    }
                    .priceTag {
                        width: 40px;
                        height: 40px;
                        top: 10px;
                        left: 10px;
                        background-color: #d33a31;
                        border-radius: 50%;
                        color: #fff;
                        .new-price {
                            top: 5px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            font-size: 12px;
                        }
                        .old-price {
                            top: 21px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            font-size: 10px;
                            opacity: 0.7;
                            text-decoration: line-through;
                        }
                    }
                }
                .goodInfo {
                    margin-top: 10px;
                    text-align: center;
                    .goodDes {
                        font-size: 12px;
                        line-height: 18px;
                        height: 18px;
                        white-space: nowrap;
                        font-weight: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #333;
                        .goodTag {
                            overflow: hidden;
                            box-sizing: border-box;
                            line-height: 19px;
                            padding: 0 3px;
                            border-radius: 1px;
                            color: #d74d45;
                            font-size: 9px;
                            border: 1px solid #d74d45;
                        }
                        .goodName {
                            text-decoration: none;
                            color: #333;
                        }
                        .goodName:hover {
                            text-decoration: underline;
                            color: #333;
                        }
                    }
                    .nowPrice {
                        font-size: 13px;
                        color: #d33a31;
                        padding-top: 4px;
                    }
                }
            }
        }
    }

</style>