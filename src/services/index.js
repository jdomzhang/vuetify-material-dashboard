import fetch from './fetch'

export const sayHello = async () => fetch(`/api/v1/hello`)

export const loginAdmin = async (mobile, password) => fetch(`/api/v1/admin/users/login`, {mobile, password}, 'POST')
