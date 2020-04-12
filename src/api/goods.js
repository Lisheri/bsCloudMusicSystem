import { request } from '@/utils'

export const getShopBanner = () => request.get('/goodBanner?type=1');

export const getEditorChoices = () => request.get('/editor/all');

export const getHotGoods = () => request.get('/hotgood/all');