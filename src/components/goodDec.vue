<template>
    <div class="el-container">
        <Head/>
        <hr>
        <div class="el-main">
            <div class="container">
                <div class="section1">
                    <a href="javascript:void(0)" class="homePage" @click="() => {this.$router.push('/goods')}">首页</a>
                    <span class="goodTitle">
                        <i></i>
                        {{title}}
                    </span>
                </div>
                <div class="section2">
                    <div class="goodPic">
                        <div class="tabCon">
                            <div v-for='(itemCon,index) in tabContents' v-show="index == num">
                                <img-zoom :src="itemCon.smPicUrl" width="440" height="440" :bigsrc="itemCon.bigPicUrl" :configs="configs"></img-zoom>
                            </div>
                        </div>
                        <div class="menuList">
                            <ul class="clear">
                                <li class="fl" v-for="(item,index) in list" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
                                    <img :src="item">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goodInfo">
                        <h2> {{title}}</h2>
                        <span class="extraDesc">{{goodDec}}</span>
                        <p class="price">
                            <span class="priceTitle">价格：</span>
                            <span class="rmb">¥</span>
                            <em class="num">{{price[colorType]}}</em>
                        </p>
                        <div class="type clear">
                            <div class="color fl"><i>颜色分类：</i></div>
                            <ul class="clear">
                                <li class="fl colorList" v-for="(item, index) in colors" :key="item.id" :class="{activeColor: colorType === index}" @click="getColor(index)">
                                    <a href="javascript:void(0)">{{item.type}}</a></li>
                            </ul>
                        </div>
                        <div class="goodsNum clear">
                            <div class="fl goodNumTitle"><i>数量:</i></div>
                            <el-input-number v-model="goodsNum" @change="handleChange" :min="1" :max="stock" label="描述文字" class="fl numInput"></el-input-number>
                            <div class="fl goodNumTitle"><i>库存{{stock}}件</i></div>
                        </div>
                        <div class="buttonGroup">
                            <el-row>
                                <el-button @click="buyNow">立即购买</el-button>
                                <el-button class="inCart" @click="pushInCart">加入购物车</el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
