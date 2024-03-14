// 导入一个名为 request 的模块或对象，用于发送网络请求，可能是一个封装了axios或者其他网络请求库的对象。
import request from '../request'

// 定义了一个接口 LoginModel，用于描述登录所需的数据模型，包括用户名和密码，都是字符串类型。
interface LoginModel {
    username: string
    password: string
}

export const login = (data: LoginModel) => request.post('login', data)
