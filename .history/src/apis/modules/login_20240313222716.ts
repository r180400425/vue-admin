// 导入一个名为 request 的模块或对象，用于发送网络请求，可能是一个封装了axios或者其他网络请求库的对象。
import request from '../request'

interface LoginModel {
    username: string
    password: string
}

export const login = (data: LoginModel) => request.post('login', data)
