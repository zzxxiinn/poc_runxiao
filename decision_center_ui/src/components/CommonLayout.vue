<template>
  <a-layout has-sider>
    <a-layout-sider :style="layoutSideStyle">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item
          v-for="nav of navs"
          :key="nav.name"
          @click="() => handleClick(nav)"
        >
          <span class="nav-text">{{ nav.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ height: '100vh', marginLeft: '200px' }">
      <a-layout-header class="layout-header" />
      <a-layout-content class="layout-content">
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const routerMap = router.options.routes;
const navs = routerMap.find((i) => i.name === "home").children;
const selectedKeys = ref([navs[0].name]);

onMounted(() => {
  const selectedNav = navs.find(
    (n) => n.name === router.currentRoute.value.name
  );

  if (selectedNav) {
    selectedKeys.value = [selectedNav.name];
  }
});

const layoutSideStyle = ref({
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: "200px",
});

const handleClick = (nav) => {
  router.push({ name: nav.name });
};
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.layout-header {
  background: #fff;
  padding: 0;
  height: 64px;
}

.layout-content {
  margin: 24px 16px 0;
  overflow: initial;
  height: calc(100vh - 64px);
  overflow: auto;
}
</style>
