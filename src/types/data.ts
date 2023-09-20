import type {UniPopup} from "@uni-helper/uni-ui-types";

/**
 * 请求响应定义
 */
export type Data<T> = {
    code: number
    msg: string
    message: string
    success: boolean
    result: T
}
