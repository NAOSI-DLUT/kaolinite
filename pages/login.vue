<script lang="ts" setup>
const username = ref('');
const password = ref('');

const login = async () => {
  try {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    localStorage.setItem('token', data.token);
    navigateTo('/admin');
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <ElInput v-model="username" placeholder="用户名" />
  <ElInput v-model="password" placeholder="密码" type="password" />
  <ElButton type="primary" @click="login">登录</ElButton>
</template>