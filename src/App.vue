<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { GoogleLogin, googleLogout } from "vue3-google-login";
import { decodeCredential } from "vue3-google-login";

// 获取当前路由实例
const route = useRoute();
const router = useRouter();

// 控制往期资讯弹窗
const isPastNewsOpen = ref(false);

const isOnLatestNewsPage = ref(true); // 控制是否在最新资讯页面
const periodId = ref(-1); // 存储当前期刊ID

// 存储所有期刊信息的数组
const pastPeriods = ref([]);

// 根据当前路由设置状态
const updatePageState = () => {
  // 确保路由已经准备就绪
  if (!route.path) return;

  const currentPath = route.path;
  console.log("当前路径:", currentPath);
  console.log("完整路径:", route.fullPath);

  if (currentPath === "/") {
    isOnLatestNewsPage.value = true;
    periodId.value = -1;
  } else if (currentPath.startsWith("/period-")) {
    isOnLatestNewsPage.value = false;
    const match = currentPath.match(/\/period-(\d+)/);
    if (match) {
      periodId.value = parseInt(match[1]);
    }
  }
};

// 登录相关
const isLoggedIn = ref(false);
const userInfo = ref(null);
const showGoogleLogin = ref(false); // 控制Google登录按钮显示
const showUserMenu = ref(false); // 控制用户菜单显示

const tabbarclicked = (peroid) => {
  if (peroid === -1) {
    isOnLatestNewsPage.value = true;
    periodId.value = -1;
  } else {
    isOnLatestNewsPage.value = false;
    // 跳转到对应的期刊页面
    periodId.value = peroid;
  }

  console.log(isOnLatestNewsPage.value);
  periodId.value = peroid;
};

const periodItemStyle = (peroid) => {
  if (periodId.value === peroid) {
    return "active-item";
  }
};

// Google登录处理
const googleLogin = (response) => {
  try {
    const userData = decodeCredential(response.credential);
    console.log("Handle the userData", userData);

    isLoggedIn.value = true;
    userInfo.value = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      sub: userData.sub,
    };

    localStorage.setItem("user", JSON.stringify(userInfo.value));
    localStorage.setItem("isLoggedIn", "true");

    // 隐藏Google登录按钮
    showGoogleLogin.value = false;
  } catch (error) {
    console.error("登录处理失败:", error);
  }
};

// 登出功能
const logout = () => {
  isLoggedIn.value = false;
  userInfo.value = null;
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  googleLogout();
  showUserMenu.value = false;
  console.log("用户已登出");
};

// 头像加载错误处理
const handleAvatarError = (event) => {
  console.warn("Google头像加载失败，使用默认头像");
  event.target.src = "/o.png";
};

