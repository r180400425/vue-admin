<!-- 在 template 中添加分页组件和样式 -->
<template>
  <!-- 省略其他代码 -->
  <div class="pagination">
    <a-pagination
      :current="currentPage"
      :total="totalItems"
      :page-size="perPage"
      @change="handlePageChange"
      show-size-changer
      :page-size-options="[10, 20, 50]"
      show-quick-jumper
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { fetchHistoryData } from '/@/apis/modules/history'; // 假设有获取历史数据的 API

export default defineComponent({
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const sortedKeys = ref<string[]>([]);
    const currentPage = ref<number>(1);
    const perPage = ref<number>(10);
    const totalItems = ref<number>(0);

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8089/datacontrol/get?offset=${(currentPage.value - 1) * perPage.value}&num=${perPage.value}`);
                // const response = await fetchHistoryData(currentPage.value, perPage.value);
        historyData.value = response.data;
        sortedKeys.value = Object.keys(response.data[0]).sort();
        totalItems.value = response.total;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(() => {
      fetchData();
    });

    const displayedData = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return historyData.value.slice(start, end);
    });

    const handlePageChange = (page: number, pageSize?: number) => {
      currentPage.value = page;
      if (pageSize) {
        perPage.value = pageSize;
      }
      fetchData();
    };

    return {
      historyData,
      sortedKeys,
      currentPage,
      perPage,
      totalItems,
      displayedData,
      handlePageChange,
    };
  },
});
</script>

<style>
/* 添加分页样式 */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
