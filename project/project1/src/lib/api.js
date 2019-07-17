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
