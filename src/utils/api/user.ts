import {http} from "./index";

export default {
    /**
     * 向服务器发起登录
     * @param params
     */
    async login(params: {}) {
        return http<String[]>({
            url: '/api/user/miniLogin',
            data: params,
            method: 'POST'
        })
    }
}
