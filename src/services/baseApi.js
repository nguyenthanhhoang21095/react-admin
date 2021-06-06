import baseUri from './baseUri'
import axios from 'axios'
// import Cookies from 'js-cookie';
import { getDataLocal } from 'src/utils';

function handleResponse(res) {
    if (res && res.status === 200) {
        return res.data.data;
    }
}

async function get(url) {
    try {
        const access_token = getDataLocal('access_token');
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": access_token ? `Bearer ${access_token}` : '',
            },
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function post(url, body) {
    try {
        const access_token = getDataLocal('access_token');
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": access_token ? `Bearer ${access_token}` : '',
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function update(url, body) {
    try {
        const access_token = getDataLocal('access_token');
        const options = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": access_token ? `Bearer ${access_token}` : '',
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

async function remove(url, body) {
    try {
        const access_token = getDataLocal('access_token');
        const options = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": access_token ? `Bearer ${access_token}` : '',
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        console.error(err)
    }
}

export default { get, post, update, remove }