<template>
  <div>
    <h1>历史数据展示</h1>
    <table>
      <thead>
        <tr>
          <th v-for="col in sortedColumns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="col in sortedColumns" :key="col">{{ data[col] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

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
    const historyData = ref<DataEntry[]>([]);
    const data = ref<DataEntry>({});
    const columns = ref<string[]>([]);
    const leftMostColumn = 'id'; // 设置在最左侧的列名

    async function fetchData() {
      try {
        // const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000');
        // const response = await fetch('http://localhost:8089/datacontrol/get10?cid=1'); // 请根据实际后端端口进行替换
        const response = await fetch('http://localhost:8089/datacontrol/getR?offset=1&num=20'); // 请根据实际后端端口进行替换
        const responseData: ResponseData = await response.json();
        console.log('responseData.code= ',responseData.code )
        if (responseData.code >0) {
          historyData=re
          data.value = responseData.data;
          console.log(responseData.data)
          columns.value = Object.keys(responseData.data[0]).sort(); // 按字母排序列名
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

    // 将左侧固定列移至数组首位
    const sortedColumns = computed(() => {
      const sortedCols = [...columns.value];
      const leftMostIndex = sortedCols.indexOf(leftMostColumn);
      if (leftMostIndex !== -1) {
        sortedCols.splice(leftMostIndex, 1);
        sortedCols.unshift(leftMostColumn);
      }
      return sortedCols;
    });

    return {
      data,
      sortedColumns,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>
