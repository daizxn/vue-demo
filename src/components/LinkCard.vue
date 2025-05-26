<template>
  <div class="card" @click="openLink">
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div>
        <p class="card-description">{{ description }}</p>
        <div class="caed-from">
          <p>来自：</p>
          <p></p>
          <p>{{ source }}</p>
        </div>
      </div>
    </div>
    <img :src="image" v-if="img_existence" alt="Image" class="card-image" />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";

const title = ref("");
const description = ref("");
const image = ref("");
const source = ref("");
const img_existence = ref(false);

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const openLink = () => {
  if (props.url) {
    window.open(props.url, "_blank");
  }
  // else {
  //   alert("链接无效");
  // }
};

onMounted(async () => {
  {
    //检查是否提供参数
    if (!props.url) {
      // alert("请提供一个有效的链接");
      return;
    }

    try {
      // 使用 fetch 请求获取网页内容
      const corsProxy = "https://api.allorigins.win/get?url=";
      const response = await fetch(`${corsProxy}${encodeURIComponent(props.url)}`);

      const text = await response.text(); // 获取 HTML 内容
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // 定义变量以存储提取的信息
      let titleContent = "";
      let descriptionContent = "";
      let imageContent = "";
      let sourceContent = "";

      if (typeof props.title == "undefined") {
        let h1Title = "";
        const h1Elements = doc.querySelectorAll("h1");

        // 尝试找到最合适的h1标题
        for (const h1 of h1Elements) {
          const h1Text = h1.textContent.trim();
          // 过滤掉太短或可能是导航的h1
          if (h1Text.length > 5 && h1Text.length < 200) {
            h1Title = h1Text;
            break;
          }
        }

        // 如果没有找到合适的h1，再查找其他标题标签
        if (!h1Title) {
          const titleSelectors = [
            "h1",
            ".article-title",
            ".post-title",
            ".title",
            '[class*="title"]',
            "h2",
          ];

          for (const selector of titleSelectors) {
            const titleElement = doc.querySelector(selector);
            if (titleElement) {
              const titleText = titleElement.textContent.trim();
              if (titleText.length > 5 && titleText.length < 200) {
                h1Title = titleText;
                break;
              }
            }
          }
        }

        titleContent =
          h1Title ||
          (doc.querySelector("title")
            ? doc.querySelector("title").textContent.trim()
            : "未找到标题");
      } else {
        titleContent = props.title;
      }

      if (typeof props.description == "undefined") {
        descriptionContent = doc.querySelector('meta[name="description"]')
          ? doc.querySelector('meta[name="description"]').getAttribute("content")
          : "";
        if (!descriptionContent) {
          const allParagraphs = doc.querySelectorAll("p");
          let combinedText = "";

          for (const p of allParagraphs) {
            const text = p.textContent.trim();
            // 过滤掉太短的段落（可能是导航或其他无关内容）
            if (text.length > 20) {
              combinedText += text + " ";
              // 如果已经收集了足够的文本就停止
              if (combinedText.length > 200) {
                break;
              }
            }
          }
          descriptionContent = combinedText.trim();
        }
        if (descriptionContent) {
          descriptionContent =
            descriptionContent.replace(/\s+/g, " ").slice(0, 100) +
            (descriptionContent.length > 100 ? "..." : "");
        }
      } else {
        descriptionContent = props.description;
      }
      if (typeof props.image == "undefined") {
        let ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
        let twitterImage = doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content");

        // 更智能的图片选择
        let firstImg = "";

        // 1. 优先选择文章内容区域的图片
        const contentSelectors = [
          "article img",
          ".article-content img",
          ".post-content img",
          ".content img",
          "main img",
        ];

        for (const selector of contentSelectors) {
          const img = doc.querySelector(selector);
          if (img && isValidImage(img)) {
            firstImg = img.src;
            break;
          }
        }

        // 2. 如果内容区域没找到，再从所有图片中筛选
        if (!firstImg) {
          const allImages = doc.querySelectorAll("img");
          for (const img of allImages) {
            if (isValidImage(img)) {
              firstImg = img.src;
              break;
            }
          }
        }

        imageContent = ogImage || twitterImage || firstImg || "";
        console.log(imageContentll);
        // 如果找到了图片，使用代理服务
        if (imageContent) {
          // 处理相对URL
          if (!imageContent.startsWith("http")) {
            try {
              const baseUrl = new URL(props.url);
              imageContent = new URL(imageContent, baseUrl.origin).href;
            } catch (e) {
              // console.error("处理图片URL失败:", e);
              imageContent = "";
            }
          }

          if (imageContent) {
            imageContent = `https://wsrv.nl/?url=${encodeURIComponent(imageContent)}`;
            // 或者使用其他图片代理服务
            //imageContent = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageContent)}`;
          }
        }
      } else {
        imageContent = props.image;
      }

      // 图片有效性检查函数
      function isValidImage(img) {
        if (!img.src) return false;

        // 排除透明图片的文件格式和模式
        const transparentPatterns = [
          /\.png$/i, // PNG可能是透明的
          /transparent/i,
          /alpha/i,
          /overlay/i,
          /watermark/i,
        ];

        // 检查是否为透明图片特征
        for (const pattern of transparentPatterns) {
          if (pattern.test(img.src) || pattern.test(img.alt)) {
            // PNG需要进一步检查，其他直接排除
            if (!pattern.test(img.src) || img.src.includes(".png")) {
              return false;
            }
          }
        }

        // 排除常见的无关图片
        const excludePatterns = [
          /logo/i,
          /icon/i,
          /avatar/i,
          /ad[_-]/i,
          /banner/i,
          /button/i,
          /pixel/i,
          /1x1/i,
          /tracking/i,
          /spacer/i,
          /blank/i,
          /clear/i,
        ];

        for (const pattern of excludePatterns) {
          if (pattern.test(img.src) || pattern.test(img.alt) || pattern.test(img.className)) {
            return false;
          }
        }

        // 优先选择JPG格式（通常不透明）
        if (img.src.match(/\.(jpg|jpeg)$/i)) {
          return true;
        }

        // 对于其他格式，检查文件名是否包含内容相关词汇
        const contentKeywords = [/article/i, /photo/i, /image/i, /picture/i, /content/i];

        return contentKeywords.some((keyword) => keyword.test(img.src) || keyword.test(img.alt));
      }

      if (imageContent === "") {
        img_existence.value = false;
      } else {
        img_existence.value = true;
      }

      const urlObj = new URL(props.url);
      sourceContent = urlObj.hostname;

      title.value = titleContent;
      description.value = descriptionContent;
      image.value = imageContent;
      source.value = sourceContent;

      // 将提取到的信息存入 preview
    } catch (error) {
      // console.error("无法抓取该页面:", error);
      //alert("无法获取链接数据");
    }
  }
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 960px;
  gap: 24px;
}

.card .card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 666px;
  height: 100%;
  gap: 16px;
}

.card .card-content .card-title {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  min-height: 40px;
  color: var(--color-text-primary);
}

.card .card-content > div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card .card-content .card-description {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0%;
  color: var(--color-text-secondary);
}

.card .card-content .caed-from {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-s);
}

.card .card-content .caed-from p {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0%;
  color: var(--color-text-tertiary);
}

.card img {
  width: 206px;
  height: 124px;
  border-radius: var(--border-radius-s);
  flex-shrink: 0;
}
</style>
