export type User = {
    id: string
    email: string
    name: string
    affilation: string
    downloadCount: number
    maxDownloadCount: number
    validFrom: number
    validTo: number
    isActive?: boolean
    isAdmin?: boolean
};
