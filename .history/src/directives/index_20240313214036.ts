// 导入 Vue.js 的 App 类型，用于类型检查。
import type { App } from 'vue'
import permission from './permission'

export default {
    install(app: App) {
        app.directive('permission', permission)
    }
}
