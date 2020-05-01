import axios from 'axios';
import qs from 'qs';
/**
 axios的配置文件
 1、设置post数据格式为表单格式
 2、设置基路径
 3、序列化字符串
 */
//配置响应时间
axios.defaults.timeout = 5000;
//配置前后端数据交互的请求头：
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置后台的访问地址
const url = 'http://localhost:8011/member/sdtc';   //配置接口地址

//添加请求拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem("token");
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${token}`;
        }
        if (config.url.indexOf(url) === -1) {
            config.url = url + config.url;/*拼接完整请求路径*/
        }
        //在发送请求之前做某件事，序列化参数->视请求头而定
        if(config.method  === 'post'){
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{

    //对响应数据做些事  自定义响应数据拦截器
    // if(res.data.flag != 1 ){
    //     // _.toast(res.data.msg);
    //     return Promise.reject(res);
    // }
    return res;
}, (error) => {
    // if (error && error.response) {
    //     switch (error.response.status) {
    //         case 400: error.message = '请求错误(400)';
    //             break;
    //         case 401: error.message = '未授权，请重新登录(401)';
    //             break;
    //         case 403: error.message = '拒绝访问(403)';
    //             break;
    //         case 404: error.message = '请求出错(404)';
    //             break;
    //         case 408: error.message = '请求超时(408)';
    //             break;
    //         case 500: error.message = '服务器错误(500)';
    //             break;
    //         case 501: error.message = '服务未实现(501)';
    //             break;
    //         case 502: error.message = '网络错误(502)';
    //             break;
    //         case 503: error.message = '服务不可用(503)';
    //             break;
    //         case 504: error.message = '网络超时(504)';
    //             break;
    //         case 505: error.message = 'HTTP版本不受支持(505)';
    //             break;
    //         default: error.message = '连接出错' + (`${error.response.status}`);
    //     }
    // }else{
    //     error.message ='连接服务器失败!'
    // }
    return Promise.reject(error);
});
export default axios;

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export function $getJson (method) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: method,
            dataType: "json",
            crossDomain: true,
            cache: false
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}