import type { IResource, RouteRecordRaw } from '../types'
import dynamicImport from './dynamicImport'

// generate access routes
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
export const generateBtns = (routes: IResource[]): string[] => {
    // 存储权限按钮列表
    const permissionBtns: string[] = []
    const c = (routes: IResource[], cname = '') => {
        routes.forEach((route) => {
            const { type, name, children } = route
            // 如果是按钮类型，则添加到权限按钮列表中
            if (type === 'BUTTON') permissionBtns.push((cname + '-' + name).slice(1))
            if (children && children.length) c(children, cname + '-' + route.name)
        })
    }
    c(routes)
    return permissionBtns
}
