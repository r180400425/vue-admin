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
          const DataEntry[] da=
          console.log(typeof(responseData))
          // console.log( historyData.value )
          console.log(responseData.data)
          console.log('type',typeof(responseData.data) )
          console.log('id=',responseData.data.deviceId)
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


//     const requireDeviceSensor = () => {
//   // var randomZeroOrOne = Math.floor(Math.random() * 2);
//   // // console.log('测试数据', randomZeroOrOne);
//   // let testdata = randomZeroOrOne ? "10111010" : "01110101"
//   // lightDataArray.value = dealData(testdata);
//   // openDataArray.value = dealData(testdata);
//   // console.log(openDataArray.value);

//   proxy?.$http
//     .get("/iold?cid=1")
//     .then((res: any) => {
//       res = res.data.data
//       // console.log('res数据:', typeof res.a1);
//       const a_array = res.a1.toString() + res.a2.toString() +res.a3.toString() +res.a4.toString() +res.a5.toString() +res.a6.toString() +res.a7.toString() +res.a8.toString()
//       const b_array = res.b1.toString() + res.b2.toString() +res.b3.toString() +res.b4.toString() +res.b5.toString() +res.b6.toString() +res.b7.toString() +res.b8.toString()
//       console.log('字符串a：', a_array);
//       console.log('字符串b：', b_array);
//       lightDataArray.value = dealData(a_array);
//       openDataArray.value = dealData(b_array);
//       // console.log(lightDataArray.value);
//     })
//     .catch();
// };

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
