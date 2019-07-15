import axios from 'axios'

let appkey = "0fcdc862ffec0f489b65c82b812bd9c8875158eec7daf30a928d7b29080daa98";

export default function api(url,data){
    let timestamp;
    timestamp = Date.now();
        return axios.post(`https://mock.biaoyansu.com/api/1/${url}`,data,{
            headers:{
                "BIAO-MOCK-APP-KEY":appkey,
                "BIAO-MOCK-TIMESTAMP":timestamp,
                "BIAO-MOCK-SIGNATURE":sign(appkey,timestamp)
            }
        }).then(r=>{
            return r.data
        })

}

function sign(a,b){
    return btoa(a+b);
}
//////////////////////////////
// function success(params){
//         if(params){
//             ...
//         }
// }

// fucntion file(params){
//     if(params){
//         ...
//     }
// }
// export default function login(res){
//     success(res);
//     file(res)
// }
// wx.login({
//             success(res) {
//                 if (res.code) {
//                     wx.request({
//                                 url: 'http://lanfengzheng.apichiyu.xyz/wechat/login/login',
//                                 data: {
//                                     code: res.code
//                                 },
//                                 method: "post",
//                                 dataType: "Json",
//                                 success(res) {
//                                     let data = res.data
//                                     console.log(typeof data)
//                                     if (typeof data === "string") {
//                                         data = JSON.parse(data)
//                                     } else {
//                                         data = data
//                                     }
//                                     if (data.code) {
//                                         wx.setStorageSync("sessionid", data.data.id)
//                                     }
//                                 },
//                                 fail(res) {

//                                 }
//                             })
//                             /////////////////////
// export default function api(res){
//     // let res = res;
//     if (res.code) {
//         wx.request({
//                     url: 'http://lanfengzheng.apichiyu.xyz/wechat/login/login',
//                     data: {
//                         code: res.code
//                     },
//                     method: "post",
//                     dataType: "Json",
//                     success(res) {
//                         let data = res.data
//                         console.log(typeof data)
//                         if (typeof data === "string") {
//                             data = JSON.parse(data)
//                         } else {
//                             data = data
//                         }
//                         if (data.code) {
//                             wx.setStorageSync("sessionid", data.data.id)
//                         }
//                     },
//                     fail(res) {

//                     }
//                 })
//             }
// }