<template>
    <div class="el-container">
        <div class="el-main">
            <div class="container">
                <Head/>
                <div class="section1">
                    <a href="javascript:void(0)" class="homePage" @click="() => {this.$router.push('/goods')}">首页</a>
                    <span class="goodTitle">
                        <i></i>
                        IP周边
                    </span>
                </div>
                <div class="section2">
                    <el-collapse v-model="activeNames" @change="handleChange" class="screenBox">
                        <el-collapse-item title="显示筛选" name="1" class="screenTitle">
                            <div class="screen">
                                <div class="brand">
                                    <span class="head">品牌: </span>
                                    <ul class="clear">
                                        <li class="fl brandlist slist" v-for="(item, index) in brands" :class="{screenActive: brandsIndex === index}" :key="item.id" @click="handleBrandChange(item, index)">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="classify">
                                    <span class="head">分类: </span>
                                    <ul class="clear">
                                        <li class="fl classifylist slist" v-for="(item, index) in classify" :class="{screenActive: classifyIndex === index}" :key="item.id" @click="handleClassifyChange(item, index)">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="price">
                                    <span class="head">价格: </span>
                                    <ul class="clear">
                                        <li class="fl pricelist slist" v-for="(item, index) in price" :class="{screenActive: PriceIndex === index}" :key="item.id" @click="handlePriceChange(item, index)">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="section3">
                    <ul class="list clear">
                        <li class="goodCard fl" v-for="(hotGood, index) in IpGoods" :key="hotGood.id" @click="goGood(hotGood.id)" v-show="isShow[index]">
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
    </div>
</template>

