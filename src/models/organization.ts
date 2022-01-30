export interface Organization {
    id: number
    name: String
    createdAt: String
    updatedAt: String
}

export const initialOrganization: Organization = {
    id: 0,
    name: '',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}
