<template>
  <div>
    <h1>历史数据展示</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Device ID</th>
          <th>UA</th>
          <th>UB</th>
          <th>UC</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.deviceId }}</td>
          <td>{{ item.ua }}</td>
          <td>{{ item.ub }}</td>
          <td>{{ item.uc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface DataEntry {
  id: number;
  deviceId: string;
  ua: number;
  ub: number;
  uc: number;
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/datacontrol/history-data'); // 请根据实际后端端口进行替换
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
