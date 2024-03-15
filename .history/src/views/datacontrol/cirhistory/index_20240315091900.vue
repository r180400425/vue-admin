<template>
  <div class="container">
    <h1>历史数据展示-页码</h1>
    <div class="form-group">
      <label for="currentPage">当前页码：</label>
      <input type="number" id="currentPage" v-model="currentPage" @input="updatePage" min="1" :max="totalPages" />
    </div>
    <div class="form-group">
      <label for="perPage">每页显示条数：</label>
      <input type="number" id="perPage" v-model="perPage" @input="updatePerPage" min="1" />
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="key in sortedKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody v-if="historyData.length > 0">
        <tr v-for="(item, index) in displayedData" :key="index">
          <td v-for="key in sortedKeys" :key="key">{{ item[key] }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="sortedKeys.length">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span>第{{ currentPage }}页 / 共{{ totalPages }}页</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">末页</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
// import Pagination from '/@/components/Pagination.vue'; // 导入分页组件

interface DataEntry {
  [key: string]: string | number;
}

export default defineComponent({
  name: 'App',
  // components: {
  //   Pagination,
  // },
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const sortedKeys = ref<string[]>([]);
    const currentPage = ref<number>(1);
    const perPage = ref<number>(10); // 使用 ref 定义每页显示的数据条数

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8089/datacontrol/get?offset=${(currentPage.value - 1) * perPage.value}&num=${perPage.value}`);
        const data = await response.json();
        historyData.value = data || []; // 如果获取到的数据为空，则赋值为空数组
        
        const keys = Object.keys(data[0] || {}).sort(); // 处理空数据的情况
        const index = keys.indexOf('id');
        if (index > -1) {
          keys.splice(index, 1);
          keys.unshift('id');
        }
        sortedKeys.value = keys;
      } catch (error) {
        console.error('Error fetching data:', error);
        historyData.value = []; // 发生错误时清空数据
      }
    }

    onMounted(() => {
      fetchData();
    });

    // 监听 currentPage 的变化，实时更新数据
    watch(currentPage, (newPage, oldPage) => {
      console.log("newPage:",newPage);
      console.log("oldPage:",oldPage);
      if (Number.isInteger(newPage) && newPage !== oldPage && newPage > 0) {
        // updatePage(newPage);
        fetchData();
      }
    });

    function updatePage(page: number) {
      currentPage.value = page;
    }

    function updatePerPage() {
      currentPage.value = 1; // 修改每页显示条数时，重置当前页码为第一页
      fetchData();
    }

    const totalPages = computed(() => Math.ceil(historyData.value.length / perPage.value)); // 计算总页数

    const displayedData = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return historyData.value.slice(start, end);
    });

    function goToPage(page: number) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }

    return {
      historyData,
      sortedKeys,
      currentPage,
      perPage,
      totalPages,
      displayedData,
      updatePage,
      updatePerPage,
      goToPage,
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
