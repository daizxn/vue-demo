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
            title: '年度 Config 设计大会落下帷幕，Figma 又为我们带来了这些新改变',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            // 自己控制文本信息参考这个
            url: 'https://sspai.com/post/66274',
            image: '',
            // title: 'WWDC 2025',
            // description: 'WWDC 2025 将于 6 月 3 日至 7 日举行，苹果公司将展示最新的软件和技术。',
            // // 图片下载到本地的public文件夹中，其引用路径参考下面这个
            // image: '/title-banner.png',
            // image:  `${this.baseUrl}/s1-1.webp`,
          },
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://sspai.com/post/88803',
            image: '',
            // image: `${this.baseUrl}/s1-2.webp`,
          },
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://36kr.com/p/3305150923531776',
            image: '',
          },
        ]"
      />

      <ArticleCard
        :title="'交互设计'"
        :news="[
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            image: '',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://mp.weixin.qq.com/s/GWhV_VZpsgpOyoIePZYrgg',
          },
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            image: '',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://mp.weixin.qq.com/s/629sHaUWAgF-xzQ6Kx-OiQ',
          },
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            image: '',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://medium.com/@uxmag/ai-is-flipping-ux-upside-down-how-to-keep-your-ux-job-and-why-figma-is-a-titanic-its-not-for-301b89284a3a',
            // image:  `${this.baseUrl}/s2-3.jpg`,
          },
        ]"
      />

      <ArticleCard
        :title="'UI 设计'"
        :news="[
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            image: '',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://mp.weixin.qq.com/s?__biz=MjM5MTg2NDA3MQ==&mid=2652239743&idx=2&sn=375aa61ab97f5d2e9a4de2fc6e3a3712&chksm=bc08b96071b8f1e198cea3915d3b674e1cafc3522a31a580ad9421806629f1a530a31b1bb56a&scene=27',
          },
          {
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            url: 'https://news.airbnb.com/airbnb-2025-summer-release/',
            image: '',
          },
          {
            url: 'https://baijiahao.baidu.com/s?id=1831741780288398075&wfr=spider&for=pc',
            title: '安卓用户必看！Android 16界面UI首曝，这波升级真香了',
            description:
              '有没有觉得你的手机界面越来越无聊了？同样的图标、相似的布局、千篇一律的动画……不过这次，安卓用户可能要集体尖叫了！最近，谷歌悄悄放出了Android 16的早期测试版...',
            image: '',
          },
        ]"
      />
    </main>
  </div>
</template>

<script setup>
import HighlightSection from "@/components/HighlightSection.vue";
import ArticleCard from "@/components/ArticleCard.vue";

const highlightSections = [
  {
    url: "https://mp.weixin.qq.com/s/GWhV_VZpsgpOyoIePZYrgg",
    text: "今年春节，你在淘宝许愿了吗？",
    section: "交互设计",
  },
  {
    url: "https://mp.weixin.qq.com/s?__biz=MjM5MTg2NDA3MQ==&mid=2652239743&idx=2&sn=375aa61ab97f5d2e9a4de2fc6e3a3712&chksm=bc08b96071b8f1e198cea3915d3b674e1cafc3522a31a580ad9421806629f1a530a31b1bb56a&scene=27",
    text: "干货｜Material Design 大更新！“极繁设计”风格，真正的情感化设计！",
    section: "UI 设计",
  },
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
