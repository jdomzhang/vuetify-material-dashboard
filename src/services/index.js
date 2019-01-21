import fetch from './fetch'

export const sayHello = async () => fetch(`/api/v1/hello`)
