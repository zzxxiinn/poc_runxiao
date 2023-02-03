<template>
  <a-layout has-sider>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      :style="layoutSideStyle"
      :collapsible="collapsed"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item
          v-for="nav of navs"
          :key="nav.name"
          @click="() => handleClick(nav)"
        >
          <component :is="nav.meta.icon" />
          <span class="nav-text">{{ nav.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout
      :style="{
        height: '100vh',
        marginLeft: collapsed ? '80px' : '200px',
        transition: '200ms',
      }"
    >
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <a-dropdown>
          <a-button shape="circle" class="ant-dropdown-link" @click.prevent>
            A
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item @click.stop.prevent>
                <a href="javascript:;">Admin</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="handleLogout">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/cookie";
import { message } from "ant-design-vue";

const router = useRouter();
const collapsed = ref(false);

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

const handleLogout = () => {
  removeToken();
  message.success("已退出登录");
  router.replace({ name: "login" });
};
</script>
<style scoped>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 24px;
}

.layout-content {
  margin: 24px 16px 0;
  overflow: initial;
  height: calc(100vh - 64px);
  overflow: auto;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
