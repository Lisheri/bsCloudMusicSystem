import { requestWithoutLoading, postAction, request } from '@/utils'

export const getUserDetail = (uid) => requestWithoutLoading.get("/user/detail", { params: { uid } })

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get("/user/playlist", { params: { uid, limit: PLAYLIST_LIMIT } })

export const postRegister = (params) => postAction('/user/register', params);
export const getUserAll = (params) => request.get('/user/all', {params: {username: params}});