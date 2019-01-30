<template>
    <el-dialog :title="getTitle" :visible.sync="visible" @close="cancel" width="30%">
        <el-form  ref="form" :disabled="getIsView" :rules="rules" :model="formData" label-width="50px">
            <slot></slot>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button v-if="!getIsView" type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                default: ''
            },
            formData : {
                required : true
            },
            isView : {
                required : true,
                default : false,
            },
            editvisible : {
                required : true,
                default : false
            },
            rules : {
                required : false,
                default:function () {
                    return {};
                }
            }
        },
        data() {
            return {
                visible : false
            }
        },
        computed: {
            getTitle() {
                return this.title;
            },
            getFormData(){
                return this.formData;
            },
            getIsView(){
                return this.isView;
            }
        },
        watch: {
            editvisible(val) {
                this.visible = val;
            }
        },
        methods:{
            saveEdit(){
                this.$emit('save-click',this.getFormData);
            },
            cancel(){
                this.visible=false;
                this.$emit('update:editvisible', false);
            }
        }
    }

</script>
