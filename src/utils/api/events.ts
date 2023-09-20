import {http} from "./index";

export default {
    async postEvents(params:{}){
        return http<String[]>({
            url: '/api/home',
            data: params,
            method: 'POST'
        })
    }


}
