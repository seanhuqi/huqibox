/**
 * 封装整个项目的网络(ajax)请求工具函数
 */

import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://127.0.0.1:5000"; // 设置请求服务器地址
axios.defaults.timeout = 5000; // 请求超时时间

// 封装通用的get请求和post请求
export default {
    get(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params: data
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};