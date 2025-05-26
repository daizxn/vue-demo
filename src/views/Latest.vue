<template>
  <div class="latest-container">
    <component :is="latestPeriod" v-if="latestPeriod"></component>
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 导入所有期刊文件
// 使用Vite的动态导入功能
const modules = import.meta.glob('./news/period-*_*.vue');

// 存储最新的期刊组件
const latestPeriod = ref(null);

onMounted(async () => {
  // 期刊信息数组
  const periods = [];
  console.log('正在加载期刊...');

  for (const path in modules) {
    const module = await modules[path]();


    // 匹配格式: period-4_2023-10-01_2023-10-31.vue
    const match = path.match(/period-(\d+)_(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})\.vue$/);
    console.log(match)
    if (match) {
      const periodNumber = parseInt(match[1]);
      const startDate = new Date(match[2]);
      const endDate = new Date(match[3]);

      periods.push({
        component: module.default,
        periodNumber: periodNumber,
        startDate: startDate,
        endDate: endDate,
        path: path // 保存路径用于调试
      });
    }
  }

  // 按结束日期排序，获取最新的一期
  if (periods.length > 0) {
    periods.sort((a, b) => b.periodNumber - a.periodNumber);
    latestPeriod.value = periods[0].component;
    console.log(`已加载最新期刊: ${periods[0].path}, 期号: ${periods[0].periodNumber}`);
  }
});
</script>

<style scoped>
.latest-container {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}
</style>