<script>
    import Head from '../page/goods/head';
    import {getIpGoods} from "../api";
    export default {
        name: "ipPeriphery",
        async created() {
            const ipGoods = await getIpGoods();
            this.IpGoods = ipGoods;
            for (let i = 0; i < this.IpGoods.length; i++) {
                this.isShow.push(true);
            }
        },
        data () {
            return {
                activeNames: ['1'],
                brands: ['Xingyunshi', '牛奶咖啡官方周边', '网易', '经典五大唱片', 'magicbus', 'MAGICBUS', 'CD专属', '云音乐', '代鑫', '幸运石', 'BBOM', 'Fools Garden', '我们的少年时代', '多多西西', '洛斐/Lofree', '艾漫'],
                classify: ['音乐人周边', '图书音像', '大热IP周边', '云村吉祥物'],
                price: ['0~2999', '3000~5999', '5999~8999'],
                IpGoods: [],
                nowBrand: 'all',
                nowPrice: 'all',
                lowPrice: '',
                highPrice: '',
                nowClassify: 'all',
                brandsIndex: null,
                classifyIndex: null,
                PriceIndex: null,
                isShow: [],
            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            goGood(id) {
                this.$router.push(`/goods/goodDec/${id}`)
            },
            handleBrandChange(brand, index) {
                if (this.brandsIndex === index) {
                    this.brandsIndex = null;
                    this.nowBrand = 'all';
                    for (let i = 0; i < this.isShow.length; i++) {
                        this.isShow[i] = true;
                    }
                } else {
                    this.brandsIndex = index;
                    this.nowBrand = brand;
                    for (let i = 0; i < this.IpGoods.length; i++) {
                        if (this.IpGoods[i].brand !== brand) {
                            this.isShow[i] = false;
                        } else {
                            this.isShow[i] = true;
                        }
                    }
                }
            },
            handlePriceChange(price, index) {
                if (this.PriceIndex === index) {
                    this.PriceIndex = null;
                    this.nowPrice = 'all';
                    for (let i = 0; i < this.isShow.length; i++) {
                        this.isShow[i] = true;
                    }
                } else {
                    this.PriceIndex = index;
                    this.nowPrice = price;
                    this.lowPrice = price.split('~')[0];
                    this.highPrice = price.split('~')[1];
                    for (let i = 0; i < this.IpGoods.length; i++) {
                        if (this.IpGoods[i].nowPrice > this.lowPrice && this.IpGoods[i].nowPrice < this.highPrice) {
                            this.isShow[i] = true;
                        } else {
                            this.isShow[i] = false;
                        }
                    }
                }
            },
            handleClassifyChange(classify, index) {
                if (this.classifyIndex === index) {
                    this.classifyIndex = null;
                    this.nowClassify = 'all';
                    for (let i = 0; i < this.isShow.length; i++) {
                        this.isShow[i] = true;
                    }
                } else {
                    this.classifyIndex = index;
                    this.nowClassify = classify;
                    for (let i = 0; i < this.IpGoods.length; i++) {
                        if (this.IpGoods[i].classify !== classify) {
                            this.isShow[i] = false;
                        } else {
                            this.isShow[i] = true;
                        }
                    }
                }
            }
        },
        components: {Head},
        computed: {
            screenGoods(brand) {
                // if (this.nowBrand === 'all' && this.nowPrice === 'all' && this.nowClassify === 'all') {
                //     return true;
                // }
                // else if ((this.nowBrand === brand || this.nowBrand === 'all') && (this.nowClassify === 'all' || this.nowClassify === classify) && (this.nowPrice === 'all' || (this.lowPrice < price && this.highPrice >= price))) {
                //     return true;
                // } else {
                //     return false;
                // }

            }
        }
    }
</script>

<style scoped lang="scss">
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
        .el-main {
            width: 100%;
            min-height: 650px;
            .container {
                margin: 0 auto;
                width: 800px;
                height: auto;
                .section1 {
                    width: 100%;
                    height: 80px;
                    padding: 40px 0 20px 0;
                    border-bottom: 1px solid black;
                    box-sizing: border-box;
                    .homePage {
                        color: #333;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .goodTitle {
                        font-size: 14px;
                        color: #999;
                        font-weight: 600;
                        i {
                            position: relative;
                            top: 7px;
                            display: inline-block;
                            width: 16px;
                            height: 26px;
                            margin: 0 4px 0 8px;
                            background: url(https://s2.music.126.net/store/web/img/ar.png?8e0f97ef027b13f7661fc5d89aaeb070) no-repeat left center;
                        }
                    }
                }
                .section2 {
                    margin-top: 20px;
                    width: 100%;
                    .screenBox {
                        border: none;
                    }
                    /deep/ .screenTitle > div:first-child {
                            width: 100px;
                            height: 30px;
                            position: relative;
                            left: 700px;
                            color: #333;
                            border: solid 1px #e8e8e8;
                            padding: 0 12px;
                            background: #f6f6f6;
                        > div:first-child {
                            background: #f6f6f6;
                            font-weight: bolder;
                            height: 30px;
                        }
                    }
                    /deep/ .el-collapse-item__wrap {
                        border: 1px solid #e8e8e8;
                        margin-top: 10px;
                        .el-collapse-item__content {
                            padding-bottom: 0;
                            .screen {
                                > div {
                                    position: relative;
                                    /*height: 50px;*/
                                    padding: 0 100px;
                                    margin: 0 8px 20px 8px;
                                    border-bottom: 1px dashed #ccc;
                                }
                                div:first-child {
                                    margin-top: 5px;
                                }
                                .slist {
                                    margin-left: 30px;
                                    max-width: 140px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    color: #000;
                                    cursor: pointer;
                                    font-size: 10px;
                                    margin-bottom: 10px;
                                    user-select: none;
                                }
                                .slist:hover {
                                    color: #f40;
                                }
                                .screenActive {
                                    color: #f40;
                                }
                                .head {
                                    position: absolute;
                                    left: 11px;
                                    /*top: 9px;*/
                                    color: #999;
                                    font-size: 8px;
                                }
                            }
                        }
                    }
                    /deep/ .screenTitle > div:first-child > div:first-child:hover {
                        color:  #f40;;
                    }

                }
            }
            .section3 {
                margin-top: 20px;
                width: 100%;
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
    }
</style>