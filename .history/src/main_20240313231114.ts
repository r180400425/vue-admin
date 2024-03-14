// 导入 Vue 的 createApp 方法
import { createApp } from 'vue'
// 导入根组件 App
import App from './App'
// 导入路由配置文件
import router from './router'
// 导入状态管理 store
import store from './store'
// 导入自定义指令集合
import directives from './directives'
// 导入全局组件注册函数
import { registerGC } from './components'

// mock 导入模拟数据
import './mock'

// auth  导入权限控制相关逻辑
import './permission'

// global less  导入全局样式文件
import '/@/styles/index.less'

// create vue app
const app = createApp(App)
app.config.globalProperties.appName = 'Levi'

// register global components
registerGC(app)

// register directives
app.use(directives)

// mount
app.use(router).use(store).mount('#app')
