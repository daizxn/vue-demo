<template>
  <div id="app">
    <main>
      <div class="banner">
        <img src="/title-banner.png" alt="" />
      </div>
      <HighlightSection
        :startDate="'2023/10/01'"
        :endDate="'2023/10/31'"
        :period="'4'"
        :title="'本期 Highlight'"
        :links="highlightSections"
      />
      <ArticleCard
        :title="'热点资讯'"
        :news="[
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
          },
        ]"
      />

      <ArticleCard
        :title="'交互设计'"
        :news="[
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
          },
        ]"
      />

      <ArticleCard
        :title="'UI 设计'"
        :news="[
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
  },
          {
            url: 'https://news.ifeng.com/c/8jcW1E8sGt0',
          },
        ]"
      />

    </main>
  </div>
</template>

<script setup>
import HighlightSection from "@/components/HighlightSection.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import LinkCard from "@/components/LinkCard.vue";

const highlightSections = [
  { url: "https://example.com/1", text: "文章标题1", section: "分类1" },
  { url: "https://example.com/2", text: "文章标题2", section: "分类2" },
];
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.banner {
  width: 100%;
}

.banner img {
  width: 100%;
  height: auto;
}
</style>
