import common from '@/utils/common'
import AuthService from '@/services/AuthService'

/**
 * menuList: [
 {
     icon: 'el-icon-setting',
     index: 'dashboard',
     title: '系统首页'
 },
 {
     icon: 'el-icon-tickets',
     index: 'table',
     title: '基础表格'
 },
 {
     icon: 'el-icon-message',
     index: 'tabs',
     title: 'tab选项卡'
 },
 {
     icon: 'el-icon-date',
     index: '3',
     title: '表单相关',
     subs: [
         {
             index: 'form',
             title: '基本表单'
         },
         {
             index: 'editor',
             title: '富文本编辑器'
         },
         {
             index: 'markdown',
             title: 'markdown编辑器'
         },
         {
             index: 'upload',
             title: '文件上传'
         }
     ]
 },
 {
     icon: 'el-icon-star-on',
     index: 'charts',
     title: 'schart图表'
 },
 {
     icon: 'el-icon-rank',
     index: 'drag',
     title: '拖拽列表'
 },
 {
     icon: 'el-icon-warning',
     index: 'permission',
     title: '权限测试'
 },
 {
     icon: 'el-icon-error',
     index: '404',
     title: '404页面'
 },{
            icon: 'el-icon-date',
            index: 'system',
            title: '系统设置',
            subs: [
                {
                    index: 'org',
                    title: '组织机构管理'
                }
            ]
        },
 ]
 * @type {{menuList: [null,null,null,null,null,null,null,null,null]}}
 */
const state = {
    menuList: []
}
// mutations
const mutations = {
    updateMenuList(state,menuList) {
        state.menuList=menuList;
    },
}

// actions
const actions = {
    updateMenuList({commit, state}, menuList) {
        AuthService.getMeunList().then((res) => {
            commit('updateMenuList',res.data);
        });
    },
}

//getters
const getters = {
    menuList: state => {
        return common.getMenuTree(state.menuList);
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