<!--                <img-zoom src="http://p4.music.126.net/JoivF7YdpLKzdFrFYuE5uA==/109951164077937291.jpg?param=440y440" width="440" height="440" bigsrc="http://p4.music.126.net/JoivF7YdpLKzdFrFYuE5uA==/109951164077937291.jpg" :configs="configs"></img-zoom>-->
                <div class="section3">
                    <div class="commodityDetailTitle">
                        <h2>商品详情</h2>
                    </div>
                    <div class="commodityDetail" v-html="details"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Head from '../page/goods/head';
    import imgZoom from 'vue2.0-zoom';
    import {getGoodDec, postSaveGoodInCart} from '../api/goods'
    import bus from '../bus';

    import { mapState, mapMutations, mapActions, mapGetters } from "@/store/helper/goods"
    export default {
        name: "goodDec",
        async created() {
            console.log(this.$route.query.id);
            const goodId = this.$route.query.id;
            const {
                list,
                tabContents,
                colors,
                price,
                id,
                title,
                stock,
                goodDec,
                details
            } = await getGoodDec(goodId);
            this.list = list;
            this.tabContents = tabContents;
            this.colors = colors;
            this.details = details;
            this.price = price;
            this.title = title;
            this.stock = stock;
            this.goodDec = goodDec;
        },
        mounted() {
            // console.info(this.$route.query.obj);
            this.goodData = JSON.parse(this.$route.query.obj);
        },
        data() {
            return {
                configs: {
                    width:530,
                    height:530,
                    maskWidth:291,
                    maskHeight:291,
                    maskColor:'black',
                    maskOpacity:0.2
                },
                num: 0,
                colorType: 0,
                list: ["http://p3.music.126.net/7BadYjIuLqk3WSh0OqJrBg==/109951164541267299.jpg", "http://p4.music.126.net/Ur8hyqTnCqbZ7Qw0xScWaw==/109951164541263421.jpg", "http://p4.music.126.net/87e0k-RS1bkC9cLc9pk89A==/109951164541272644.jpg"],
                tabContents: [
                    {smPicUrl: "http://p3.music.126.net/7BadYjIuLqk3WSh0OqJrBg==/109951164541267299.jpg?param=440y440", bigPicUrl: "http://p3.music.126.net/7BadYjIuLqk3WSh0OqJrBg==/109951164541267299.jpg"},
                    {smPicUrl: "http://p4.music.126.net/Ur8hyqTnCqbZ7Qw0xScWaw==/109951164541263421.jpg?param=440y440", bigPicUrl: "http://p4.music.126.net/Ur8hyqTnCqbZ7Qw0xScWaw==/109951164541263421.jpg"},
                    {smPicUrl: "http://p4.music.126.net/87e0k-RS1bkC9cLc9pk89A==/109951164541272644.jpg?param=440y440", bigPicUrl: "http://p4.music.126.net/87e0k-RS1bkC9cLc9pk89A==/109951164541272644.jpg"}],
                colors: [{id: 0, type: '升级版'},{id: 1, type: '标准版'}],
                goodsNum: 1,
                details: "<div class=\"n-describe\">\n<div class=\"j-flag\"> <div id=\"info\"></div><p><span style=\"color:#ff0000;\">正品低价 品质保证</span></p><p><span style=\"font-weight:bold;\">影巨人 i19 蓝牙5.0真无线耳机</span></p><p><span style=\"color:#ff0000;\">装箱清单：耳机× 1副、 充电仓× 1、 数据线× 1、 说明书× 1。 </span></p><p><span style=\"color:#ff0000;\">该产品一经拆封，非质量问题不接受7天无理由退换货。</span></p><p><br></p><img src=\"http://p4.music.126.net/-dYy_Kabm3hfqqu-i1JTGQ==/109951164840648483.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/wPVc5VMRRLgcvL5JaiTJEg==/109951164840661039.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/CCKnF5d-UwfzQsL4hxSk7A==/109951164840653292.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/D-tt1ftyMDtuDIIvqqRjSg==/109951164840660551.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/1n-zsoHcWtJ1c_zrsKwhyA==/109951164840653806.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/BOz-i3Slk6fD4SgI67S2og==/109951164840659122.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/Sayfqjv-B39ICQMGvP4uCA==/109951164840662512.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/bytQoRZKMVR6E1uYt_CEfg==/109951164840661572.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/N0hxk8T9yHJMeexybrbBTg==/109951164840661581.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/cBAJ2uYLlfhsj8XY3-Bo1A==/109951164840657205.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/MS77gdHDvEGNc-r93N1GoA==/109951164840657686.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/3G2pZLBqy1ou_1dcdB0R-Q==/109951164840652348.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/xNniK8KZxdfy9CG9Bz-tfg==/109951164840662565.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p4.music.126.net/5jGAuP9tUdiWxHHSrrlMCg==/109951164840661138.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/Kq44LwvjoyisTWTT-NrSuA==/109951164840657242.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><img src=\"http://p3.music.126.net/KIyAc-MwRHMn82MP4yHvCQ==/109951164840663078.jpg?imageView&amp;thumbnail=700x0&amp;quality=75\"><p><br> </p><p>商品交易成功后会在2个工作日内由深圳市恒天鸿业科技有限公司发货，法定节假日顺延，请在确认商品完好后再签收。若存在质量问题，请务必在7天之内联系客服：</p><p>·客服账号：私信 <a href=\"https://music.163.com/#/user/home?id=253335632\" rel=\"nofollow\" style=\"color:#507daf;\">@云音乐客服</a></p><p>·温馨提示：完整的包装、配件和保修卡是电子产品进行售后的基础，请务必查看齐全后签收并妥善保管。</p></div>\n</div>",
                price:[89, 100],
                title: '',
                stock: null,
                goodDec: '',
                goodData: {},
            }
        },
        methods: {
            getNum(index) {
                this.num = index;
            },
            getColor(index) {
                this.colorType = index;
            },
            handleChange(value) {
                // this.goodsNum = value;
            },
            pushInCart() {
                this.goodData.goodsNum = this.goodsNum;
                this.goodData.checked = true;
                this.goodData.type = this.colors[this.colorType].type;
                this.goodData.stock = this.stock;
                bus.$emit('goodNum', this.goodsNum);
                postSaveGoodInCart(this.goodData).then(res => {
                    console.info(res);
                })
                // this.setGoodData(this.goodData);
            },
            buyNow() {
                // console.info(JSON.parse(this.$route.query.obj))
                let {
                    singlePrice
                } = JSON.parse(this.$route.query.obj)
                let params = Object.assign(JSON.parse(this.$route.query.obj), {goodsNum: this.goodsNum, type: this.colors[this.colorType].type, allPrice: singlePrice * this.goodsNum})
                this.$router.push({path: '/goods/order', query: {obj: JSON.stringify(params)}})
            },
            ...mapMutations(['setGoodData']),
            ...mapGetters(['getGoodData'])
        },
        components: {Head, imgZoom}
    }
