import baseUri from './baseUri'
import axios from 'axios'
import Cookies from 'js-cookie';

const access_token = Cookies.get('access_token');
const configBearerToken = {
    Authorization: access_token ? `Bearer ${access_token}` : '',
}

const axiosInstance = axios.create({
    withCredentials: true,
    credentials: 'include',
});

// config request 
axiosInstance.interceptors.request.use(
    (config) => {
        return {
            ...config,
            headers: {
                "content-type": "application/json",
                ...configBearerToken,
            }
        }
    },
    (error) =>
        Promise.reject(error)
);

function handleResponse(res) {
    if (res && res.status === 200) {
        return res.data.data;
    }
}

async function get(url) {
    try {
        const options = {
            method: "GET",
            url: baseUri + url
        }
        const res = await axiosInstance(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function post(url, body) {
    try {
        const options = {
            method: "POST",
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axiosInstance(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function update(url, body) {
    try {
        const options = {
            method: "PUT",
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axiosInstance(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function remove(url, body) {
    try {
        const options = {
            method: "DELETE",
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axiosInstance(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

export default { get, post, update, remove }