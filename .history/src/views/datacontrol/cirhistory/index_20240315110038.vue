<template>
  <div class="container">
    <h1>历史数据展示--可</h1>
    <div class="form-group">
      <label for="curPage">当前页:</label>
      <input type="number" id="curPage" v-model.number="curPage" min="1" :max="totalPages" />
      <label for="perPage">每页显示条数:</label>
      <input type="number" id="perPage" v-model.number="perPage" min="1" />
      <button @click="updataBtn">刷新</button>
      <span>总页数: {{ totalPages }}</span>
    </div>

    <div class="table-container">

      <table>
      <thead>
        <tr>
          <th v-for="col in sortedColumns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedData" :key="item.id">
          <!-- 对表格内容按照排序后的顺序显示 -->
          <td v-for="key in sortedColumns" :key="key">{{ item[key] }}</td>
        </tr>
      </tbody>
    </table>
    </div>

    <div class="pagination">
      <button @click="firstPage">首页</button>
      <button @click="prevPage">上一页</button>
      <button @click="nextPage">下一页</button>
      <button @click="lastPage">尾页</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

interface DataEntry {
  [key: string]: any;
}

interface ResponseData {
  code: number;
  msg: string;
  data: DataEntry[];
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const columns = ref<string[]>([]);
    const leftMostColumn = 'id'; // 设置在最左侧的列名
    const curPage = ref<number>(1);
    const perPage = ref<number>(10); // 默认每页显示条数
    // let totalPages = ref<number>(1);
    const totalnum = ref<number>(1);

    async function fetchData() {
      console.log('***fetchData:');
      try {
        // Simulate fetching data from backend for one page only
        const offset = (curPage.value - 1) * perPage.value;
        console.log('--totalPages.value=',totalPages.value);
        console.log('totalnum=',totalnum.value);
        console.log('curPage=',curPage.value);
        console.log('offset=',offset);
        console.log('num=',perPage.value);
        
        const response= await fetch(`http://localhost:8089/datacontrol/getR?offset=${offset}&num=${perPage.value}`);
        // const response: ResponseData = await fetch(`http://localhost:8089/datacontrol/getR?offset=${offset}&num=${perPage.value}`);
        const responseData: ResponseData = await response.json();
        
        totalnum.value=responseData.code;
        // totalPages= computed(() => Math.ceil(totalnum.value / perPage.value));
        console.log('--totalPages.value=',totalPages.value);
        console.log('totalnum=',totalnum.value);
        console.log('curPage=',curPage.value);
        console.log('offset=',offset);
        console.log('num=',perPage.value);
        if (responseData.code >0) {
          historyData.value = responseData.data;
          console.log('his',responseData.data);
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

    const totalPages = computed(() => Math.ceil(totalnum.value / perPage.value));


    const sortedColumns = computed(() => {
      const sortedCols = [...columns.value];
      const leftMostIndex = sortedCols.indexOf(leftMostColumn);
      if (leftMostIndex !== -1) {
        sortedCols.splice(leftMostIndex, 1);
        sortedCols.unshift(leftMostColumn);
      }
      return sortedCols;
    });


    const displayedData = computed(() => {
      const startIdx = (curPage.value - 1) * perPage.value;
      const endIdx = startIdx + perPage.value;
      // console.log();
      // return historyData.value.slice(startIdx, endIdx);
      return historyData.value;
    });

    function updataBtn(){
      curPage.value = 1;
      fetchData();

    }

    function firstPage() {
      console.log('***firstPage:');
      curPage.value = 1;
      fetchData();
    }

    function prevPage() {
      console.log('*** prevPage:');
      curPage.value = Math.max(curPage.value - 1, 1);
      fetchData();
    }

    function nextPage() {
      console.log('***nextPage:');
      console.log('--totalPages.value=',totalPages.value);
      console.log('--curPage=',curPage.value);
      curPage.value = Math.min(curPage.value + 1, totalPages.value);
      console.log('-curPage=',curPage.value);
        
      fetchData();
    }

    function lastPage() {
      console.log('***lastPage:');
      curPage.value = totalPages.value;
      fetchData();
    }

    return {
      curPage,
      perPage,
      totalPages,
      historyData,
      sortedColumns,
      displayedData,
      fetchData,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      updataBtn,
    };
  },
});
</script>

<style>
.table-container {
  width: 90%;
  overflow-x: auto;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
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

.pagination {
  margin-top: 10px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>