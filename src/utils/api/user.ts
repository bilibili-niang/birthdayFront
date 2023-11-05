import {http} from "./index";

export default {
    /**
     * 向服务器发起登录
     * @param params
     */
    async login(params: {}) {
        return http<String[]>({
            url: '/api/wx/user/login',
            data: params,
            method: 'POST'
        })
    },
    async loginByToken(params: {}) {
        return http<String[]>({
            url: '/api/wx/user/loginByToken',
            data: params,
            method: 'POST'
        })
    }
}
