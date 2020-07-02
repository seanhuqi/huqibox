/**
 * 封装对本地存储的操作
 */
export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    },
};