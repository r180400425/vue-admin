<template>
  <div>
    <h1>历史数据展示-</h1>
    <table>
      <thead>
        <tr>
          <th>属性名</th>
          <th>属性值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in data" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
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

interface ResponseData {
  code: number;
  msg: string;
  data: DataEntry;
}

export default defineComponent({
  name: 'App',
  setup() {
    const data = ref<DataEntry>({});
    
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000');
        const responseData: ResponseData = await response.json();
        if (responseData.code === 10000) {
          data.value = responseData.data;
        } else {
          console.error('Error fetching data:', responseData.msg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      data,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>
