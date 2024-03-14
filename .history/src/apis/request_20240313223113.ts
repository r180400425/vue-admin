// 导入axios库
import axios from 'axios'
// 导入axios相关类型定义
import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
// 导入自定义的HTTP策略
import { HTTP_STRATEGY } from './tactics'
// 导入存储模块
import storage from '@pinkbin/storage'
// 导入Ant Design Vue的消息提示组件
import { message } from 'ant-design-vue'
// 导入配置文件中的基础URL和API Mock配置
import { BASE_URL, API_MOCK } from '/@/config'

/**
 * 一个封装了axios网络请求库的模块，
 * 包含了请求拦截器和响应拦截器，用于处理请求和响应，并定义了一个响应数据结构的接口。注释对每个部分进行了逐行解释，包括导入模块、创建axios实例、拦截器的使用以及接口的定义和导出。
 */


// 创建一个axios实例
const service: AxiosInstance = axios.create({
    // 根据API Mock配置设置基础URL，如果为true则不设置基础URL
    baseURL: API_MOCK ? undefined : BASE_URL
})

// 请求拦截器
service.interceptors.request.use(
    // 成功拦截请求并进行处理
    (request: AxiosRequestConfig) => {
        // 从cookie中获取token
        const token = storage.cookie.get('token')
        // 如果token存在，则将token添加到请求头中
        token && (request.headers.token = token)
        // 如果是POST请求且没有传递body，则设置一个空的body
        const { method, data } = request
        if (method!.toUpperCase() === 'POST' && typeof data === 'undefined') {
            request.data = {}
        }
        return request
    },
    // 请求错误处理
    (error: AxiosError) => {
        const { response } = error
        // 显示错误消息
        message.error({
            content: response?.status
        })
    }
)

// 响应拦截器
service.interceptors.response.use(
    // 成功拦截响应并进行处理
    (response: AxiosResponse) => {
        const { data = {} } = response
        const { message: msg, success } = data
        // 如果响应成功，则返回Promise.resolve(data)
        if (success) {
            return Promise.resolve(data)
        } else {
            // 如果响应失败，则显示错误消息并返回Promise.resolve(null)
            message.error(msg)
            return Promise.resolve(null)
        }
    },
    // 响应错误处理
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response
            // 根据HTTP状态码执行对应的策略
            const strategy = HTTP_STRATEGY.get(status)
            if (typeof strategy === 'function') {
                strategy(error.response)
            }
        }
        return Promise.resolve(null)
    }
)

// 定义接口ResData，用于描述响应数据结构
export interface ResData<T> {
    code: number
    data: T
    success: boolean
}

// 导出默认的axios实例，用于发送网络请求
export default service
