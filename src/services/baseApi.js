import baseUri from './baseUri'
import axios from 'axios'
import { getDataLocal } from 'src/utils';

const access_token = getDataLocal('access_token');
const configBearerToken = {
    Authorization: access_token ? `Bearer ${access_token}` : '',
}

function handleResponse(res) {
    if (res && res.status === 200) {
        return res.data.data;
    }
}

async function get(url) {
    try {
        const options = {
            method: "GET",
            headers: {
                ...configBearerToken,
            },
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        throw Error(err)
    }
}

async function post(url, body) {
    try {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                ...configBearerToken,
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        throw Error(err)
    }
}

async function update(url, body) {
    try {
        const options = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                ...configBearerToken,
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        throw Error(err)
    }
}

async function remove(url, body) {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                ...configBearerToken,
            },
            data: JSON.stringify(body),
            url: baseUri + url
        }
        const res = await axios(options);
        return handleResponse(res);
    } catch (err) {
        throw Error(err)
    }
}

export default { get, post, update, remove }