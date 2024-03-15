<template>
  <div>
    <h1>历史数据展示--字母排序</h1>
    <table>
      <thead>
        <tr>
          <!-- 对表头进行排序 -->
          <th v-for="key in sortedKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyData" :key="item.id">
          <!-- 对表格内容按照排序后的顺序显示 -->
          <td v-for="key in sortedKeys" :key="key">{{ item[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface ResponseData {
  code: number;
  msg: string;
  data: DataEntry;
}

interface DataEntry {
  [key: string]: string | number; // 使用动态属性名
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);
    // const tableHeaders = ref<string[]>([]);
    const sortedKeys = ref<string[]>([]);
    const data = ref<DataEntry>;

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000'); // 请根据实际后端端口进行替换
        // const response = await fetch('http://localhost:8089/datacontrol/get10?cid=1'); // 请根据实际后端端口进行替换
        // const response = await fetch('http://localhost:8089/datacontrol/get?offset=1&num=20'); // 请根据实际后端端口进行替换

        const responseData:ResponseData=await response.json();
        const code=responseData.code;
        // console.log(typeof(responseData));
        console.log("data=",responseData.data);

        data.value=responseData.data;
        // const data:DataEntry[]=responseData.data;
        console.log(typeof(data));
        // const data = await response.json();
        historyData.value = responseData.data;
        
        // 获取所有属性并按字母顺序排序
        const keys = Object.keys(data[0]).sort();
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
/* Add your styles here */
</style>
