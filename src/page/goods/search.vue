<template>
    <div>
        <el-input prefix-icon="el-icon-search"
                  placeholder="搜索商品"
                  v-model="input3"
                  class="input-with-select">
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style lang="scss" scoped>
    .el-input {
        width: 200px;
        background-color: #fff;
    }
</style>