<script lang="ts" setup>
import type { Quiz } from '~/models/Quiz';

const quizzes = ref<Quiz[]>([]);
const uid = ref('');
const tag = ref('');

const requestQuiz = async () => {
  const quiz = await $fetch(`/api/quiz`, {
    method: 'POST',
    body: { uid: uid.value }
  })
}
</script>

<template>
  <ElInput v-model="uid" placeholder="学号" />
  <ElRadioGroup v-model="tag">
    <ElRadio value="tag1" border>Tag1</ElRadio>
    <ElRadio value="tag2" border>Tag2</ElRadio>
  </ElRadioGroup>
  <ElButton type="primary" @click="requestQuiz">Request Quiz</ElButton>
  <div>历史答题记录</div>
  <ElTable :data="quizzes">
    <ElTableColumn prop="score" label="score">
      <template #default="{ row }">
        {{ row.score }}/{{ row.totalScore }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="totalTimeLimit" label="Total Time Limit" />
    <ElTableColumn prop="startTime" label="Start Time" />
    <ElTableColumn>
      <template #default="{ row }">
        <ElButton type="primary" @click="() => navigateTo(`/quiz/${row._id}`)">继续答题</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>