<template>
    <div>
        <!-- lv-table 组件，用于展示角色管理相关信息 -->
        <lv-table ref="tableRef" title="角色管理" :columns="columns" :terms="terms" :action="action" @create="handle()">
            <!-- 自定义操作列模板 -->
            <template #operation="{ record }">
                <!-- 编辑按钮 -->
                <a-button type="link" size="small" @click="handle(record.id)">编辑</a-button>
                <!-- 设置菜单按钮 -->
                <a-button type="link" size="small" @click="setResource(record.id)">设置菜单</a-button>
                <!-- 删除按钮 -->
                <a-button type="link" size="small" @click="remove(record.id)">删除</a-button>
            </template>
        </lv-table>

        <!-- lv-modal-form 组件，用于编辑用户信息 -->
        <lv-modal-form v-model:form="form" v-model:visible="visible" :schemas="schemas" title="用户信息" :rules="rules" :column="1" @submit="submit" />

        <!-- Ant Design Vue 的模态框组件，用于设置角色菜单权限 -->
        <a-modal v-model:visible="resource.visible" title="资源设置" destroy-on-close @ok="submitRole">
            <!-- Ant Design Vue 的树形组件，用于展示菜单树并设置角色的菜单权限 -->
            <a-tree v-model:checkedKeys="resource.checkedKeys" :replace-fields="replaceFields" checkable :tree-data="resource.data" @check="onCheck"> </a-tree>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import type { Ref } from 'vue'
import useCRUD from '/@/hooks/useCRUD'
// fetchRolePage: 用于获取角色信息列表的函数，通过调用后端接口获取角色管理页面需要展示的角色信息列表数据。
// getRoleMenu: 用于获取角色菜单权限的函数，通过调用后端接口获取指定角色的菜单权限数据。
import { fetchRolePage, updateRole, createRole, getRole, removeRole } from '/@/apis/modules/role'
// getMenuTree: 用于获取菜单树的函数，通过调用后端接口获取系统中的菜单树数据。
import { getMenuTree } from '/@/apis/modules/menu'
import { updateRoleMenu, getRoleMenu } from '/@/apis/modules/roleMenu'

export default defineComponent({
    name: 'system-role',
    setup() {
        // 表格列配置
        const columns = [
            { title: '角色名称', dataIndex: 'roleName', width: '40%' },
            { title: '角色描述', dataIndex: 'note' },
            { title: '操作', width: '200px', slots: { customRender: 'operation' } }
        ]
        // 表格引用
        const tableRef = ref<Nullable<Ref>>(null)
        // 表格查询条件配置
        const terms = [{ key: 'roleName', label: '角色名称', component: 'Input' }]
        // 模态框表单状态管理
        const modelForm = reactive({
            visible: false,
            loading: false,
            rules: {
                roleName: { required: true, type: 'string', message: '请输入角色名称', trigger: 'blur' }
            },
            form: {}
        })
        // 使用 useCRUD 自定义 Hook 管理表格数据的增删改查操作
        const crud = useCRUD(
            modelForm,
            {
                C: createRole,
                R: getRole,
                U: updateRole,
                D: removeRole
            },
            tableRef
        )

        // 表单字段配置
        const schemas = ref([
            { key: 'roleName', label: '角色名称', component: 'Input' },
            { key: 'note', label: '角色描述', component: 'InputTextArea' }
        ])

        // 页面加载时获取所有菜单树
        onMounted(() => {
            getAllMenu()
        })

        // 角色菜单设置相关状态
        const resource = reactive<any>({
            id: null,
            visible: false,
            data: [],
            checkedKeys: []
        })
        // 树形组件字段配置
        const replaceFields = {
            key: 'id'
        }

        // 获取所有菜单树
        const getAllMenu = async () => {
            const res = await getMenuTree()
            resource.data = res ? res.data : []
        }

        // 设置角色的菜单权限
        const setResource = async (id: string) => {
            resource.id = id
            resource.visible = true
            const res = await getRoleMenu(id)
            const keys = res ? res.data.map((v: any) => v.resourceId) : []
            resource.checkedKeys = keys
        }

        // 提交角色菜单设置
        const submitRole = async () => {
            const res = await updateRoleMenu(resource.id, resource.checkedKeys)
            if (!res) return
            resource.visible = false
        }

        // 处理树形菜单的选中事件
        const onCheck = (checkedKeys: any[]) => {
            resource.checkedKeys = checkedKeys
        }

        // 将响应式对象转换为普通对象，并导出需要的属性和方法
        return {
            ...toRefs(modelForm),
            ...crud,
            schemas,
            columns,
            terms,
            tableRef,
            action: fetchRolePage,
            resource,
            setResource,
            replaceFields,
            onCheck,
            submitRole
        }
    }
})
</script>
