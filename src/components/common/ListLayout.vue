<template>
    <main-layout :title="getTitle">
        <div class="handle-box">
            <!-- 查询表单 -->
            <el-form :inline="true" class="demo-form-inline" :model="getFormData">
                <slot name="searchForm"></slot>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="add" class="handle-del mr10" @click="add">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <PageTable :url="getPageUrl" ref="dataTable" @selection-change="changeCheck" @edit-click="editRow" @delete-click="deleteRow" @view-click="viewRow">
            <slot name="dataTable"></slot>
        </PageTable>
        <FormDialog :title="formDialogTitle" :isView="isView" :formData="checkRows" @save-click="save" :editvisible.sync="formDialogVisible" @cancel-click="cancel">
            <slot name="formDialog" :checkRows="checkRows"></slot>
        </FormDialog>

    </main-layout>
</template>

<script>
    import MainLayout from "@/components/common/MainLayout"
    import PageTable from '@/components/common/PageTable';
    import FormDialog from '@/components/common/FormDialog';

    export default {
        props: {
            title: {
                required: true,
                default: []
            },
            formData : {
                required : true
            },
            pageDataUrl : {
                required: true
            },
        },
        data() {
            return {
                formDialogTitle :'',
                formDialogVisible : false,
                isView : false,
                checkRows:{},
                checkItmes:[]
            }
        },
        methods: {
            changeCheck(checkItems){
                this.checkItmes=checkItems;
            },
            search(){
                this.$refs.dataTable.search(this.getFormData);
            },
            delAll(){
                console.log("delAll");
            },
            add(){
                this.checkRows={};
                this.formDialogTitle = "新增";
                this.formDialogVisible = true;
                this.isView =false;
            },
            editRow(item){
                this.checkRows = item;
                this.formDialogTitle = "编辑";
                this.formDialogVisible = true;
                this.isView =false;
            },
            deleteRow(item){
                console.log("删除->",item);
            },
            viewRow(item){
                this.checkRows = item;
                this.formDialogTitle = "查看";
                this.formDialogVisible = true;
                this.isView =true;
            },
            save(form){
                this.formDialogVisible = false;
            },
            cancel(){
                this.formDialogVisible=false;
            }
        },
        components: {
            MainLayout,
            PageTable,
            FormDialog,
        },
        computed: {
            getTitle() {
                return this.title;
            },
            getFormData(){
                return this.formData;
            },
            getPageUrl(){
                return this.pageDataUrl
            }
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>
