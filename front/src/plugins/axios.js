"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store'
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(response.data.token) {
      store.state.token = response.data.token;
      axios.defaults.headers.common.Authorization = store.state.token;

      // console.log(response.data.token)
    }

    return Promise.resolve(response);
  },
  function(error) {
    // Do something with response error
    if(error.response.status === 401) {
      store.state.token = ''
      router.push('/counseling/loan')
    }
    
    else if(error.response.status === 500) {
      alert(error + "\n관리자 문의 바랍니다.")
    }
    
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
