import { request, post, postAction } from '@/utils'

import axios from 'axios'

export const getShopBanner = () => request.get('/goodBanner?type=1');

export const getEditorChoices = () => request.get('/editor/all');

export const getHotGoods = () => request.get('/hotgood/all');

export const getGoodDec = (id) => request.get(`/goodDec/` + id);

export const getIpGoods = () => request.get('/ipGood/all');

export const getShopCartAll = () => request.get('/shopCart/all');

// export const postGoodNum = (num) => request.post('/shopCart/Num', {num: num});
export const postGoodNum = (params) => postAction('/shopCart/saveNum', params);

export const postSaveGoodInCart = (params) => postAction('/shopCart/inCart', params);

export const postDeleteGoodAtCart = (params) => postAction('/shopCart/deleteGood', params);