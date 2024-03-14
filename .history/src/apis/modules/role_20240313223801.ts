import request from '../request'
// 新增
export const createRole = (data: any) => request.post('role/save', data)
// 删除
export const removeRole = (id: string) => request.delete(`role/${id}`)
// 更新
export const updateRole = (data: any) => request.put('role/update', data)
// 查询
export const getRole = (id: string) => request.get(`role/${id}`)
// 列表查询
export const fetchRoleList = (data: any) => request.post('role/list', data)
// 分页查询
// 定义了一个名为 fetchRolePage 的函数，用于向服务器发送获取角色分页数据的请求。
// 导出了一个名为 fetchRolePage 的函数，可以在其他文件中引入并使用。
// (data?: any) => : 函数接受一个可选的参数 data，类型为任意类型（any），表示请求所需的数据。
export const fetchRolePage = (data?: any) => request.post('role/page', data)
// 唯一性校验
export const checkRole = (data: any) => request.post('role/unique', data)
