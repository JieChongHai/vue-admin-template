import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const AccessKey = 'access_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAccessToken() {
  return Cookies.get(AccessKey)
}

export function setAccessToken(token) {
  return Cookies.set(AccessKey, token)
}

export function removeAccessToken() {
  return Cookies.remove(AccessKey)
}
