<template>
  <div class="container">
    <h1>历史数据展示--美化</h1>
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="key in sortedKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyData" :key="item.id">
          <td v-for="key in sortedKeys" :key="key">{{ item[key] }}</td>
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
    const sortedKeys = ref<string[]>([]);

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/get?offset=1&num=20');
        const data = await response.json();
        historyData.value = data;
        
        const keys = Object.keys(data[0]).sort();
        const index = keys.indexOf('id');
        if (index > -1) {
          keys.splice(index, 1);
          keys.unshift('id');
        }
        sortedKeys.value = keys;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      historyData,
      sortedKeys,
    };
  },
});
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
