<template>
  <div class="highlight-card">
    <!-- 日期显示区域 -->
    <div class="date-range">{{ startDate }} - {{ endDate }} 第 {{ period }} 期</div>

    <div class="highlight-text">
      <!-- 标题区域 -->
      <div class="highlight-title">
        {{ title }}
      </div>
      <!-- 动态链接列表 -->
      <div class="highlight-links">
        <ol>
          <li v-for="(link, index) in links" :key="index">
            <!-- 数字 -->
            <span> {{ index + 1 }}. </span>
            <span>【{{ link.section }}】</span>
            <a :href="link.url" target="_blank">{{ link.text }}</a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义组件的 props
const props = defineProps({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "本期 Highlight",
  },
  links: {
    type: Array,
    required: true,
    validator(value) {
      return value.every((link) => link.url && link.text && link.section);
    },
  },
});
</script>

<style scoped>
.highlight-card {
  display: flex;
  flex-direction: column;
  width: 960px;
  padding: 64px 38px 64px 38px;
  align-items: center;
  gap: 48px;
  color: #fff;
  border-bottom: 1px solid #00000014;
}

.date-range {
  height: 22px;

  text-align: center;
  justify-items: center;

  font-family: PingFang SC;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;

  color: #666666;
}

.highlight-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 24px;
}

.highlight-text .highlight-title {
  width: fit-content;

  position: relative;
  text-align: center;
  font-family: FZDeSaiHeiS;
  font-weight: 800;
  font-size: 28px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000;
}

.highlight-text .highlight-title::after {
  content: "";
  display: block; /* 确保是块级元素 */
  position: relative;
  margin: 0 auto;
  margin-top: -8px; /* 负边距使线条上移与文字重叠 */
  margin-right: -3px;
  width: 85%;
  height: 12px; /* Height of the green line */
  background-color: #4ada1d;
  z-index: -1;
}

.highlight-links {
  display: flex;
  flex-direction: column;
  font-family: PingFang SC;
}

.highlight-links span {
  display: flex;
  align-items: center;
  text-align: center;
  justify-items: center;

  padding-left: 7px;

  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  color: black;
}

.highlight-links a {
  color: black;
  text-decoration: underline; /* 添加下划线 */
  color: #333; /* 可以设置链接颜色 */
}

.highlight-links ol {
  padding-left: 20px;
  margin: 0;
}

.highlight-links ol li {
  display: flex;
  flex-direction: row;
}
</style>
