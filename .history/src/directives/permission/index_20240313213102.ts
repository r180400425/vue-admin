// 导入 Vue.js 中的 DirectiveBinding 对象，用于在自定义指令中获取指令的绑定信息
import { DirectiveBinding } from 'vue'
// 导入 Vuex 中的 store 对象，用于获取应用程序的状态信息。
import store from '/@/store'

export default {
    directiveName: 'permission',
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