</script>

<style scoped lang="scss">
    div {
        box-sizing: content-box;
    }
    a {
        text-decoration: none;
    }
    em, i {
        font-style: normal;
        text-align: left;
        font-size: inherit;
    }
    hr {
        background-color: #ccc;
        opacity: 0.3;
        margin: 0;
    }
    .fl {
        float: left;
    }
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }
    .el-container {
        .el-main {
            width: 100%;
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
                    display: flex;
                    width: 100%;
                    margin-top: 50px;
                    .goodPic {
                        width: 55%;
                        margin-right: 2%;
                        .tabCon {
                            ._magnifier {
                                border: 1px solid rgba(0,0,0,.2);
                                background-color: #f9f9f9;
                            }
                        }
                        .menuList {
                            margin-top: 20px;
                            ul {
                                li {
                                    width: 80px;
                                    height: 80px;
                                    margin-right: 10px;
                                    box-sizing: border-box;
                                    border: 2px solid transparent;
                                    img {
                                        width: 76px;
                                        height: 76px;
                                    }
                                }
                                li.active {
                                    border: 2px solid #000;
                                }
                                li:hover {
                                    border: 2px solid #000;
                                }
                            }
                        }
                    }
                    .goodInfo {
                        width: 40%;
                        h2 {
                            line-height: 40px;
                            color: #333;
                            font-size: 20px;
                            font-weight: normal;
                        }
                        .extraDesc {
                            font-size: 8px;
                            color: #aaa;
                            margin-top: 12px;
                            display: block;
                        }
                        .price {
                            margin-top: 20px;
                            .priceTitle {
                                color: #999;
                                font-size: 12px;
                                text-align: left;
                                margin-right: 10px;
                                display: inline-block;
                                width: 66px;
                            }
                            .rmb {
                                color: #FF0036;
                                font-size: 18px;
                            }
                            .num {
                                color: #FF0036;
                                font-size: 24px;
                                font-weight: bolder;
                            }
                        }
                        .type {
                            margin-top: 20px;
                            .color {
                                width: 66px;
                                color: #999;
                                font-size: 12px;
                                text-align: left;
                                margin-right: 10px;
                                height: 30px;
                                position: relative;
                                i {
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                            }
                            ul {
                                li {
                                    cursor: pointer;
                                    white-space: nowrap;
                                    box-sizing: content-box;
                                    a {
                                        border: 1px solid #b8b7bd;
                                        color: #000;
                                        text-align: center;
                                        width: 80px;
                                        height: 30px;
                                        line-height: 30px;
                                        display: block;
                                    }
                                }
                                li.colorList:not(:last-child) {
                                    margin-right: 10px;
                                }
                                li.activeColor, li:hover {
                                    a {
                                        border: 2px solid #FF0036;
                                        margin: -1px;
                                    }
                                }
                            }
                        }
                        .goodsNum {
                            margin-top: 20px;
                            .goodNumTitle {
                                width: 66px;
                                color: #999;
                                font-size: 12px;
                                text-align: left;
                                margin-right: 10px;
                                height: 30px;
                                position: relative;
                                i {
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                            }
                            /deep/ .numInput {
                                height: 30px;
                                width: 120px;
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
                        /deep/ .buttonGroup {
                            margin-top: 35px;
                            .el-button {
                                position: relative;
                                width: 148px;
                                background-color: #ffeded;
                                border: 1px solid #FF0036;
                                color: #FF0036;
                                border-radius: 0;
                                padding: 0;
                                span {
                                    height: 40px;
                                    line-height: 40px;
                                    display: block;
                                    font-size: 16px;
                                }
                            }
                            .inCart {
                                background-color: #ff0036;
                                border: 1px solid #ff0036;
                                span {
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .section3 {
                    width: 100%;
                    /*height: auto;*/
                    margin-top: 50px;
                    height: 200px;
                    .commodityDetailTitle {
                        /*height: 80px;*/
                        border-bottom: 1px solid black;
                        padding-bottom: 10px;
                        h2 {
                            color: #333;
                            font-size: 18px;
                            font-weight: 600;
                        }
                    }
                    /deep/ .commodityDetail p{
                         margin-top: 10px;
                    }

                }
            }
        }
    }
</style>