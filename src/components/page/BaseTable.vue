<template>
    <ListLayout :title="title" :formData="searchFormData">
        <div slot="searchForm">
            <el-form-item label="筛选关键词">
                <!-- input 文本框-->
                <el-input v-model="searchFormData.select_word" placeholder="筛选关键词"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <!-- input 文本框-->
                <el-input v-model="searchFormData.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="add" class="handle-del mr10" @click="add">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            </el-form-item>

        </div>
        <PageTable url="static/vuetable.json" ref="dataTable" @selection-change="changeCheck" @edit-click="editRow" @delete-click="deleteRow" @view-click="viewRow">
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </PageTable>
        <FormDialog :title="formDialogTitle" :isView="isView" :formData="checkRows" @save-click="save" :editvisible.sync="formDialogVisible" @cancel-click="cancel">
            <el-form-item label="姓名">
                <el-input v-model="checkRows.name"></el-input>
            </el-form-item>
        </FormDialog>
    </ListLayout>
</template>

<script>
    import ListLayout from '@/components/common/ListLayout';
    import PageTable from '@/components/common/PageTable';
    import FormDialog from '@/components/common/FormDialog';

    export default {
        data() {
            return {
                title: [{title: '基础表格', icon: 'el-icon-date'}, {title: '基础表格', icon: 'el-icon-date'}],
                searchFormData:{
                    select_word:'',
                    name:'',
                },
                formDialogTitle :'',
                formDialogVisible : false,
                isView : false,
                checkRows:{},
                checkItmes:[]
            }
        },
        created() {
        },
        components: {
            ListLayout,
            PageTable,
            FormDialog,
        },
        computed: {},
        methods: {
            changeCheck(checkItems){
                console.log(checkItems);
                this.checkItmes=checkItems;
            },
            search(){
                this.$refs.dataTable.search(this.searchFormData);
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
                console.log(form);
                this.formDialogVisible = false;
            },
            cancel(){
                this.formDialogVisible=false;
            }
        },
    }

</script>
