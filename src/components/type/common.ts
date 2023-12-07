// 从后端返回的数据格式
export type resType = {
    success?: boolean,
    message?: string,
    result?: object,
    code?: number
}
export type friendDetailInfo = {
    id?: number;
    friendId?: string;
    userId?: string;
    name?: string;
    avatar?: string;
    weichatId?: any;
    sex?: string;
    classify?: any;
    animalSign?: any;
    level?: any;
    relationship?: any;
    remarks?: any;
    remindType?: any;
    remindFrequency?: any;
    lYear?: string;
    lMonth?: string;
    lDay?: string;
    Animal?: string;
    IMonthCn?: string;
    IDayCn?: string;
    cYear?: string;
    cMonth?: string;
    cDay?: string;
    gzYear?: string;
    gzMonth?: string;
    gzDay?: string;
    astro?: string;
    createdAt?: string;
    updatedAt?: string;
}

