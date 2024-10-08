<script lang="ts" setup>
import type { Question } from '~/models/Question';
import type { Quiz } from '~/models/Quiz';

const route = useRoute();
const quiz = ref<Quiz>();
const userAnswer = ref<any[]>([]);
const currentQuestionIndex = ref('0');
const questions = ref<Question<unknown>[]>([]);

onMounted(async () => {
  // TODO: wait for backend
  // quiz.value = await $fetch(`/api/quiz/${route.params.id}`);
  quiz.value = await $fetch(`/api/quiz`, {
    method: 'POST',
    body: { uid: 0 }
  })
  if (quiz.value) {
    // for (const id of quiz.value.questions) {
    //   questions.value.push(await $fetch(`/api/question/${id}`));
    //   userAnswer.value.push(null);
    // }
    questions.value = quiz.value;
  }
})

const submit = async () => {
  // const result = await $fetch(`/api/quiz/${route.params.id}`, {
  //   method: 'PUT',
  //   body: { answers: userAnswer.value }
  // });
  navigateTo('/quiz');
}
</script>

<template>
  {{ questions }}
  {{ currentQuestionIndex }}
  {{ userAnswer }}
  <ElTabs v-model="currentQuestionIndex">
    <ElTabPane v-for="(question, index) in questions" :key="index" :label="`第${index + 1}题`">
      <QuestionCard :question="question" v-model:userAnswer="userAnswer[index]" />
    </ElTabPane>
    <ElTabPane label="完成">
      <ElButton type="primary" @click="submit">提交答案</ElButton>
    </ElTabPane>
  </ElTabs>
</template>