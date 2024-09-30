<template>
  <!-- 社交链接 -->
  <div class="social">
    <div class="link">
      <template v-for="item in socialLinks" :key="item.name">
        <template v-if="item.isImg">
          <el-popover trigger="hover" placement="top" :popper-style="{ padding: '0' }">
            <template #default>
              <img height="148" :src="item.url">
            </template>
            <template #reference>
              <img @mouseenter="socialTip = item.tip" @mouseleave="socialTip = '联系我吧 ~'" class="icon" :src="item.icon" height="24">
            </template>
          </el-popover>
        </template>
        <template v-else>
          <a
            :href="item.url"
            target="_blank"
            @mouseenter="socialTip = item.tip"
            @mouseleave="socialTip = '联系我吧 ~'"
          >
            <img class="icon" :src="item.icon" height="24" />
          </a>
        </template>
      </template>
    </div>
    <span class="tip">{{ socialTip }}</span>
  </div>
</template>

<script setup>
import socialLinks from "@/assets/socialLinks.json";

// 社交链接提示
const socialTip = ref("联系我吧 ~");
</script>

<style lang="scss" scoped>
.social {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 460px;
  overflow-x: auto;
  width: 100%;
  height: 42px;
  background-color: transparent;
  border-radius: 6px;
  backdrop-filter: blur(0);
  animation: fade 0.5s;
  transition:
  background-color 0.3s,
  backdrop-filter 0.3s;
  @media (max-width: 840px) {
    max-width: 100%;
    .link {
      justify-content: space-evenly !important;
    }
    .tip {
      display: none !important;
    }
  }

  .link {
    display: flex;
    align-items: center;
    a {
      display: inherit;
    }
    .icon {
      margin: 0 10px;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.1);
      }
      &:active {
        transform: scale(1);
      }
    }
  }
  .tip {
    display: none;
    margin-right: 12px;
    animation: fade 0.5s;
  }
  @media (min-width: 768px) {
    &:hover {
      background-color: #00000040;
      backdrop-filter: blur(5px);
      .tip {
        display: block;
      }
    }
  }
}
</style>
