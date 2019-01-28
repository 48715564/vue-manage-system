<template>
    <List :title="title" :options="options">
    </List>
</template>

<script>
    import List from '@/components/common/List';

    export default {
        data() {
            return {
                title: [{title: '基础表格', icon: 'el-icon-date'}, {title: '基础表格', icon: 'el-icon-date'}],
                options: {
                    formData:
                        {
                            name: '张三',
                            age: '18',
                            sexs: '0',
                            roles: ['0', '1'],
                            org: null,
                            isUser: true,
                            timeRage: [],
                            city: []
                        },
                    formFields:
                        [
                            {label: '姓名', index: 'name', type: 'input', placeholderText: '请填写姓名！'},
                            {
                                label: '性别',
                                index: 'sexs',
                                type: 'radio',
                                items: [{label: '男', value: '0'}, {label: '女', value: '1'}]
                            },
                            {
                                label: '角色',
                                index: 'roles',
                                type: 'checkbox',
                                items: [{label: '管理员', value: '0'}, {label: '普通用户', value: '1'}]
                            },
                            {label: '年龄', index: 'age', type: 'input-number', min: 1, max: 100},
                            {
                                label: '组织',
                                index: 'org',
                                type: 'select',
                                placeholder: '请选择',
                                filterable: true,
                                multiple: false,
                                clearable: true,
                                loading:false,
                                remote: true,
//                                allowCreate:true,
                                remoteMethod: (query) => {
                                    //从服务器端查询数据
                                    this.$data.options.formFields[4].loading=true;
                                    this.$data.options.formFields[4].items = [{label: '管理员', value: '0'}];
                                    this.$data.options.formFields[4].loading=false;
                                },
//                                defaultFirstOption:false,
                                items: []
                            },
                            {label: '是否是用户', index: 'isUser', type: 'switch'},
                            {
                                label: '时间范围',
                                index: 'timeRage',
                                type: 'datetimerange',
                                valueFormat: 'yyyy-MM-dd HH:mm:ss'
                            },
                            {
                                label: '选择城市',
                                index: 'city',
                                type: 'cascader',
                                props: {
                                    value: 'value',
                                    label: 'label',
                                    children: 'children'
                                },
                                handleItemChange:(val)=>{
                                    setTimeout(_ => {
                                        if (val.indexOf('js') > -1 && !this.$data.options.formFields[7].options[0].children.length) {
                                            this.$data.options.formFields[7].options[0].children = [{
                                                label: '南京',
                                                value:'nj'
                                            }];
                                        } else if (val.indexOf('zj') > -1 && !this.$data.options.formFields[7].options[1].children.length) {
                                            this.$data.options.formFields[7].options[1].children = [{
                                                label: '杭州',
                                                value:'hz'
                                            }];
                                        }
                                    }, 300);
                                },
                                options: [{
                                    label: '江苏',
                                    value: 'js',
                                    children: []
                                },{
                                    label: '浙江',
                                    value: 'zj',
                                    children: []
                                }],
                            },
                        ]
                }
            }
        },
        created() {
        },
        components: {
            List
        },
        computed: {},
        methods: {
            formFields(query) {
                if (query !== '') {
                    let data = this.options.formFields.filter(item => {
                        return item.index == 'org';
                    });
                    data.items = [{label: '保密', value: '0'}];
                }
            },
        }
    }

</script>
