import storage from 'good-storage'
import {
    GOOD_DATA
} from './mutations-type'
export default {
    commitGoodData({ commit }, goodData) {
        commit('GOOD_DATA', goodData);
    }
}