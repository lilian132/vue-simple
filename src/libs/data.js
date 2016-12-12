'use strict';
import Vue from 'vue'
import resource from 'vue-resource'
import mock from './mock'

Vue.use(resource);
var vue = new Vue()
// vue.$http.options.emulateJSON = true;

module.exports = {
    getHotGames:function(page){    	
        return vue.$http.get('http://web.11h5.com:4600/api',{
            token: '5d3b9d5bc0fbbde68b72ffba1b4af342',
            cmd: 'getRecoGames',
            page: page,
            pageSize: 10
        })
    }
}
