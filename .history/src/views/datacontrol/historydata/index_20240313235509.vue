<template>
    <div class="history-data">
      <h1>历史数据展示页面</h1>
      <!-- 展示历史数据的列表 -->
      <ul>
        <!-- 使用 v-for 循环展示历史数据项 -->
        <li v-for="(data, index) in historyData" :key="index">
          <!-- 显示历史数据内容 -->
          {{ data }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HistoryData',
    data() {
      return {
        // 历史数据数组
        historyData: [
          { id: 1, value: '数据1', timestamp: '2024-03-12 08:00:00' },
          { id: 2, value: '数据2', timestamp: '2024-03-12 09:00:00' },
          { id: 3, value: '数据3', timestamp: '2024-03-12 10:00:00' },
          { id: 4, value: '数据4', timestamp: '2024-03-12 11:00:00' },
          { id: 5, value: '数据5', timestamp: '2024-03-12 12:00:00' }
        ]
      };
    }
  };
  </script>
  
  <style>
  /* 可以在这里添加样式 */
  .history-data {
    margin: 20px;
  }
  </style>
  