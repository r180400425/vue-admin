import request from '../request'

// 查询用户关联的角色
/**
 * 
 * @param userId 这段代码定义了一个名为 getUserRole 的函数，它接收一个 userId 参数，并调用 request.get 方法来获取特定用户的角色信息。具体的请求路径为 userRole/userId/${userId}，其中 ${userId} 是动态的，会被实际的用户ID替换。这段代码使用了模板字符串来构建请求路径。
 * @returns 
 */
export const getUserRole = (userId: string) => request.get(`userRole/userId/${userId}`)

// 修改用户关联的角色
export const updateUserRole = (userId: string, data: string[]) => request.post(`userRole/saveOrUpdate/${userId}`, data)
