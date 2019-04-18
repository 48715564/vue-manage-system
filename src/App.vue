<template>
    <router-view :width.sync="width" :height.sync="height"></router-view>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<script>
    const WIDTH_MIN = 800
    const HEIGHT_MIN = 600

    export default {
        name: 'App',
        data() {
            return {
                width: WIDTH_MIN,
                height: HEIGHT_MIN
            }
        },
        mounted() {
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            this.height = document.documentElement.clientHeight;
            this.width = document.documentElement.clientWidth;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                that.height = document.documentElement.clientHeight;
                that.width = document.documentElement.clientWidth;
            };
        }
    }
</script>
