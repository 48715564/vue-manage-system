import AuthService from '@/services/AuthService'
const state = {
    userInfo: null
}
// mutations
const mutations = {
    updateUserInfo(state,userInfo) {
        state.userInfo=userInfo;
        console.log(userInfo);
    }
}

// actions
const actions = {
    updateUserInfo({commit, state}) {
        AuthService.getUserInfo().then((res) => {
            commit('updateUserInfo',res.data);
        });
    },
}
//getters
const getters = {
    userInfo: state => {
        return state.userInfo
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