// 检查登录状态
const checkLoginStatus = () => {
  const savedLoginStatus = localStorage.getItem("isLoggedIn");
  const savedUser = localStorage.getItem("user");

  if (savedLoginStatus === "true" && savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      isLoggedIn.value = true;
      userInfo.value = userData;
      console.log("恢复登录状态:", userData);
    } catch (error) {
      console.error("解析保存的用户数据失败:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    }
  }
};

onMounted(async () => {
  // 等待路由完全加载
  await nextTick();

  // 等待路由器准备就绪
  await router.isReady();

  updatePageState();

  checkLoginStatus();

  const modules = import.meta.glob("./views/news/period-*_*_*.vue");

  // 临时存储期刊信息
  const periods = [];

  // 处理每个文件路径
  for (const path in modules) {
    // 解析文件名: period-1_2023-07-01_2023-07-31.vue
    const match = path.match(/period-(\d+)_(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})\.vue$/);

    if (match) {
      const periodNumber = parseInt(match[1]);
      const startDate = match[2];
      const endDate = match[3];

      // 格式化日期：从YYYY-MM-DD转换为YYYY/MM/DD
      const formattedStartDate = startDate.replace(/-/g, "/");
      const formattedEndDate = endDate.replace(/-/g, "/");

      // 按照要求的格式构建name字段
      const name = `${formattedStartDate} - ${formattedEndDate} 第 ${periodNumber} 期`;

      periods.push({
        id: periodNumber,
        name: name,
      });
    }
  }

  // 按期号从大到小排序
  periods.sort((a, b) => b.id - a.id);

  // 更新响应式数组
  pastPeriods.value = periods;

  console.log(periods);

  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const togglePastNews = () => {
  isPastNewsOpen.value = !isPastNewsOpen.value;
};

// 点击外部区域关闭登录弹窗
const handleClickOutside = (event) => {
  const loginContainer = document.querySelector(".login-container");
  if (loginContainer && !loginContainer.contains(event.target)) {
    showGoogleLogin.value = false;
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="logo">
          <div>📣</div>
          <div style="color: #000000">号外</div>
          <div style="color: #4ada1d">HOWY</div>
        </div>
        <div class="tab">
          <div
            class="latest-news"
            @click="tabbarclicked(-1)"
            :class="[{ 'active-news': isOnLatestNewsPage }]"
          >
            <router-link to="/">
              <span>最新资讯</span>
            </router-link>
          </div>
          <div
            class="past-news"
            @click="togglePastNews"
            :class="[{ 'active-news': !isOnLatestNewsPage }]"
          >
            <span>往期资讯</span>
            <div class="arrow" :class="{ 'arrow-rotated': isPastNewsOpen }">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3334 6.66702L8.30921 9.80712C8.12005 9.92534 7.88003 9.92534 7.69087 9.80712L2.66671 6.66702"
                  stroke="#1F2329"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <!-- 往期资讯弹窗 -->
            <div class="past-news-popup" v-if="isPastNewsOpen">
              <div
                v-for="period in pastPeriods"
                :key="period.id"
                class="past-period"
                :class="periodItemStyle(period.id)"
              >
                <div @click="tabbarclicked(period.id)">
                  <router-link :to="`/period-${period.id}`">
                    <span class="period-date">{{ period.name }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="auth-section">
            <!-- 未登录时显示自定义登录按钮 -->
            <div
              v-if="!isLoggedIn"
              class="login-container"
              @mouseenter="showGoogleLogin = true"
              @mouseleave="showGoogleLogin = false"
            >
              <div class="custom-login-btn">
                <span>登录</span>
              </div>

              <!-- 悬停时显示的Google登录按钮 -->
              <div v-show="showGoogleLogin" class="google-login-popup">
                <GoogleLogin :callback="googleLogin" />
              </div>
            </div>

            <!-- 已登录时显示用户信息 -->
            <div
              v-else
              class="user-container"
              @mouseenter="showUserMenu = true"
              @mouseleave="showUserMenu = false"
            >
              <div class="user-info">
                <div class="user-avatar">
                  <img
                    :src="userInfo?.picture || '/o.png'"
                    :alt="userInfo?.name || 'User Avatar'"
                    @error="handleAvatarError"
                  />
                </div>
                <!-- 悬停时显示的登出菜单 -->
                <div v-show="showUserMenu" class="user-menu-popup">
                  <div class="menu-item" @click="logout">
                    <span>登出</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  height: 64px;
  padding-right: 32px;
  padding-left: 32px;
  gap: 24px;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 12px;
  text-align: center;
}

nav > div {
  width: 33%;
}

nav .logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  div {
    font-family: FZDeSaiHeiS;
    font-weight: 800;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0%;
  }
}

nav .tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 64px;

  div {
    font-family: PingFang SC;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
  }
}

nav .tab .active-news {
  display: flex;
  flex-direction: column;
  position: relative;
  font-weight: 600;
  align-items: center;
  span {
    font-weight: 600;
  }
}

nav .tab .active-news::after {
  content: "";
  left: 25px;
  position: absolute;
  bottom: -15px;
  width: 32px;
  height: 4px; /* Height of the green line */
  background-color: #4ada1d;
}

nav .tab .latest-news {
  display: flex;
  flex-direction: row;
  position: relative; /* 为弹窗定位 */
  cursor: pointer;
  align-items: center;

  font-weight: 400;
}

nav .tab .past-news {
  display: flex;
  flex-direction: row;
  position: relative; /* 为弹窗定位 */
  cursor: pointer;
  align-items: center;

  font-weight: 400;
}

nav .tab .past-news .arrow {
  width: 16;
  height: 16;
  transition: transform 0.3s ease;
}

.arrow-rotated {
  transform: rotate(180deg);
}

nav .tab .past-news .past-news-popup {
  position: absolute;
  top: 100%;
  left: 0;
  width: 260px;
  background: var(--color-elevated-1);
  border: 1px solid var(--color-line-3);
  border-radius: var(--border-radius-l);
  box-shadow: 0 6px 12px var(--box-shadow-down-3);
  z-index: 100;
  padding: var(--spacing-m-nudge);
}

nav .tab .past-news .past-news-popup .active-item {
  background-color: rgba(74, 218, 29, 0.06);
  .period-date {
    color: rgba(54, 177, 16, 1);
  }
}

nav .tab .past-news .past-news-popup .past-period {
  width: 100%;
  padding-top: var(--spacing-m);
  padding-right: var(--spacing-m-nudge);
  padding-bottom: var(--spacing-m);
  padding-left: var(--spacing-m-nudge);
  border-radius: var(--border-radius-s);
}

nav .tab .past-news .past-news-popup .past-period:hover {
  background: var(--color-mouseover-1);
}

nav .tab .past-news .past-news-popup .past-period span {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  vertical-align: middle;
  color: var(--color-text-primary, rgba(31, 35, 41, 1));
}

nav .right {
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: flex-end;
}

nav .right .searchbar {
  width: 320px;
  height: 36px;
  gap: var(--spacing-m);
  padding-right: var(--spacing-xxl);
  padding-left: var(--spacing-xxl);
  border-radius: 18px;
  background: #f2f2f2;

  display: flex;
  flex-direction: row;

  align-items: center;
}

nav .right .Avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

nav .right .Avatar img {
  width: 100%;
  height: 100%;
}

nav .right .searchbar .search-input {
  height: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: center;
  color: var(--color-text-tertiary);
}

.auth-section {
  display: flex;
  align-items: center;
  padding-right: 40px;
  gap: 12px;
}

.login-container,
.user-container {
  position: relative;
  display: inline-block;
}

.custom-login-btn {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  font-family: Noto Sans SC;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000;
  transition: color 0.2s ease;
  border-radius: 4px;
}

.custom-login-btn:hover {
  color: #4ada1d;
  background: rgba(74, 218, 29, 0.1);
}

.google-login-popup,
.user-menu-popup {
  position: absolute;
  top: 70%;
  right: -50%;
  margin-top: 8px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  white-space: nowrap;
}

.google-login-popup::before,
.user-menu-popup::before {
  content: "";
  position: absolute;
  top: -6px;
  right: 20px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.1);
}

.google-login-btn,
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #3c4043;
  min-width: 150px;
}

.google-login-btn:hover,
.menu-item:hover {
  background: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.user-container:hover .user-info {
  background: rgba(0, 0, 0, 0.05);
}

.user-avatar {
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  display: block;
}

.username {
  font-family: Noto Sans SC;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
