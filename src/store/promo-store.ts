import {create} from "zustand";
import {SERVER_URI} from "@/core-axios";
import {ResponseServer, Promo} from "@/lib/interfaces";

interface PromosState {
    promos: Promo[]
    addPromo: (targets: FormData) => Promise<boolean>
    getPromos: () => Promise<ResponseServer<Promo>>
}

const usePromoStore = create<PromosState>((set, get) => ({
    promos: [],
    async addPromo(targets: FormData) {
        const response = await fetch(SERVER_URI('advert'), {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'multipart/form-data'
            }, body: targets})

        const data = await response.json()

        return true
    },
    async getPromos() {
            const response = await fetch(SERVER_URI('advert/?page=1&count=20'), {
                cache: 'force-cache',
                mode: 'cors',
                credentials: 'include',
            })

            const data = await response.json() as ResponseServer<Promo>

            set({promos: data.result})

            return data
    }
}))


export default usePromoStore
