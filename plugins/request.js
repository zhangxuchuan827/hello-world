
import axios from 'axios';


export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default ({ store, redirect }) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token)
    config.headers.Authorization = `Token ${user.token}`

    return config
  }, function (error) {
    return Promise.reject(error)
  })

  // 响应拦截器
  request.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break

        case 401:
          error.message = '未授权，请登录'
          return redirect('/login')
          break
  
        case 403:
          error.message = '拒绝访问'
          break
  
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          return redirect('/')
          break
  
        case 408:
          error.message = '请求超时'
          break
  
        case 500:
          error.message = '服务器内部错误'
          break
  
        case 501:
          error.message = '服务未实现'
          break
  
        case 502:
          error.message = '网关错误'
          break
  
        case 503:
          error.message = '服务不可用'
          break
  
        case 504:
          error.message = '网关超时'
          break
  
        case 505:
          error.message = 'HTTP版本不受支持'
          break
  
        default:
      }
    }
    return Promise.reject(error)
  })
}

