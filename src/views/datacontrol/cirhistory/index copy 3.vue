<template>
  <div>
    <h1>历史数据展示--可展示</h1>
    <table>
      <thead>
        <tr>
          <!-- 使用 v-for 循环生成表头 -->
          <th v-for="(value, key) in historyData[0]" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyData" :key="item.id">
          <!-- 使用 v-for 循环生成表格内容 -->
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface DataEntry {
  [key: string]: string | number; // 使用动态属性名
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);

    async function fetchData() {
      try {
        // const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000'); // 请根据实际后端端口进行替换
        const response = await fetch('http://localhost:8089/datacontrol/get10?cid=1'); // 请根据实际后端端口进行替换
        const data = await response.json();
        historyData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      historyData,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>
