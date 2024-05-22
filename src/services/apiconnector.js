import axios from "axios";

// export const axiosInstance = axios.create({
// });

// export const apiconnector = (method,url,bodyData,headers,params) =>{
//     return axiosInstance({
//         method : `${method}`,
//         url : `${url}`,
//         body : bodyData ? bodyData : null,
//         headers : headers ? headers : null,
//         params : params ? params : null
//     })
// }

export const apiconnector = (method,url,bodyData,headers)=>{
    return axios({
        method : `${method}`,
        url : `${url}`,
        data : bodyData ? bodyData : null,
        headers : headers ? headers : null
    })
}

