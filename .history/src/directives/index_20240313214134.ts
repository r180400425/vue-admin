// 导入 Vue.js 的 App 类型，用于类型检查。
import type { App } from 'vue'
// 导入名为 permission 的对象或函数，通常是一个 Vue.js 自定义指令的实现。
import permission from './permission'

// export default { ... }: 导出一个默认对象，该对象包含一个 install 方法。
export default {
    install(app: App) {
        app.directive('permission', permission)
    }
}
