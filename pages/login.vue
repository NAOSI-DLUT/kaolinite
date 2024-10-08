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
  <ElForm>
    <ElFormItem>
      <ElInput v-model="username" placeholder="用户名" />
    </ElFormItem>
    <ElFormItem>
      <ElInput v-model="password" placeholder="密码" type="password" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="login">登录</ElButton>
    </ElFormItem>
  </ElForm>
</template>