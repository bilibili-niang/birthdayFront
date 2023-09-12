// api请求
import type {Data} from "@/types/requestData";
// @ts-ignore
import {useMemberStore} from '@/store/index'
import user from "@/api/user";

// 微信小程序代理地址
// baseUrl
export const baseUrl: String = `http://localhost:89`;


export const http = <T>(options: UniApp.RequestOptions) => {
    // TODO 微信小程序开发把下面的配置打开
    // @ts-ignore
    options.url = options.url.replace('/api', baseUrl)

    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 只代表响应成功,并没有判断状态码
            success: (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data as Data<T>)
                } else if (res.statusCode === 401) {
                    // 401错误,清理用户信息,重定向到登录
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({url: '/pages/login/index'})
                    reject(res)
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).message || '请求错误'
                    })
                    reject(res)
                }
            },
            fail: (err) => {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误,换个网络试试'
                })
                reject(err)
            }
        })
    })
}

const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        options.header = {
            ...options.header,
        }
        // 添加token:
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            options.header.Authorization = token
        }
        // 请求超时,默认60s
        options.timeout = 60000;
    }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export default {
    baseUrl,
    ...user
}
