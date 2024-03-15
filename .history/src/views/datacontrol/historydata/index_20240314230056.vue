<template>
  <div>
    <h1>历史数据展示--特定列</h1>
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

interface DataEntry {
  [key: string]: string | number; // 使用动态属性名
}

export default defineComponent({
  name: 'App',
  setup() {
    const historyData = ref<DataEntry[]>([]);
    const sortedKeys = ref<string[]>([]);

    async function fetchData() {
      try {
        // const response = await fetch('http://localhost:8089/datacontrol/history-data?deviceId=test000'); // 请根据实际后端端口进行替换
        // const response = await fetch('http://localhost:8089/datacontrol/get10?cid=1'); // 请根据实际后端端口进行替换
        const response = await fetch('http://localhost:8089/datacontrol/get?offset=1&num=20'); // 请根据实际后端端口进行替换
        const data = await response.json();
        historyData.value = data;
        
        // 获取所有属性并按字母顺序排序
        const keys = Object.keys(data[0]).sort();
        // 将特定属性移动到数组开头，比如将 'id' 属性作为首列
        const index = keys.indexOf('id');
        if (index > -1) {
          keys.splice(index, 1);
          keys.unshift('id');
        }
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
body {
    padding: 0;
    margin: 0;
}
#app:not([data-v-app]) {
    height: 100vh;
    background: #000000;
}
.loading {
    color: #ffffff;
    font-size: 20px;
    height: 20px;
    text-align: center;
    position: relative;
    top: 50%;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective: 500px;
    -moz-perspective: 500px;
    -o-perspective: 500px;
    -ms-perspective: 500px;
    perspective: 500px;
    letter-spacing: 2px;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    text-shadow: 2px 2px 20px #ff0000;
    margin-left: 20px;
}

.rotate {
    display: inline;
    position: absolute;
    background-color: #ffffff;
    color: #000000;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 60px 4px #000088;
    -moz-box-shadow: 0 0 60px 4px #000088;
    box-shadow: 0 0 60px 4px #000088;
    -webkit-animation: animate-rotate-x 1s ease infinite;
    -moz-animation: animate-rotate-x 1s ease infinite;
    animation: animate-rotate-x 1s ease infinite;
    margin-left: -20px;
}

@-webkit-keyframes animate-rotate-x {
    0% {
        -webkit-transform: rotateX(1deg);
        -moz-transform: rotateX(1deg);
        -o-transform: rotateX(1deg);
        -ms-transform: rotateX(1deg);
        transform: rotateX(1deg);
    }

    100% {
        -webkit-transform: rotateX(360deg);
        -moz-transform: rotateX(360deg);
        -o-transform: rotateX(360deg);
        -ms-transform: rotateX(360deg);
        transform: rotateX(360deg);
    }
}

@-moz-keyframes animate-rotate-x {
    0% {
        -webkit-transform: rotateX(1deg);
        -moz-transform: rotateX(1deg);
        -o-transform: rotateX(1deg);
        -ms-transform: rotateX(1deg);
        transform: rotateX(1deg);
    }

    100% {
        -webkit-transform: rotateX(360deg);
        -moz-transform: rotateX(360deg);
        -o-transform: rotateX(360deg);
        -ms-transform: rotateX(360deg);
        transform: rotateX(360deg);
    }
}

@keyframes animate-rotate-x {
    0% {
        -webkit-transform: rotateX(1deg);
        -moz-transform: rotateX(1deg);
        -o-transform: rotateX(1deg);
        -ms-transform: rotateX(1deg);
        transform: rotateX(1deg);
    }

    100% {
        -webkit-transform: rotateX(360deg);
        -moz-transform: rotateX(360deg);
        -o-transform: rotateX(360deg);
        -ms-transform: rotateX(360deg);
        transform: rotateX(360deg);
    }
}
</style>