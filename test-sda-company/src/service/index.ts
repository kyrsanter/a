import {RequestParamsType} from "../types";

export class Service {

    loginUser = async (email: string):Promise<Response> => {
        let response = await fetch('/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        return response;
    };

    getCurrentUser = async (id: string):Promise<Response> => {
        let token = localStorage.getItem('token');
        let response = await fetch(`/user?id=${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    };

    getUsers = async (params: RequestParamsType):Promise<Response | void> => {
        let url = this._transformUrl(params, null, 'users');
        let token = localStorage.getItem('token');
        try {
            let response = await fetch(url, {
                signal: params.signal,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        }
        catch(err) {
            return;
        }

    };

    getAllPosts = async (params: RequestParamsType, path: string | null):Promise<Response | void> => {
        let url:string = this._transformUrl(params, path, 'posts' );
        let token = localStorage.getItem('token');
        try {
            let allPostsResponse = await fetch(url, {
                signal: params.signal,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            return allPostsResponse;
        }
        catch(err) {
            return;
        }

    };

    getUserPosts = async (params: RequestParamsType, path: string | null):Promise<Response | void> => {
        let url = this._transformUrl(params, path, 'posts' );
        let token = localStorage.getItem('token');
        try {
            let userPostsResponse = await fetch(url, {
                signal: params.signal,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            return userPostsResponse;
        }
        catch(err) {
            return;
        }
    };

    _transformUrl = (params: RequestParamsType, path: string | null, typeOfData: string | null): string => {
        let url;
        if (path) {
            url = `/${typeOfData}/${encodeURIComponent(path)}?`;
        } else {
            url = `/${typeOfData}?`;
        }
        for (let key in params) {
            if (key === 'signal') {
                continue
            }
            //@ts-ignore
            url += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`
        };
        let lastUrl = url.slice(0, url.lastIndexOf('&'));
        return lastUrl;
    }
}