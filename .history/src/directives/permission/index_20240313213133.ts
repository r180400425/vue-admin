// 导入 Vue.js 中的 DirectiveBinding 对象，用于在自定义指令中获取指令的绑定信息
import { DirectiveBinding } from 'vue'
// 导入 Vuex 中的 store 对象，用于获取应用程序的状态信息。
import store from '/@/store'

// 导出一个默认对象，该对象包含一个自定义指令的定义。
export default {
    // 定义自定义指令的名称为 'permission'。
    directiveName: 'permission',
    // 在自定义指令绑定的元素挂载到 DOM 上时执行的钩子函数，参数 el 表示指令所绑定的元素，binding 包含了指令的绑定信息。
    mounted(el: any, binding: DirectiveBinding) {
        const { instance, value } = binding
        const instanceName = instance?.$options.name
        const fullName = instanceName + '-' + value
        const {
            state: { accessBtns }
        } = store
        if (accessBtns.indexOf(fullName) === -1) {
            el.parentNode.removeChild(el)
        }
    }
}
