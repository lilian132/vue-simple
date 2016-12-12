import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const homeNavIndex = new Vuex.Store({
    state: {
        index: ''
    },
    getters: {
        getIndex(state) {return state.index;}
    },
    mutations: {
        setIndex(state, index) {state.index = index;}
    },
    actions: {
        setIndex({ commit }, index) {commit('setIndex', index);}
    }
});

const store = {
    homeNavIndex
}

export default store