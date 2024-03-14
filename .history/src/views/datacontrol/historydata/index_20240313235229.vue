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