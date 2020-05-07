import storage from 'good-storage'
import { UID_KEY } from '@/utils'
import { notify, isDef } from '@/utils'
import { getUserDetail, getUserPlaylist, getUserAll } from "@/api"

export default {
  async login({ commit }, usernme) {
    const error = () => {
      notify.error('登录失败，请输入正确的uid。')
      return false
    }
    
    if (!isDef(username)) {
      return error()
    }

    try {
      const user = await getUserAll(username)
      const { profile } = user
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
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
  }
}
