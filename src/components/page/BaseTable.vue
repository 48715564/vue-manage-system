<template>
    <ListLayout :title="title" :formData="searchFormData" pageDataUrl="static/vuetable.json">
        <template slot="searchForm">
            <el-form-item label="筛选关键词">
                <!-- input 文本框-->
                <el-input v-model="searchFormData.select_word" placeholder="筛选关键词"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <!-- input 文本框-->
                <el-input v-model="searchFormData.name" placeholder="姓名"></el-input>
            </el-form-item>
        </template>
        <template slot="dataTable">
             <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </template>
        <template slot="formDialog" slot-scope="scope">
            <el-form-item label="姓名">
                <el-input v-model="scope.checkRows.name"></el-input>
            </el-form-item>
        </template>
    </ListLayout>
</template>

<script>
    import ListLayout from '@/components/common/ListLayout';

    export default {
        data() {
            return {
                title: [{title: '基础表格', icon: 'el-icon-date'}, {title: '基础表格', icon: 'el-icon-date'}],
                searchFormData:{
                    select_word:'',
                    name:'',
                },
            }
        },
        created() {
        },
        components: {
            ListLayout
        },
        computed: {},
        methods: {},
    }

</script>
