<template>
    <div>
        <el-table :data="tableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <slot></slot>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-view" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import querystring from 'querystring';
    export default {
        props: {
            defaultSearchData:{
                required:false,
                type: Object,
                default: function () {
                    return { time: new Date() }
                }
            },
            url:{
                required:true,
                type: String,
                default:''
            }

        },
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                searchData:{},
                is_search: false,
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            getTitle() {
                return this.title;
            },
            getDefaultSearchData() {
                return this.defaultSearchData;
            },
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let searchJson = {...this.getDefaultSearchData,...this.searchData,cur_page:this.cur_page};
                console.log(searchJson);
                this.$axios.get(this.url, {params:searchJson}).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search(searchForm) {
                this.is_search = true;
                this.searchData=searchForm;
                this.getData();
            },
            handleEdit(index, row) {
                this.idx = index;
                this.$emit('edit-click',row);
            },
            handleView(index, row){
                this.idx = index;
                this.$emit('view-click',row);
            },
            handleDelete(index, row) {
                this.idx = index;
//                const item = this.tableData[index];
                this.$confirm('是否确认删除改条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('delete-click',row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('selection-change',val);
            },
        }
    }

</script>
<style scoped>
    .red{
        color: #ff0000;
    }
</style>
