export const openHash = (hash?: string) => {
    if (hash)
        window.open(`https://testnet.bscscan.com/tx/${hash}`, '_blank')
}

export const getImageUrl = (url: string) => {
    return `https://test.100x-booster.io/api/v1/uploads/${url}`
}
