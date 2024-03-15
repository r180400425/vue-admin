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
    const columns = ref<string[]>([]);
    const leftMostColumn = 'devId'; // 设置在最左侧的列名

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000');
        const responseData: ResponseData = await response.json();
        if (responseData.code === 10000) {
          data.value = responseData.data;
          columns.value = Object.keys(responseData.data).sort(); // 按字母排序列名
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
