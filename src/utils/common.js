const getMenuTree = (menuList)=>{
  //找到所有类型为菜单的节点
    let menus = menuList.filter(item =>{ if(item.isMenu === 1 && item.pid!=0)return true});
  //找到所有pcode=root的一级菜单
    let pMenus = menus.filter(item =>{if(item.pcode==='root') return true});
    //todo
    return [
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
};

export default {
    getMenuTree
};
