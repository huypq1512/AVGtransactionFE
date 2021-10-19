import Axios, { Method } from "axios";
import humps from "humps";
import { loadingStore } from "../modules/loading";
export interface IApiResponse<T> {
    status: number
    body: T
}
const baseURL: string = process.env.REACT_APP_API_BASE_URL || "";
const TOKEN_NAME: string = "x-access-token";
function getRequest(url: string, isToken: boolean = true): Promise<IApiResponse<any>> {
    const headers: { [key: string]: string } = {};
    headers['Content-Type'] = 'application/json';
    if (isToken) headers[TOKEN_NAME] = localStorage.getItem('token') || "";
    return new Promise<any>(resolve => {
        Axios.get(
            baseURL + url,
            isToken ? { headers: headers } : undefined
        )
            .then(next => {
                resolve({
                    body: humps.camelizeKeys(next.data),
                    status: next.status
                })
            })
            .catch(error => {
                try {
                    resolve({
                        status: error.response.status,
                        body: humps.camelizeKeys(error.response.data)
                    });
                } catch (e) {
                    resolve({
                        status: 500,
                        body: e
                    });
                }
            });
    });
}

function apiCall(url: string, method: Method, isToken: boolean = true, data?: { [key: string]: any }): Promise<IApiResponse<any>> {
    const headers: { [key: string]: string } = {};
    headers['Content-Type'] = 'application/json';
    if (isToken) headers[TOKEN_NAME] = localStorage.getItem('token') || "";
    return new Promise<any>(resolve => {
        Axios(
            {
                url: baseURL + url,
                method: method,
                headers: headers,
                data: data ? JSON.stringify(data) : undefined
            }
        )
            .then(next => {
                resolve({
                    body: humps.camelizeKeys(next.data),
                    status: next.status
                })
            })
            .catch(error => {
                try {
                    resolve({
                        status: error.response.status,
                        body: humps.camelizeKeys(error.response.data)
                    });
                } catch (e) {
                    resolve({
                        status: 500,
                        body: e
                    });
                }
            });
    });
}

function postRequest(url: string, isToken: boolean = true, data?: { [key: string]: any }): Promise<IApiResponse<any>> {
    return apiCall(url, "POST", isToken, data);
}

function putRequest(url: string, isToken: boolean = true, data?: { [key: string]: any }) {
    return apiCall(url, "PUT", isToken, data);
}
export {
    getRequest,
    postRequest,
    putRequest,

}
