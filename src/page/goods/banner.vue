<template>
    <div class="block">
        <el-carousel trigger="click" height="480px">
            <el-carousel-item v-for="banner in goodBanners" :key="id">
                <img
                        :src="banner.imgUrl"
                        class="banner-img"
                />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import { getShopBanner } from "@/api"
    export default {
        async created() {
            const  banners = await getShopBanner()
            this.goodBanners = banners
        },
        data() {
            return {
                goodBanners: [],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
