const saveDataLocal = (key = '', data) => {
    key && localStorage.setItem(key, JSON.stringify(data))
    return;
}

const getDataLocal = (key = '') => {
    if (key) return JSON.parse(localStorage.getItem(key));
    return ''
}

export { saveDataLocal, getDataLocal }