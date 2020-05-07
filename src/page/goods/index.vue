<template>
    <div class="el-container">
        <Head/>
        <div class="el-main">
            <div class="section1"><div class="banner widthConstraint"><Banner/></div></div>
            <div class="section2">
                <ul class="navigation widthConstraint">
                    <li class="f1 navigationBar">
                        <a href="javascript:void(0)" class="bar" @click="goHotGoods">
                            <i class="el-icon-hot"></i>
                            <span>热销商品</span>
                        </a>
                    </li>
                    <li class="f1 navigationBar"><a href="javascript:void(0)" class="bar" @click="goIpPeriphery">
                        <i class="el-icon-shopping-bag-2" alt="IP周边"></i>
                        <span>IP周边</span>
                    </a></li>
                    <li class="f1 navigationBar">
                        <a href="javascript:void(0)" class="bar">
                            <i class="el-icon-headset" alt="IP周边"></i>
                            <span>数码影音</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="section3">
                <div class="brand  clear widthConstraint">
                    <div class="hotgoods f1" @click="goHotGoods"></div>
                    <div class="periphery f1"></div>
                </div>
            </div>
            <div class="section4">
                <div class="widthConstraint">
                    <h2 class="editorChoice">编辑推荐</h2>
                    <ul class="list clear">
                        <li class="goodCard f1" v-for="editorChoice in EditorChoices" :key="editorChoice.id">
                            <div>
                                <a href="javascript: void(0)" class="goodPic" @click="goGood(editorChoice.id, editorChoice)">
                                    <img :src="editorChoice.imgUrl" alt="">
                                    <span class="priceTag" v-if="editorChoice.hasPriceTag">
                                        <span class="new-price">¥{{editorChoice.newPrice}}</span>
                                        <span class="old-price">¥{{editorChoice.oldPrice}}</span>
                                    </span>
                                </a>
                                <div class="goodInfo">
                                    <h3 class="goodDes" :title="editorChoice.goodName">
                                        <span class="goodTag" v-if="editorChoice.hasGoodTag">
                                            <em>{{editorChoice.goodTag}}</em>
                                        </span>
                                        <a href="javascript:void(0)" class="goodName">
                                            {{editorChoice.goodName}}
                                        </a>
                                    </h3>
                                    <p class="nowPrice">
                                        ¥
                                        <em>{{editorChoice.nowPrice}}</em>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="section5">
                <div class="widthConstraint digitalAlbum">
                    <div class="albumDes">
                        <div class="albumDesInner">
                            <span>
                                <i></i>
                                数字专辑
                            </span>
                            <p class="albumName">Taylor Swift 新专辑火热售卖中</p>
                            <p class="buy">立 即 购 买 ></p>
                        </div>
                    </div>
                    <div class="albumImg">
                        <img src="../../assets/image/story.jpg" class="back">
                        <img src="../../assets/image/taylor.jpg" class="cover">
                        <i class="circle"></i>
                    </div>
                </div>
            </div>
            <div class="section4 section6">
                <div class="widthConstraint">
                    <h2 class="editorChoice">热门商品</h2>
                    <ul class="list clear">
                        <li class="goodCard f1" v-for="hotGood in HotGoods" :key="hotGood.id" @click="goGood(hotGood.id, hotGood)">
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
    import Banner from './banner';
    import Search from './search';
    import Head from './head';
    import {getEditorChoices, getHotGoods} from "../../api";

