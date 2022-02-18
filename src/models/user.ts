export interface User {
    id: number
    user: string
    firstName: string
    lastName: string
    birthday: string
    address: string
    zipcode: string
    city: string
    hoursToWork: number
    createdAt: string
    updatedAt: string
    roleId: number
    managerId: number
    organizations: Array<any>
    currentOrganization: number
}

export const initialUser: User = {
    id: 0,
    user: '',
    firstName: '',
    lastName: '',
    birthday: new Date().toDateString(),
    address: '',
    zipcode: '',
    city: '',
    hoursToWork: 0,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    roleId: 0,
    managerId: 0,
    organizations: [],
    currentOrganization: 0,
}
