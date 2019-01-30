<template>
    <el-dialog :title="getTitle" :visible.sync="visible" @close="cancel" width="30%">
        <el-form ref="form" :rules="rules" :model="formData" label-width="50px">
            <slot></slot>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
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
