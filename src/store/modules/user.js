import { login } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    tmpRoles: [],
    menus: [],
    intMerCode: '',
    intStoreCode: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TMPROLES: (state, tmpRoles) => {
    state.tmpRoles = tmpRoles
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_INTMERCODE: (state, intMerCode) => {
    state.intMerCode = intMerCode
  },
  SET_INTSTORECODE: (state, intStoreCode) => {
    state.intStoreCode = intStoreCode
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response)
        const { roles, username, data, intMerCode, intStoreCode } = response

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_TMPROLES', roles)
        commit('SET_NAME', username)
        commit('SET_MENUS', data)
        commit('SET_INTMERCODE', intMerCode)
        commit('SET_INTSTORECODE', intStoreCode)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { roles, name, avatar } = data

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // get roles
  getRoles({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_ROLES', state.tmpRoles)
      resolve(state.tmpRoles)
    })
  },
  // get menus
  getMenus({ commit, state }) {
    return new Promise(resolve => {
      resolve(state.menus)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

