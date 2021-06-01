const devUrl = 'http://localhost:2021/api/';
const prodUrl = 'https://server.hoang-shop-web.xyz/api/';
const baseUri = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;

export default baseUri;