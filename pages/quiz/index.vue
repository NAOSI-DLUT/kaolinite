<script lang="ts" setup>
import QuestionCard from '~/components/QuestionCard.vue';
import { type Question } from '~/models/Question';

const { data } = await useFetch<Question<unknown>[]>('/api/quiz', {
  method: 'POST',
  body: { uid: 0 }
  // TODO: body 中要包含表示学号的 uid
});
const userAnswer = ref<any[]>(Array(data.value?.length));
</script>

<template>
  <!-- TODO: 改成一个输入框输入学号，请求后获得对应的 quiz id 再跳转到对应的 /quiz/:id -->
  {{ userAnswer }}
  <template v-for="(question, index) in data">
    <QuestionCard :question="question" v-model="userAnswer[index]" />
  </template>
</template>