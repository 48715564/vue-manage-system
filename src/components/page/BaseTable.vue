<template>
    <ListLayout :title="title">
        <div slot="searchForm">
            <el-form-item label="筛选关键词">
                <!-- input 文本框-->
                <el-input v-model="select_word" placeholder="筛选关键词"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <!-- input 文本框-->
                <el-input v-model="name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </el-form-item>
        </div>
        <PageTable url="static/vuetable.json" ref="dataTable" @selection-change="changeCheck">
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </PageTable>
    </ListLayout>
</template>

<script>
    import ListLayout from '@/components/common/ListLayout';
    import PageTable from '@/components/common/PageTable';

    export default {
        data() {
            return {
                title: [{title: '基础表格', icon: 'el-icon-date'}, {title: '基础表格', icon: 'el-icon-date'}],
                select_word:'',
                name:''
            }
        },
        created() {
        },
        components: {
            ListLayout,
            PageTable
        },
        computed: {},
        methods: {
            changeCheck(checkItems){
                console.log(checkItems);
            },
            search(){
                this.$refs.dataTable.search({name:'张三'});
                console.log("search");
            },
            delAll(){
                console.log("delAll");
            },
            delAll(){
                console.log("delAll");
            },
        },
    }

</script>
