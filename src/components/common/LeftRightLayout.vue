<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> {{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-container style="min-height: 500px;">
            <transition name="fade">
                <el-aside width="200px" class="full-container" style="border-radius:5px 0 0 5px" v-if="show">
                    <div class="left-container">
                        <div class="left-container_left">
                            <div style="margin-bottom: 20px">
                                {{leftTitle}}
                            </div>
                            <slot name="left"></slot>
                        </div>
                        <div class="left-container_right" @click="toggleTree()">
                            <i class="el-icon-arrow-left"></i>
                        </div>
                    </div>
                </el-aside>
                <el-aside width="20px" class="full-container" v-else="show">
                    <div class="left-container">
                        <div class="left-container_right" @click="toggleTree()">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </el-aside>
            </transition>
            <el-main class="full-container" style="border-radius:0 5px 5px 0">
                <slot name="right"></slot>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        props: ['title','leftTitle'],
        data: function () {
            return {
                show: true
            }
        },
        methods: {
            toggleTree(){
                this.show = !this.show;
            },
        }
    }
</script>

<style scoped>
    .left-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .left-container_left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 15px;
        align-items: center;
        flex:1;
    }

    .left-container_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20px;
        background-color: #DCDFE6;
    }

    .full-container{
        background: #fff;
    }
</style>
