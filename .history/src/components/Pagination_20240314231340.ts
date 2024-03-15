<template>
  <div class="pagination">
    <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
    <span>第{{ currentPage }}页 / 共{{ total }}页</span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === total">下一页</button>
    <button @click="goToPage(total)" :disabled="currentPage === total">末页</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      type: Number as PropType<number>,
      required: true,
    },
    currentPage: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  methods: {
    goToPage(page: number) {
      if (page > 0 && page <= this.total) {
        this.$emit('update', page);
      }
    },
  },
});
</script>

<style>
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
