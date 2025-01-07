import {create} from "zustand";
import {SERVER_URI} from "@/core-axios";
import {ResponseServer, News} from "@/lib/interfaces";

interface NewsState {
    news: News[]
    addNew: (targets: FormData) => Promise<boolean>
    getNews: () => Promise<ResponseServer<News>>
}

const useNewStore = create<NewsState>((set, get) => ({
    news: [],
    async addNew(targets: FormData) {
        const response = await fetch(SERVER_URI('users/goals'), {method: 'POST',
            headers: {
                Accept: 'multipart/form-data'
            }, body: targets})

        const data = await response.json()

        return true
    },
    async getNews() {
            const response = await fetch(SERVER_URI('news/?page=1&count=20'), {
                cache: 'force-cache'
            })

            const data = await response.json() as ResponseServer<News>

            set({news: data.result})

            return data
    }
}))


export default useNewStore
