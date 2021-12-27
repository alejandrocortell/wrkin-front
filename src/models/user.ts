export interface User {
    id: number
    user: String
    firstName: String
    lastName: String
    birthday: Date
    address: String
    zipcode: String
    city: String
    hoursToWork: number
    createdAt: Date
    updatedAt: Date
    roleId: number
    managerId: number
}

export const initialUser: User = {
    id: 0,
    user: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    address: '',
    zipcode: '',
    city: '',
    hoursToWork: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 0,
    managerId: 0,
}
