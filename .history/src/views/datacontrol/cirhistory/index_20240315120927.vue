<template>
  <div class="container">
    <h1>电路历史数据展示</h1>

    <div class="table-container">

      <table class="data-table">
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
      <button @click="firstPage" :disabled="curPage === 1">首页</button>
      <button @click="prevPage" :disabled="curPage === 1">上一页</button>
      <button @click="nextPage" :disabled="curPage === totalPages">下一页</button>
      <button @click="lastPage" :disabled="curPage === totalPages">尾页</button>
    </div>

    
    <div class="form-group">
      <label for="curPage">当前页:</label>
      <input type="number" id="curPage" v-model.number="curPage" min="1" :max="totalPages"  class="form-control" style="width: 50px;" />
      <label for="perPage">每页显示条数:</label>
      <input type="number" id="perPage" v-model.number="perPage" min="1" class="form-control" style="width: 50px;" />
      <span class="total-pages">总页数: {{ totalPages }}</span>
      <button @click="updataBtn" class="btn btn-primary">刷新</button>
      
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
    const leftMostColumn = 'Id'; // 设置在最左侧的列名
    const rightMostColumn='Time';//最右
    const curPage = ref<number>(1);
    const perPage = ref<number>(10); // 默认每页显示条数
    // let totalPages = ref<number>(1);
    const totalnum = ref<number>(1);

    async function fetchData() {
      console.log('***fetchData:');
      try {
        // Simulate fetching data from backend for one page only
        
        // const offset = (curPage.value - 1) * perPage.value;
        const offset = curPage.value-1 ;
        console.log('--totalPages.value=',totalPages.value);
        console.log('totalnum=',totalnum.value);
        console.log('curPage=',curPage.value);
        console.log('offset=',offset);
        console.log('num=',perPage.value);
        
        const response= await fetch(`http://localhost:8089/datacontrol/getcirR?offset=${offset}&num=${perPage.value}`);
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
      // 创建一个新数组 sortedCols，复制了 columns.value 中的值。这么做是为了不直接修改原始数据，以避免直接操作响应式数据。
      const sortedCols = [...columns.value];
      // 查找 sortedCols 中最左侧列 leftMostColumn 的索引位置。
      const leftMostIndex = sortedCols.indexOf(leftMostColumn);
      const rightMostIndex = sortedCols.indexOf(rightMostColumn);

      // 检查最左侧列的索引是否存在，如果存在则执行以下操作。
      if (leftMostIndex !== -1) {
        // 从 sortedCols 数组中移除最左侧列，删除了 leftMostColumn 在数组中的位置。
        sortedCols.splice(leftMostIndex, 1);
        // 将 leftMostColumn 插入到数组的最前面，确保它成为最左侧的列。
        sortedCols.unshift(leftMostColumn);
      }
      if (rightMostIndex !== -1) {
        sortedCols.splice(rightMostIndex, 1);
        sortedCols.push(rightMostColumn);
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

.container {
  position: relative; /* 设置相对定位 */
  width: 100%; /* 设置宽度为100% */
  max-width: 800px; /* 设置最大宽度 */
  margin: 0 auto; /* 左右居中 */
  padding: 20px; /* 添加内边距 */
}

.table-container {
  width: 100%;
  overflow-x: auto;
}


.form-group {
  margin-top: 10px;
  margin-bottom: 10px;
}

.form-group {
  /* margin-top: 10px; */
  /* margin-bottom: 15px; */
  /* display: flex; */
  /* align-items: center; */
  text-align: right;
}

label {
  margin-right: 10px;
}

.form-control{
  margin-right: 10px;
}

input[type="number"],
button {
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

button {
  background-color: #4b0bb3a0;
  color: #fff;
  border-color: #4700fc44;
  cursor: pointer;
}

.total-pages {
  margin-right: 10px;
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
  text-align: right;
  margin-top: 10px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  
  background-color: #12032974;
  color: #fff;
  border-color: #06011544;
  opacity: 0.5;
  cursor: not-allowed;
}

</style>