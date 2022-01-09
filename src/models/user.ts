export interface User {
    id: number
    user: String
    firstName: String
    lastName: String
    birthday: String
    address: String
    zipcode: String
    city: String
    hoursToWork: number
    createdAt: String
    updatedAt: String
    roleId: number
    managerId: number
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
}
