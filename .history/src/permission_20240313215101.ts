// this ts for auth
// 动态注册路由

/**
 * 在用户访问非登录页面时强制将其重定向到登录页面，
 * 而对于已经是登录页面的情况则允许用户继续访问当前页面。
 */
import router from './router/index'
import store from './store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import storage from '@pinkbin/storage'

/** 大体思路为，在beforeEach该导航守卫中(即每次路由跳转之前做判断)，如果已经授权过(authorized)，就直接进入next方法，如果没有，则从后端拉取路由表注册到实例中。(直接在入口文件main.js中引入以下文件或代码)*/

router.beforeEach(async (to, from, next) => {
    const token = storage.cookie.get('token')
    NProgress.start()
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            // 没有授权
            if (!store.state.authorized) {
                // set authority
                // 使用了 await 关键字来等待一个异步操作的完成，
                // 该操作是通过 Vuex 的 store 对象调用 dispatch 方法来触发名为 'setAuthority' 的 action。
                await store.dispatch('setAuthority')
                // it's a hack func,avoid bug
                // 通过导航守卫控制路由导航，并将当前导航设置为替换模式，以达到页面重定向或替换当前路由状态的目的。
                next({ ...to, replace: true })
            } else {//已授权
                next()
            }
        }
    } else {
        // Vue Router 导航守卫中常见的逻辑，用于进行路由导航控制。
        // 当前要跳转的路由路径是否为 '/login'，
        if (to.path !== '/login') {
            // 如果不是则执行下面的代码块。
            // 使用 next 方法将路由重定向到 '/login' 路径，即跳转到登录页面。
            next({ path: '/login' })
        } else {
            // 当前要跳转的路由路径已经是 '/login'，则执行下面的代码块。
            // 使用 next 方法继续路由导航，即允许用户访问当前路由，不进行任何重定向或其他操作。
            next(true)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
