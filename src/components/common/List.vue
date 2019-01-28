<template>
    <main-layout :title="getTitle">
        <div class="handle-box">
            <!-- 查询表单 -->
            <el-form :inline="true" :model="getOptionsFormData" class="demo-form-inline" v-if="isUserJsonForm==true">
                <!-- 表单内容 -->
                <el-form-item :label="item.label" v-for="(item,index) in getOptionsFormFields" :key="index">
                    <!-- input 文本框-->
                    <el-input v-model="getOptionsFormData[item.index]" :placeholder="item.placeholder"
                              v-if="item['type']=='input'"></el-input>
                    <!-- radio 单选按钮-->
                    <el-radio-group v-model="getOptionsFormData[item.index]" v-else-if="item['type']=='radio'">
                        <el-radio :label="childItem.value" v-for="(childItem,index) in item.items" :key="index">
                            {{childItem.label}}
                        </el-radio>
                    </el-radio-group>
                    <!-- checkbox 多选按钮-->
                    <el-checkbox-group v-model="getOptionsFormData[item.index]" v-else-if="item['type']=='checkbox'">
                        <el-checkbox :label="childItem.value" v-for="(childItem,index) in item.items" :key="index">
                            {{childItem.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- input-number 数字输入框-->
                    <el-input-number v-model="getOptionsFormData[item.index]" :min="item.min" :max="item.max"
                                     v-else-if="item['type']=='input-number'"></el-input-number>
                    <!-- select 下拉选择框-->
                    <el-select v-model="getOptionsFormData[item.index]" :filterable="item.filterable"
                               :placeholder="item.placeholder" :multiple="item.multiple" :clearable="item.clearable"
                               :allow-create="item.allowCreate" :default-first-option="item.defaultFirstOption"
                               :remote-method="item.remoteMethod" :remote="item.remote" :loading="item.loading"
                               v-else-if="item['type']=='select'">
                        <el-option
                            v-for="(childItem,index) in item.items"
                            :key="index"
                            :label="childItem.label"
                            :value="childItem.value">
                        </el-option>
                    </el-select>
                    <!-- switch 开关按钮-->
                    <el-switch v-model="getOptionsFormData[item.index]"
                               :active-color="item.activeColor?item.activeColor:'#13ce66'"
                               :inactive-color="item.inactiveColor?item.inactiveColor:'#ff4949'"
                               v-else-if="item['type']=='switch'"></el-switch>
                    <!-- datetimerange 时间范围选择器-->
                    <el-date-picker v-model="getOptionsFormData[item.index]" type="datetimerange" range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd HH:mm:ss'"
                                    v-else-if="item['type']=='datetimerange'">
                    </el-date-picker>
                    <!-- cascader 远程加载级联选择器-->
                    <!--@active-item-change="item.handleItemChange"-->
                    <el-cascader v-model="getOptionsFormData[item.index]" @active-item-change="item.handleItemChange" :options="item.options" :props="item.props"  v-else-if="item['type']=='cascader'"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="delete" class="handle-del mr10" @click="test">新增</el-button>
                    </el-form-item>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
            <slot name="searchForm" :data="url" v-else></slot>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>


        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
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
            isUserJsonForm: {
                default : true
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        //表单内容信息 exp:{name:'',age:''}
                        formData: {},
                        //表单字段信息 ext:[{index:'name',type:'select',placeholderText:'',label:''}]
                        formFields: []
                    }
                }
            },

        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        components: {
            MainLayout
        },
        computed: {
            getTitle() {
                return this.title;
            },
            getOptionsFormData() {
                return this.options['formData'];
            },
            getOptionsFormFields() {
                return this.options['formFields'];
            },
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            searchRemoteData(index, query, queryUrl) {

            },
            test(value) {
                console.log(value);
                console.log(this.options.formFields)
            },
            //添加
            add(){
                //todo
            },
            //删除
            delete(){
              //todo
            },
            //修改
            edit(){
               //todo
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                }
                ;
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }
</style>
