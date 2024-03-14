<template>
  <div>
    <h1>历史数据展示</h1>
    <table>
      <thead>
        <tr>
          <!-- 使用 v-for 循环生成表头 -->
          <th v-for="(value, key) in tableHeaders" :key="key">{{ key }}</th>
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
  [key: string]: string | number;
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const tableHeaders = ref<string[]>([]);

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000');
        const ref=await response.json();
        const data = await response.json();
        historyData.value = data
        if (data.length > 0) {
          tableHeaders.value = Object.keys(data[0]); // 获取第一个数据项的所有属性作为表头
          console.log('获取到',t)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      historyData,
      tableHeaders,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>
