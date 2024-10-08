<script lang="ts" setup>
import type { Quiz } from '~/models/Quiz';

const quizzes = ref<Quiz[]>([]);

onMounted(async () => {
  try {
    quizzes.value = await $fetch('/api/admin/quiz', {
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
  <ElTable :data="quizzes">
    <ElTableColumn prop="uid" label="学号" />
    <ElTableColumn prop="score" label="score">
      <template #default="{ row }">
        {{ row.score }}/{{ row.totalScore }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="totalTimeLimit" label="Total Time Limit" />
    <ElTableColumn prop="startTime" label="Start Time" />
  </ElTable>
</template>