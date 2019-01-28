import AuthService from '@/services/AuthService'
const state = {
    userInfo: null
}
// mutations
const mutations = {
    updateUserInfo(state,userInfo) {
        state.userInfo=userInfo;
        console.log(userInfo);
    },
}

// actions
const actions = {
    updateUserInfo({commit, state}, userInfo) {
        AuthService.getUserInfo().then() .then((res) => {
            commit('updateUserInfo',res.data);
        });
        const savedCartItems = [...state.items];

    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