export default {
    async created() {
        const EditorChoices = await getEditorChoices();
        const hotGoods = await getHotGoods();
        this.EditorChoices = EditorChoices;
        this.HotGoods = hotGoods;
    },
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            EditorChoices: [],
            HotGoods: [],
            goodData: {},
        }
    },
    methods: {
        goGood(id, good) {
            this.goodData = {
                id: good.id,
                imgUrl: good.imgUrl,
                singlePrice: good.nowPrice,
                name: good.goodName
            };
            this.$router.push({
                path: `/goods/goodDec/${id}`,
                query: {
                    id: id,
                    obj: JSON.stringify(this.goodData)
                }
            });
        },
        goHotGoods() {
            this.$router.push('/goods/hotGoods');
        },
        goIpPeriphery() {
            this.$router.push('/goods/ipPeriphery');
        }
    },
    components: {Banner, Search, Head}
}
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
    }
    em, i {
        font-style: normal;
        text-align: left;
        font-size: inherit;
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

    .el-container {
        .el-main {
            .widthConstraint {
                width: 800px;
                margin: 0 auto;
            }
            .f1 {
                float: left;
            }
            .clear:after {
                content: '';
                display: block;
                clear: both;
            }
            .section1 {
                background-color: #333540;
            }
            .section2 {
                width: 100%;
                height: 60px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                .navigation {
                    .navigationBar {
                        width: 255px;
                        height: 60px;
                        padding: 0px 10px;
                        text-align: center;
                        .bar {
                            font-size: 30px;
                            color: #333;
                            height: 60px;
                            vertical-align: middle;
                            padding-right: 100px;
                            border-right: 1px solid rgba(0, 0, 0, .1);
                            .el-icon-hot {
                                background: url("../../assets/image/hot.jpg") center/cover;
                            }
                            .el-icon-hot:before {
                                content: "替";
                                visibility: hidden;
                            }
                            span {
                                display: inline-block;
                                max-width: 190px;
                                height: 60px;
                                padding-left: 12px;
                                line-height: 60px;
                                font-size: 14px;
                                font-weight: bold;
                                color: #333333;
                            }
                        }
                    }
                    .navigationBar:last-child .bar {
                        border-right: none;
                    }
                    .navigationBar:first-child {
                        margin-left: 20px;
                    }
                }
            }
            .section3 {
                margin-top: 30px;
                width: 100%;
                height: 220px;
                .hotgoods, .periphery {
                    width: 385px;
                    height: 213px;
                    cursor: pointer;
                }
                .hotgoods {
                    margin-right: 30px;
                    background: url("../../assets/image/hotgoods.jpg") center/cover;
                }
                .periphery {
                    background: url("../../assets/image/periphery.jpg") center/cover;
                }
            }
            .section4 {
                margin-top: 30px;
                width: 100%;
                height: auto;
                .editorChoice {
                    font-size: 24px;
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
            .section5 {
                div {
                    box-sizing: content-box;
                }
                margin-top: 10px;
                width: 100%;
                height: auto;
                .digitalAlbum {
                    height: 145px;
                    background-color: #f9f9f9;
                    cursor: pointer;
                    position: relative;
                    .albumDes {
                        width: 550px;
                        margin: 0 20px 0 80px;
                        height: 145px;
                        .albumDesInner {
                            height: 145px;
                            span {
                                display: block;
                                padding-top: 20px;
                                font-size: 24px;
                                font-weight: bold;
                                color: #000000;
                                i {
                                    position: relative;
                                    top: 5px;
                                    margin-right: 5px;
                                    display: inline-block;
                                    width: 28px;
                                    height: 28px;
                                    background: url(https://s2.music.126.net/store/web/img/digitalicon.png?e0772534ff58ed589d305d2a25ad84e0) no-repeat;
                                }
                            }
                            .albumName {
                                position: relative;
                                margin-top: 7px;
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.7);
                                word-wrap: normal;
                                white-space: nowrap;
                            }
                            .buy {
                                margin-top: 15px;
                                font-size: 20px;
                                font-weight: bold;
                                color: #000000;
                            }
                        }
                    }
                    .albumImg {
                        top: 25px;
                        right: 40px;
                        width: 180px;
                        height: 100px;
                        position: absolute;
                        img {
                            position: absolute;
                        }
                        .back {
                            top: 8px;
                            left: 0;
                            z-index: 0;
                            width: 85px;
                            height: 85px;
                        }
                        .cover {
                            top: 0;
                            left: 40px;
                            z-index: 99;
                            width: 100px;
                            height: 100px;
                        }
                        .circle {
                            position: absolute;
                            top: 0;
                            left: 140px;
                            width: 30px;
                            height: 100px;
                            border: none;
                            background: url("../../assets/image/pointlist.png") no-repeat 0px -52px;
                        }
                    }
                }
            }
        }
    }
</style>