// 导入一个名为 request 的模块或对象，用于发送网络请求，可能是一个封装了axios或者其他网络请求库的对象。
import request from '../request'

// 定义了一个接口 LoginModel，用于描述登录所需的数据模型，包括用户名和密码，都是字符串类型。
interface LoginModel {
    username: string
    password: string
}

导出了一个名为 login 的函数，该函数接受一个参数 data，类型为 LoginModel，即包含用户名和密码的对象。在函数体内部，它调用了 request 对象的 post 方法发送了一个 POST 请求到路径 'login'，并将 data 对象作为请求的数据体发送给服务器。
export const login = (data: LoginModel) => request.post('login', data)
