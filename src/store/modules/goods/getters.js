import storage from 'good-storage'
import {
    GOOD_DATA
} from './mutations-type'

const getters = {
    getGoodData: state => {
        return state.goodData === undefined ? [] : state.goodData}
}

export default getters