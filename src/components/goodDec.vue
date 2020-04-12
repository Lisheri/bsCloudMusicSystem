<template>
    <div class="el-container">
        <Head/>
        <hr>
        <div class="el-main">
            <div class="container">
                <div class="section1">
                    <a href="javascript:void(0)" class="homePage">首页</a>
                    <span class="goodTitle">
                        <i></i>
                        i9S蓝牙5.0真无线 双耳高清通话 苹果安卓通用
                    </span>
                </div>
<!--                <img-zoom src="http://p4.music.126.net/JoivF7YdpLKzdFrFYuE5uA==/109951164077937291.jpg?param=440y440" width="440" height="440" bigsrc="http://p4.music.126.net/JoivF7YdpLKzdFrFYuE5uA==/109951164077937291.jpg" :configs="configs"></img-zoom>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Head from '../page/goods/head';
    import imgZoom from 'vue2.0-zoom'
    export default {
        name: "goodDec",
        created() {

        },
        props: {
            id: {
                type: Number,
                required: true
            }
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
                }

            }
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
            }
        }
    }
</style>