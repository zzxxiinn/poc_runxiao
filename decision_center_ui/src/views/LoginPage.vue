<template>
  <div class="login-page">
    <section class="login-panel">
      <a-form
        style="width: 100%"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
        >
          <a-input placeholder="用户名" v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password
            placeholder="密码"
            v-model:value="formState.password"
          />
        </a-form-item>

        <a-form-item style="text-align: center">
          <a-button
            :loading="loading"
            style="width: 200px"
            type="primary"
            html-type="submit"
          >
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { apiService } from "@/api";
import { setToken } from "@/utils/cookie";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const formState = reactive({
  username: "",
  password: "",
});

const onFinish = async (values) => {
  console.log("Success:", values);
  loading.value = true;
  const { data } = await apiService.login(values);
  setToken(data);
  message.success("登录成功！");
  loading.value = false;
  setTimeout(() => {
    router.push({
      name: "home",
    });
  }, 1000);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>

<style>
.login-page {
  width: 100vw;
  height: 100vh;
  background: #f0f2f5 url(../assets/background.svg) no-repeat 50%;
}

.login-panel {
  width: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
