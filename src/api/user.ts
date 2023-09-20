import {http} from "@/api/index";

export default {
    async home(params: {}) {
        return http<String[]>({
            url: '/api/home',
            data: params,
            method: 'POST'
        })
    },

    async aboutTags(params: any) {
        return http<String[]>({
            url: '/api/tag/aboutTag',
            method: 'POST',
            data: params
        })
    },

    // 登录
    async login(params: any) {
        return http({
            url: '/wx/login',
            method: 'POST',
            data: params
        })
    }

}
