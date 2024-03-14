// this ts for auth
// 动态注册路由

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
                // 使用了 await 关键字来等待一个异步操作的完成，该操作是通过 Vuex 的 store 对象调用 dispatch 方法来触发名为 'setAuthority' 的 action。
                await store.dispatch('setAuthority')
                // it's a hack func,avoid bug
                next({ ...to, replace: true })
            } else {//已授权
                next()
            }
        }
    } else {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next(true)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
