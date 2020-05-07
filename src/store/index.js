import Vue from 'vue'
import Vuex from 'vuex'
import musicModule from './modules/music'
import userModule from './modules/user'
import globalModule from './modules/global'
import createLogger from 'vuex/dist/logger'
import goodsModule from './modules/goods'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    music: musicModule,
    user: userModule,
    global: globalModule,
    goods: goodsModule
  },
  plugins: debug ? [createLogger()] : []
})
