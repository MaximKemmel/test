import {getUserById} from "@/lib/api";

export const CycleTransform = async (cycle: number[]) => {
    let address: string[] = []

    if (cycle && cycle?.length) {

        for (let i = 0; i < cycle?.length; i++) {

            // @ts-ignore
            const value = cycle[i]

            const server = await getUserById(String(value))

            if (server.result) {
                address.push(server.result.username)
            }
        }
    }

    return address
}