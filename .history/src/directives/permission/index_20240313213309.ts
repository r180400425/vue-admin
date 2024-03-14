// 导入 Vue.js 中的 DirectiveBinding 对象，用于在自定义指令中获取指令的绑定信息
import { DirectiveBinding } from 'vue'
// 导入 Vuex 中的 store 对象，用于获取应用程序的状态信息。
import store from '/@/store'

// 导出一个默认对象，该对象包含一个自定义指令的定义。
export default {
    // 定义自定义指令的名称为 'permission'。
    directiveName: 'permission',
    // 在自定义指令绑定的元素挂载到 DOM 上时执行的钩子函数，
    //参数 el 表示指令所绑定的元素，binding 包含了指令的绑定信息。
    mounted(el: any, binding: DirectiveBinding) {
        // 解构获取指令绑定的实例对象和指令的值。
        const { instance, value } = binding
        // 获取指令所绑定的组件实例的名称。
        const instanceName = instance?.$options.name
        // 根据实例名称和指令的值生成权限名称
        const fullName = instanceName + '-' + value
        // 从 Vuex 的 store 中获取名为 accessBtns 的状态信息，该状态信息包含了用户拥有权限的按钮名称列表。
        const {
            state: { accessBtns }
        } = store
        // 判断当前权限名称是否在用户拥有的权限列表中，
        if (accessBtns.indexOf(fullName) === -1) {
            el.parentNode.removeChild(el)
        }
    }
}
