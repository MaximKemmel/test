import {create} from "zustand";
import {SERVER_URI} from "@/core-axios";
import {ResponseServer, Webinars} from "@/lib/interfaces";

interface WebinarsState {
    webinars: Webinars[]
    addNew: (targets: FormData) => Promise<boolean>
    getWebinars: () => Promise<ResponseServer<Webinars>>
}

const useWebinarsStore = create<WebinarsState>((set, get) => ({
    webinars: [],
    async addNew(targets: FormData) {
        const response = await fetch(SERVER_URI('users/goals'), {method: 'POST',
            headers: {
                Accept: 'multipart/form-data'
            }, body: targets})

        const data = await response.json()

        return true
    },
    async getWebinars() {
            const response = await fetch(SERVER_URI('webinars/?page=1&count=20'), {
                cache: 'force-cache'
            })

            const data = await response.json() as ResponseServer<Webinars>

            set({webinars: data.result})

            return data
    }
}))


export default useWebinarsStore
