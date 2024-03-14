<template>
  <div>
    <h1>历史数据展示</h1>
    <table v-if="tableHeaders.length > 0">
      <thead>
        <tr>
          <!-- 使用 v-for 循环生成表头 -->
          <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in historyData" :key="index">
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

interface DataEntry {
  [key: string]: string | number;
}

interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const tableHeaders = ref<string[]>([]);

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000');
        const responseData: ResponseData<DataEntry[]> = await response.json();
        if (responseData.code === 10000) {
          historyData.value = responseData.data;
          console.log(typeof(responseData))
          // console.log( historyData.value )
          console.log(responseData.data)
          console.log('type',typeof(responseData.data) )
          console.log(ree)
          console.log(Object.keys(responseData.data[0]))
          if (responseData.data.length > 0) {
            tableHeaders.value = Object.keys(responseData.data[0]); // 获取第一个数据项的所有属性作为表头
          }
        } else {
          console.error('Error fetching data--msg:', responseData.msg);
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
