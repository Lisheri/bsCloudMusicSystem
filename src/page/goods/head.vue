<template>
    <div class="el-head">
    <div class="head">
        <div class="shopCity"></div>
        <Search class="search"/>
        <div class="topCart icon-wrap">
            <a class="el-icon-shopping-cart-2"></a>
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
    export default {
        name: "head",
        components: {Search}
    }
</script>

<style scoped lang="scss">
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