<template>
  <div>
    <h1>历史数据展示</h1>
    <table v-if="tableHeaders.length > 0">
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
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

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
        const data = await response.json() as ApiResponse<DataEntry[]>;
        if (data.code === 10000) {
          historyData.value = data.data;
          console.error(data.data)/
          if (data.data.length > 0) {
            tableHeaders.value = Object.keys(data.data[0]); // 获取第一个数据项的所有属性作为表头
          }
        } else {
          console.error('Error fetching data:', data.msg);
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
