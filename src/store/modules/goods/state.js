import storage from 'good-storage'
import {
    GOOD_DATA
} from './mutations-type'


export default {
    goodData: storage.get(GOOD_DATA) || [],
}