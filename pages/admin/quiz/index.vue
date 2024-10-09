<script lang="ts" setup>
import dayjs from 'dayjs';
import type { Quiz } from '~/models/Quiz';

const quizzes = ref<Quiz[]>([]);

onMounted(async () => {
  try {
    quizzes.value = await $fetch<Quiz[]>('/api/admin/quiz', {
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
    <ElTableColumn prop="score" label="分数">
      <template #default="{ row }">
        {{ row.score ?? 'NaN' }}/{{ row.totalScore }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="totalTimeLimit" label="限时" />
    <ElTableColumn prop="startTime" label="开始时间">
      <template #default="{ row }">
        {{ dayjs(row.startTime).format('MM-DD HH:mm:ss') }}
      </template>
    </ElTableColumn>
  </ElTable>
</template>