import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'
import store from '@/store'
import QS from 'qs'

// const BASE_URL = 'https://api.mtnhao.com/'
// const BASE_URL = 'http://192.168.31.44:3001/'
// const BASE_URL = 'http://192.168.0.103:3001/'
// const BASE_URL = 'http://192.168.10.116:3001'
const BASE_URL = 'http://192.168.1.6:3001'
// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()
// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)
// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleError(e) {
  confirm(e.message, '出错啦~')
  throw e
}

function handleResponse(response) {
  return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
      store.commit(SET_AXIOS_LOADING, true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit(SET_AXIOS_LOADING, false)
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(BASE_URL+url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

const newaxios = axios.create({
  baseURL: BASE_URL
})


newaxios.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'text/plain' // 关键所在
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 关键所在
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)


export function postAction(url,parameter) {
  return newaxios({
    url: url,
    method:'post',
    data: QS.stringify(parameter)
  })
}
