import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {SERVER_URI} from "@/core-axios";
import {SiweMessage} from "siwe";
import {WalletInstance} from "@thirdweb-dev/react";
import {
    CycleType,
    Last,
    M3Type, M6Type,
    Partners,
    Profile,
    Profit, ResponseOneServer,
    ResponseServer,
    Static,
    Transaction,
    User,
    UserInfo
} from "@/lib/interfaces";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calcPercentage(x: number, y: number) {
    const result = (x / y) * 100

    if (result > 99) {
        return 100
    }

    if (result < 0) {
        return 0
    }

    return result;
}

export async function loginApi(address: string, wallet: WalletInstance) {

    const challenge = await fetch(SERVER_URI('login/ethereum/challenge'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'include',
    })

    const challengeResp = await challenge.json()

    const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: challengeResp.nonce,
    });

    const m = message.prepareMessage();
    const signature = await wallet?.signMessage(m)

    return await fetch(SERVER_URI('login/ethereum'), {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({message: m, signature: signature}),
    })
}


export async function check() {

    const userInfo = await fetch(SERVER_URI('users/info'), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })

    const body: { result: User, success: boolean } = await userInfo.json()

    return body

}

export async function getLast() {

    const userInfo = await fetch(SERVER_URI('users/last'), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })

    const body: { result: Last, success: boolean } = await userInfo.json()

    return body

}

export async function getLast50() {

    const userInfo = await fetch(SERVER_URI('users'), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })

    const body: {
        result: {
            value: number,
            User: {
                userId: number
            }
        }[], success: boolean
    } = await userInfo.json()

    return body

}

export async function updateProfile(formData: FormData): Promise<ResponseOneServer<Profile>> {

    const response = await fetch(SERVER_URI('users/profile'), {
        headers: {
            Accept: 'multipart/form-data'
        }, method: 'POST',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
        body: formData
    })

    const data = await response.json()

    return data

}

export async function getUserByAddress(address: string) {

    const userInfo = await fetch(SERVER_URI(`users/${address}`), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })

    const body: { result: UserInfo, success: boolean } = await userInfo.json()

    return body

}

export async function getUserById(id: string) {

    const userInfo = await fetch(SERVER_URI(`user/userbyid/${id}`), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })

    const body: { result: UserInfo, success: boolean } = await userInfo.json()

    return body

}

export async function getUserInfo(address: string) {

    const userInfo = await fetch(SERVER_URI(`users/${address}`), {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })

    const body: { result: UserInfo, success: boolean } = await userInfo.json()

    return body

}

export async function getStatics(address: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: Static, success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getM3(address: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/m3/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: M3Type, success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}


export async function getCycleMatrix(cycle: string, matrix: string, level: string, userId: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/cycle/${matrix}/${level}/${cycle}/${userId}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: {userId: number, place: number}[], success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getCycleMatrixM6(cycle: string, matrix: string, level: string, userId: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/cycle/${matrix}/${level}/${cycle}/${userId}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: {userId: number, place: number}[], success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}


export async function getL5(address: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/l5/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: M3Type, success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getM6(address: string) {

    try {
        const statics = await fetch(SERVER_URI(`dashboard/m6/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: M6Type, success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getProfit(address?: string) {

    try {
        const profits = await fetch(SERVER_URI(`users/profits/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'include',
        })

        const body: { result: Profit, success: boolean } = await profits.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getPartners(address?: string) {

    try {
        const partners = await fetch(SERVER_URI(`dashboard/partners/${address}`), {
            headers: {
                Accept: 'application/json',
            },
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'include',
        })

        const body: { user: Partners, success: boolean } = await partners.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getPartnersForL5(page: number = 1, count: number = 50, address?: string, level?: string) {

    try {
        const partners = await fetch(SERVER_URI(`dashboard/partners/${address}?level=${level}&page=${page}&count=${count}`), {
            headers: {
                Accept: 'application/json',
            },
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'include',
        })

        const body: { user: Partners, success: boolean } = await partners.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function getTransactionsDashboard(address: string, contract: number | null, count: number) {

    try {

        let contractType

        switch (contract) {
            case 1: {
                contractType = 1
                break;
            }
            case 2: {
                contractType = 2
                break;
            }
            case 3: {
                contractType = 3
                break;
            }
            default: {
                contractType = 0
                break;
            }
        }

        const statics = await fetch(SERVER_URI(`tx/${address}/${contractType}?page=1&count=${count}`), {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        const body: { result: Transaction[], success: boolean } = await statics.json()

        return body
    } catch (e) {
        console.log(e)
    }

}

export async function logout() {

    return await fetch(SERVER_URI('logout'), {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
    })


}
