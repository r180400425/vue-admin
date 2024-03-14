<template>
    <div>
      <!-- lv-table 组件，用于展示历史数据相关信息 -->
      <lv-table ref="tableRef" title="历史数据展示" :columns="columns" :terms="terms" :action="action" @create="handle()">
        <!-- 自定义操作列模板 -->
        <template #operation="{ record }">
          <!-- 编辑按钮 -->
          <a-button type="link" size="small" @click="editRecord(record.id)">编辑</a-button>
          <!-- 删除按钮 -->
          <a-button type="link" size="small" @click="deleteRecord(record.id)">删除</a-button>
        </template>
      </lv-table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import type { Ref } from 'vue'
  import useCRUD from '/@/hooks/useCRUD'
//   这里需要导入对应的 API 函数，用于获取历史数据和操作历史数据等功能
  import { fetchHistoryData, updateHistoryData, deleteHistoryData } from '/@/apis/modules/historyData'
  
  export default defineComponent({
    name: 'HistoryData',
    setup() {
      // 表格列配置
      const columns = [
        { title: '属性1', dataIndex: 'property1' },
        { title: '属性2', dataIndex: 'property2' },
        { title: '操作', width: '200px', slots: { customRender: 'operation' } }
      ]
      // 表格引用
      const tableRef = ref<Nullable<Ref>>(null)
      // 表格查询条件配置
      const terms = [{ key: 'filterKey', label: '筛选条件', component: 'Input' }]
      // 使用 useCRUD 自定义 Hook 管理表格数据的增删改查操作
      const crud = useCRUD(
        {},
        {
          C: createHistoryData,
          R: fetchHistoryData,
          U: updateHistoryData,
          D: deleteHistoryData
        },
        tableRef
      )
  
      // 创建历史数据
      const createHistoryData = async (data: any) => {
        // 调用对应的 API 函数进行创建操作
        const res = await createHistoryData(data)
        if (res) {
          tableRef.value && tableRef.value.reload()
        }
      }
  
      // 编辑历史数据
      const editRecord = async (id: string) => {
        // 跳转到编辑页面或者弹出编辑模态框，具体根据需求而定
      }
  
      // 删除历史数据
      const deleteRecord = async (id: string) => {
        // 调用对应的 API 函数进行删除操作
        const res = await deleteHistoryData(id)
        if (res) {
          tableRef.value && tableRef.value.reload()
        }
      }
  
      // 将响应式对象转换为普通对象，并导出需要的属性和方法
      return {
        ...crud,
        columns,
        terms,
        tableRef,
        action: fetchHistoryData,
        editRecord,
        deleteRecord
      }
    }
  })
  </script>
  