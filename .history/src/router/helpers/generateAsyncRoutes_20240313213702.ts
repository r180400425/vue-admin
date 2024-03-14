import type { IResource, RouteRecordRaw } from '../types'
import dynamicImport from './dynamicImport'

// generate access routes
一个用于生成访问路由的函数，根据传入的路由信息生成对应的路由配置数组。
export const generateRoutes = (routes: IResource[], cname = '', level = 1): RouteRecordRaw[] => {
    return routes.reduce((prev: RouteRecordRaw[], curr: IResource) => {
        // if this is menu, register it
        const { id, type, path, component, name, title, icon, redirect, hidden, fullscreen, noCache, children } = curr
        if (type === 'MENU') {
            // if there is no children in level 1 menu, register it to app route
            if (level === 1 && !(children && children.length)) {
                prev.push({
                    path,
                    component: dynamicImport(component!)!,
                    name,
                    props: true,
                    meta: { id, title, icon, type, parentName: 'app', hidden: !!hidden, fullscreen: !!fullscreen, noCache: !!noCache }
                })
            } else {
                prev.push({
                    path,
                    component: component ? dynamicImport(component!)! : () => import('/@/layouts/dashboard'),
                    name: (cname + '-' + name).slice(1),
                    props: true,
                    redirect,
                    meta: { id, title, icon, type, hidden: !!hidden, fullscreen: !!fullscreen, noCache: !!noCache },
                    children: children?.length ? generateRoutes(children, cname + '-' + name, level + 1) : []
                })
            }
        }
        return prev
    }, [])
}

// generate access btns
// 生成访问按钮列表
// 一个生成访问按钮列表的函数，根据传入的路由信息生成对应的权限按钮列表。主要通过递归处理路由树来实现。
export const generateBtns = (routes: IResource[]): string[] => {
    // 存储权限按钮列表
    const permissionBtns: string[] = []
    // 定义了一个名为 c 的箭头函数，接受两个参数：routes 和 cname，
    const c = (routes: IResource[], cname = '') => {
        routes.forEach((route) => {
            const { type, name, children } = route
            // 如果是按钮类型，则添加到权限按钮列表中
            if (type === 'BUTTON') permissionBtns.push((cname + '-' + name).slice(1))
            // 递归处理子路由
            if (children && children.length) c(children, cname + '-' + route.name)
        })
    }
    // 调用递归函数开始处理路由
    c(routes)
    // 返回生成的权限按钮列表
    return permissionBtns
}
