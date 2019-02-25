import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import store from './store'
import { Message,Loading} from 'element-ui';//引入elm组件
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

let loadingInstance;//定时器

axios.interceptors.request.use((config) => {
    loadingInstance = Loading.service({
        lock: true,
        text: '努力拉取中 ~>_<~',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    debugger
    if (sessionStorage.getItem('token')&&!config.headers.Authorization) {  // 判断是否存在token，如果存在的话，则每个http header都加上Authorization
        config['headers']['Authorization'] = "Bearer "+sessionStorage.getItem('token');
    }
    return config;
}, (err) => {
    loadingInstance.close();
    // 请求失败的处理
    this.$message.error("网络异常！");
});

let btn = this;
axios.interceptors.response.use(response => {
    loadingInstance.close();
    if(response.data&&(response.data.code=='403'||response.data.code=='400'||response.data.code=='500')){
        Message.error(response.data.message);
        return;
    }else if(response.data&&response.data.code=='401'){
        store.commit('user/updateUserInfo',null);
        sessionStorage.setItem('token',null);
        location.reload(true);
    }
    return response;
}, (err) => {
    loadingInstance.close();
    Message.error("服务器异常！");
});

if(sessionStorage.getItem('token')){
    store.dispatch('user/updateUserInfo');
}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token');
    //判断是否登录，如果已经登录直接跳转到主页
    if( token && to.path == '/login'){
        next('/');
    }
    else if(!token && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        // user === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
