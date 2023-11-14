import {http} from "./index";

export default {
    async addBirthday(params: {}) {
        return http<String[]>({
            url: '/api/wx/birthday/add',
            data: params,
            method: 'POST'
        })
    }


}
