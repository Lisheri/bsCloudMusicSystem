import storage from 'good-storage'
import { UID_KEY } from '@/utils'
import { notify, isDef } from '@/utils'
import { getUserDetail, getUserPlaylist, getUserAll } from "@/api"

export default {
  async login({ commit }, username) {
    const error = () => {
      notify.error('登录失败，请输入正确的uid。')
      return false
    }
    
    if (!isDef(username)) {
      return error()
    }

    try {
      const user = await getUserAll(username)
      commit('setUser', user)
      storage.set(UID_KEY, user.userId)
      storage.set("_username_", user.username)
    } catch (e) {
      return error()
    }

    // const { playlist } = await getUserPlaylist(uid)
    // commit('setUserPlaylist', playlist)
    return true
  },
  logout({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set(UID_KEY, null)
    storage.set("_username_", null)
  }
}
