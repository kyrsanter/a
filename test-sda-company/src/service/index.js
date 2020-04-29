export class Service {

    loginUser = async (userData) => {
        let response = await fetch('/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response;
    };

    getCurrentUser = async (id) => {
        let token = localStorage.getItem('token');
        let response = await fetch(`/user?id=${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    };

    getUsers = async (params) => {
        let url =  this._transformUrl(params, '', 'users');
        let token = localStorage.getItem('token');
        let response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    };

    getPosts = async (params, path) => {
        let url = this._transformUrl(params, path, 'posts' );
        let token = localStorage.getItem('token');
        let response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return response;
    };

    _transformUrl = (params, path, typeOfData) => {
        let url;
        if (path) {
            url = `/${typeOfData}/${encodeURIComponent(path)}?`;
        } else {
            url = `/${typeOfData}?`;
        }
        for (let key in params) {
            url += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`
        };
        let lastUrl = url.slice(0, url.lastIndexOf('&'));
        return lastUrl;
    }
}