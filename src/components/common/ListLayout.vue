<template>
    <main-layout :title="getTitle">
        <div class="handle-box">
            <!-- 查询表单 -->
            <el-form :inline="true" class="demo-form-inline" :model="getFormData">
                <slot name="searchForm"></slot>
            </el-form>
        </div>
        <slot></slot>
    </main-layout>
</template>

<script>
    import MainLayout from "@/components/common/MainLayout"

    export default {
        props: {
            title: {
                required: true,
                default: []
            },
            formData : {
                required : true
            }

        },
        components: {
            MainLayout
        },
        computed: {
            getTitle() {
                return this.title;
            },
            getFormData(){
                return this.formData;
            }
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>
