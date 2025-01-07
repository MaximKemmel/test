export interface ResponseServer<T> {
    result: T[]
    success: boolean
}

export interface ResponseOneServer<T> {
    result: T
    success: boolean
}

export interface Target {
    assistent: string
    beginDate: string
    content: string
    createdAt: string
    demand: number
    endDate: string
    id: number
    image: string
    notyfied: string
    title: string
    userId: number
    value: number
}

export interface News {
    createdAt: string,
    title: string,
    content: string
}

export interface Promo {
    createdAt: string,
    title: string,
    file: string,
    link: string,
    type: 'BANNER' | 'VIDEO' | 'PRESENTATION'
}

export interface Webinars {
    beginAt: string,
    createdAt: string,
    title: string,
    content: string
}

export type Profile = {
    telegramm: string
    avatar: string
}

export interface User {
    currentUser?: {
        id: number,
        userId: number,
        username: string,
        Profile: Profile    }
    profits: {
        profitTotal: number
    }
    userCount: number
}

export interface Last {
    contractUsers: {createdAt: string, profitTotal: number, userId: number}[]
}

export interface UserInfoMatrix {
    activationPeriod: string
    createdAt: string
    id: number
    level: number
    partnersCount: number
    place: number
    profit: number
    profitTotal: number
    referrer: string
    referrerId: number
    user: string
    userId: number
}

export interface UserInfo {
    Profile: Profile,
    ContractUserL5: UserInfoMatrix,
    ContractUserM3: UserInfoMatrix,
    ContractUserM6: UserInfoMatrix,
    ContractUserMM: UserInfoMatrix,
    username: string
    userId: string
}

export interface Static {
    deals: {
        value: number
    }
    deals24: {
        value: number
    }
    partners: number
    partners24: number
    profit24h: {
        value: number
    }
    referrerId: number
    team: number
    team24: number
    userId: number

}

export interface M3Type {
    profits: {level: number, _sum: {value: number}}[]
    activeLevels: boolean[];
    frozenLevels: boolean[];
    levelPrice: number[];
    reinvests: number[];
    id: number
}

export interface M6Type {
    profits: {level: number, _sum: {value: number}}[]
    activeLevels: boolean[];
    frozenLevels: boolean[];
    levelPrice: number[];
    reinvests: number[];
    id: number

}

export interface CycleType {
    users: string
}

export interface Profit {
    profits: {
        profitL5: number
        profitM3: number
        profitM6: number
        profitTotal: number
    }

}

export interface ReferralItem {
    createdAt: string
    id: number
    partnersCount: number
    profits: {profitTotal: number, profitL5: number, profitM3: number, profitM6: number}
    referrerId: number
    team: number
    userId: number
    username: string

}

export interface Partners {
    createdAt: string
    id: number
    partnersCount: number
    partnersCount24: number
    referrals: ReferralItem[]
    referrerId: number
    team: number
    userId: number
    username: string

}

export interface TransactionMatrix {
    caller: number
    currentReferrer: number
    id: number
    level: number
    name: string
    place: number
    receiver: null
    referrer: string
    transactionHash: string
    transactionId: number
    user: string
}

export interface Transaction {
    to: string
    contractName: string
    type: number
    receiver: string | null
    User: {
        userId: number
    }
    profitType: 'DIRECT' | 'MISSED' | 'ADDITIONAL' | 'REINVEST' | 'OVERTAKE' | 'M6UPLINER'
    value: number
    transitValue: number | null
    level: number
    matrix: number
    createdAt: string
    transactionHash: string
}
