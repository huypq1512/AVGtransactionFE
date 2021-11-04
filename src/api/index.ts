import Axios, { Method } from "axios";
import humps from "humps";
import { loadingStore } from "../modules/loading";
import { customHistory } from "../modules/router/router";
export interface IApiResponse<T> {
    status: number
    body: T
}
export const baseURLFE: string = "http://hotro.avg.vn:4444/"
export const baseURL: string = process.env.REACT_APP_API_BASE_URL || "";
const TOKEN_NAME: string = "x-access-token";
function getRequest(url: string, isToken: boolean = true): Promise<IApiResponse<any>> {
    loadingStore.loading = true;
    const headers: { [key: string]: string } = {};
    headers['Content-Type'] = 'application/json';
    if (isToken) headers[TOKEN_NAME] = localStorage.getItem('token') || "";
    return new Promise<any>(resolve => {
        Axios.get(
            baseURL + url,
            isToken ? { headers: headers } : undefined
        )
            .then(next => {
                loadingStore.loading = false;
                resolve({
                    body: humps.camelizeKeys(next.data),
                    status: next.status
                })
            })
            .catch(error => {
                try {
                    if (error.response.status == 401) {
                        localStorage.clear();
                        window.location.replace("/login");

                    }
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
    loadingStore.loading = true;
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
                loadingStore.loading = false;
                resolve({
                    body: humps.camelizeKeys(next.data),
                    status: next.status
                })
            })
            .catch(error => {
                try {
                    if (error.response.status == 401) {
                        localStorage.clear();
                        window.location.replace("/login");
                    }
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
async function getRequest1(url: string): Promise<IApiResponse<any>> {
    loadingStore.loading = true;
    const headers: { [key: string]: string } = {};
    headers["Content-Type"] = "application/json";
    return new Promise<any>((resolve, reject) => {
        try {
            Axios.get(
                url,
                { headers: headers }
            )
                .then(next => {
                    resolve({
                        body: humps.camelizeKeys(next.data),
                        status: next.status
                    });
                    loadingStore.loading = false;
                })
                .catch(error => {
                    resolve({
                        status: 500,
                        body: undefined
                    });
                })
                .finally(() => "");
        } catch (e) {
            console.error(e);

        }
    });
}
export {
    getRequest,
    postRequest,
    putRequest,
    getRequest1

}
