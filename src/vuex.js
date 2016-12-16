import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const homeNavIndex = {
    state: {
        index: '1'
    },
    getters: {
        getIndex(state) {return state.index;}
    },
    mutations: {
        
        setIndex(state, index) {state.index = index;console.log(0)}
    },
    actions: {
        setIndex({ commit }, index) {commit('setIndex', index);}
    }
};

const user = {
    state: {
        name: 'nn'
    },
    getters: {
        getName(state) {return state.name;}
    },
    mutations: {
        
        setIndex(state, name) {state.name = name;console.log(1)}
    },
    actions: {
        setIndex({ commit }, name) {commit('setIndex', name);}
    }
};

const store = new Vuex.Store({
    modules: {
        homeNavIndex,user   
    }
})

export default store