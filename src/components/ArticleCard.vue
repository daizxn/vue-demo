<template>
  <div class="article-card">
    <div class="article-text">
      <div class="article-title">
        {{ title }}
      </div>
      <div style="padding-top: 16px; padding-bottom: 32px;">
        <div class="article-news" v-for="(item, index) in news" :key="index">
          <LinkCard
            :url="item.url"
            :title="item.title"
            :description="item.description"
            :image="item.image"
          />
          <div class="article-news-line" v-if="index < news.length - 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LinkCard from "../components/LinkCard.vue";
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  news: {
    type: Array,
    required: true,
    validator: function (value) {
      // 检查是否为空数组
      if (value.length === 0) {
        return false;
      }

      // 检查每个对象是否有url属性且不为空
      return value.every(
        (item) => item && typeof item === "object" && item.url && item.url.trim() !== ""
      );
    },
  },
});
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  width: 960;
  height: 747;
  border-bottom-width: 1px;
  padding-top: 64px;
  padding-right: 32px;
  padding-bottom: 64px;
  padding-left: 32px;

  align-items: center;

  border-bottom: 1px solid #00000014;
}

.article-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 24px;
}

.article-text .article-title {
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

.article-text .article-title::after {
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

.article-text .article-news {
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding-bottom: 16px;
}

.article-text .article-news .article-news-line {
  border-bottom: 1px solid #e0e0e0; /* 灰色分隔线 */
  padding-top: 32px;
}
</style>
