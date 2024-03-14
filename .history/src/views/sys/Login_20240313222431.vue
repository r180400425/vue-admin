<template>
    <!-- 登录页面模板开始 -->
    <div class="levi-login">
        <!-- 登录页面整体容器 -->
        <div class="levi-login__header">
            <!-- 登录页面头部 -->
            <img class="logo" src="../../assets/images/logo.png" />
            <!-- logo图片 -->
            <h1 class="title">Welcome to EMS</h1>
            <!-- 欢迎标题 -->
        </div>
        <div class="levi-login__body">
            <!-- 登录页面主体 -->
            <div class="login-box">
                <!-- 登录框容器 -->
                <a-page-header :ghost="false" title="Welcome to EMS">
                    <!-- 页面头部 -->
                    <a-form layout="vertical" :model="model" @submit.prevent="handleLogin">
                        <!-- 表单组件 -->
                        <a-form-item>
                            <!-- 表单项 -->
                            <a-input v-model:value="model.username" placeholder="username">
                                <!-- 用户名输入框 -->
                                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                                <!-- 用户名输入框前缀图标 -->
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <!-- 表单项 -->
                            <a-input v-model:value="model.password" type="password" placeholder="password">
                                <!-- 密码输入框 -->
                                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                                <!-- 密码输入框前缀图标 -->
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <!-- 表单项 -->
                            <a-button class="submit" type="primary" html-type="submit"> Login </a-button>
                            <!-- 登录按钮 -->
                        </a-form-item>
                    </a-form>
                </a-page-header>
            </div>
        </div>
        <div class="levi-login__footer">
            <!-- 登录页面底部 -->
            <img class="logo" src="../../assets/images/logo.png" />
            <!-- logo图片 -->
            <p class="copyright">@copyright levi technology</p>
            <!-- 版权信息 -->
        </div>
    </div>
    <!-- 登录页面模板结束 -->
</template>

<script lang="ts">
// TypeScript脚本部分
//  导入Vue 3的相关模块，包括定义组件的方法和响应式数据相关的模块。
import { defineComponent, reactive, ref } from 'vue'
// 导入存储相关的模块，可能用于存储用户登录信息等。
import storage from '@pinkbin/storage'
// 导入路由模块，用于页面跳转等功能。
import router from '/@/router/index'
//  导入Ant Design Vue的图标组件，用于页面图标展示。
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
// 导入登录接口相关的模块，可能用于处理用户登录请求。
import { login } from '/@/apis/modules/login'

export default defineComponent({
    // 导出组件定义

    // 注册组件所需的子组件，包括用户图标和锁图标。
    components: {
        UserOutlined,
        LockOutlined
    },
    // 使用Vue 3的setup函数进行组件的初始化和逻辑处理。
    setup() {
        // 组件逻辑部分
        const model = reactive({//使用reactive创建响应式数据模型，包括用户名和密码的初始值。
            // 响应式数据模型
            username: 'levi',
            password: '123456'
        })
        // 定义处理登录事件的异步函数，包括获取用户名和密码、调用登录接口、处理登录结果、设置token并跳转页面等逻辑。
        const handleLogin = async () => {
            // 处理登录事件
            // 解构赋值语法，从对象 model 中提取 username 和 password 字段，并将它们分别赋值给对应的变量 username 和 password。
            const { username, password } = model
            const res = await login({
                username,
                password
            })
            if (!res) return
            storage.cookie.set('token', res.data.token)
            router.push('/')
        }
        // 使用ref创建一个响应式数据，可能用于表单项的数据处理等。
        const schemas = ref([{ key: 'username', component: 'Input' }])
        return {
            // 返回组件需要的数据和方法
            // 包括响应式数据模型model、处理登录事件的方法handleLogin和表单项数据schemas。
            model,
            handleLogin,
            schemas
        }
    }
})
</script>

<style lang="less" scoped>
/* 样式部分 */
.levi-login {
    /* 登录页面整体样式 */
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* 垂直方向布局 */
    &__header {
        /* 登录页面头部样式 */
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        /* 左右边距 */
        .logo {
            /* logo样式 */
            margin-right: 2vw;
            height: 2.2vw;
            /* 图片高度 */
        }
        .title {
            /* 标题样式 */
            font-weight: normal;
            margin: 0;
            font-size: 3vmin;
            color: #2d2d2d;
            /* 字体颜色 */
        }
    }
    &__body {
        /* 登录页面主体样式 */
        flex: 8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        /* 右对齐 */
        background: url('../../assets/images/bg.png') no-repeat center;
        background-size: 100% 100%;
        /* 背景图片样式 */
        .login-box {
            /* 登录框样式 */
            background-color: #fff;
            margin-right: 10vw;
            padding: 2vh 1.2vw;
            border-radius: 0.5vh 0.5vw;
            /* 边框圆角 */
        }
        .submit {
            /* 提交按钮样式 */
            width: 100%;
            height: 36px;
        }
    }
    &__footer {
        /* 登录页面底部样式 */
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        /* 居中对齐 */
        .logo {
            /* logo样式 */
            margin-right: 2vw;
            height: 2.2vw;
            /* 图片高度 */
        }
        .copyright {
            /* 版权信息样式 */
            margin: 0;
            font-size: 2vmin;
            color: #2d2d2d;
            /* 字体颜色 */
        }
    }
}
</style>
