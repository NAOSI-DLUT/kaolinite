<script lang="ts" setup>
import type { Question } from '~/models/Question';
import type { Quiz } from '~/models/Quiz';

const route = useRoute();
const quiz = ref<Quiz>();
const userAnswer = ref<any[]>([]);
const currentQuestionIndex = ref(0);
const questions = ref<Question<unknown>[]>([]);

onMounted(async () => {
  quiz.value = await $fetch(`/api/quiz/${route.params.id}`);
  if (quiz.value) {
    for (const id of quiz.value.questions) {
      questions.value.push(await $fetch(`/api/question/${id}`));
      userAnswer.value.push(null);
    }
  }
})
</script>

<template>
  {{ userAnswer }}
  <ElTabs v-model="currentQuestionIndex">
    <ElTabPane v-for="(question, index) in questions" :key="index" :label="`第${index + 1}题`">
      <QuestionCard :question="question" v-model:userAnswer="userAnswer[index]" />
    </ElTabPane>
  </ElTabs>
</template>