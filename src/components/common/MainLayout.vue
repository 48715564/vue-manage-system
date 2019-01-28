<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in titleList" :key="index">
                    <i :class="item.icon" v-if="item.icon"></i> {{item.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:
            {
                title: {
                    required: true,
                    validator(value){
                        if (!(value instanceof Array)) {
                            return value['title'];
                        }else {
                            return value.filter(item => !(item.title)).length==0;
                        }
                    },
                }
            },
        computed: {
            titleList() {
                if (!(this.title instanceof Array)) {
                    let tempTitle = [];
                    tempTitle.push(this.title);
                    return tempTitle;
                } else {
                    return this.title
                }
            }
        }
    }
</script>
