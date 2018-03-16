import axios from "axios"
const REQUEST_TIMEOUT = 1000;
export function get(url, headers = {}) {
    return axios({
        method: "get",
        url: url,
        timeout: REQUEST_TIMEOUT,
        headers: headers
    }).then(({ data }) => {
        return data;
    }).catch(error => {
        erorrHandeller(error);
    })
}

export function post(url, data, headers = {}) {
    return axios({
        method: "post",
        url: url,
        timeout: REQUEST_TIMEOUT,
        data: data,
        headers: headers
    }).then(({ data }) => {
        return data;
    }).catch(error => {
        erorrHandeller(error);
    })
}

function erorrHandeller(error) {
    console.log(`Unable to complete Request, ${error}`)
}