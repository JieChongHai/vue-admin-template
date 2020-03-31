import Cookies from 'js-cookie'

const AccessKey = 'access_token'

export function getToken() {
  return Cookies.get(AccessKey)
}

export function setToken(token) {
  return Cookies.set(AccessKey, token)
}

export function removeToken() {
  return Cookies.remove(AccessKey)
}
