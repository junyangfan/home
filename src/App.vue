<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container" v-show="!store.backgroundShow">
        <section class="all" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
        <!-- 移动端菜单按钮 -->
        <Icon
          class="menu"
          size="24"
          v-show="!store.backgroundShow"
          @click="store.mobileOpenState = !store.mobileOpenState"
        >
          <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
        </Icon>
      </div>
    </main>
  </Transition>
  <!-- 页脚 -->
  <Transition name="fade" mode="out-in">
    <Footer v-show="!store.backgroundShow && !store.setOpenState" />
  </Transition>
</template>

<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import Loading from "@/components/Loading.vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import cursorInit from "@/utils/cursor.js";

const store = mainStore();

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 721) {
      store.boxOpenState = false;
      store.setOpenState = false;
    }
  },
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  // const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  // const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
//   const title1 = "無名の主页";
//   const title2 = `
//  _____ __  __  _______     ____     __
// |_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
//   | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
//   | | | |\\/| |\\___ \\  \\   /    \\   /
//  _| |_| |  | |____) |  | |      | |
// |_____|_|  |_|_____/   |_|      |_|`;
  // const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  // console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
  console.log(`%c${"你想干什么？"}`, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: calc(100vh - 46px);
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 0.5vw;
    display: flex;
    align-items: center;
    .all {
      width: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 34px;
      background: rgb(0 0 0 / 20%);
      backdrop-filter: blur(10px);
      border-radius: 6px;
      transition: transform 0.3s;
      animation: fade 0.5s;
      &:active {
        transform: scale(0.95);
      }
      .i-icon {
        transform: translateY(2px);
      }
      @media (min-width: 720px) {
        display: none;
      }
    }
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
  }
  @media (max-width: 720px) {
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 60px;
      .all {
        flex: 1;
        
      }
    }
  }
}
</style>
