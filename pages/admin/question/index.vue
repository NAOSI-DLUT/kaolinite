<script lang="ts" setup>
import type { Question } from '~/models/Question';

const questions = ref<Question<unknown>[]>([]);

onMounted(async () => {
  try {
    questions.value = await $fetch('/api/admin/question', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  } catch {
    localStorage.removeItem('token');
    navigateTo('/login');
  }
})
</script>

<template>
  <NuxtLink to="/admin/question/new">New Question</NuxtLink>
  <ElTable :data="questions">
    <ElTableColumn prop="title" label="Title">
      <template #default="{ row }">
        <NuxtLink :to="`/admin/question/${row._id}`">{{ row.title }}</NuxtLink>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="type" label="Type" />
    <ElTableColumn prop="tags" label="Tags" />
    <ElTableColumn prop="score" label="score" />
    <ElTableColumn prop="desktopOnly" label="Desktop Only" />
  </ElTable>
</template>