import storage from 'good-storage'
import {
    GOOD_DATA
} from './mutations-type'

export default {
    setGoodData(state, goodData) {
        if (state.goodData.length === 0) {
            state.goodData.push(goodData);
            storage.set(GOOD_DATA, state.goodData);
        } else {
            for (let i in state.goodData) {
                if (state.goodData[i].id === goodData.id) {
                    state.goodData[i].goodsNum += goodData.goodsNum;
                    storage.set(GOOD_DATA, state.goodData);
                }
            }
        }

    }
}