<script lang="ts" setup>
import dayjs from 'dayjs';
import type { Question } from '~/models/Question';
import type { Quiz } from '~/models/Quiz';

const route = useRoute();
const quiz = ref<Quiz>();
const userAnswers = ref<any[]>([]);
const currentQuestionIndex = ref('0');
const questions = ref<Question<unknown>[]>([]);
const remainingTime = ref(0);
let timer: NodeJS.Timeout;

const ongoing = computed(() => {
  return quiz.value && quiz.value.answers == null && Date.now() < new Date(quiz.value.startTime).getTime() + quiz.value.totalTimeLimit * 1000;
})

onMounted(async () => {
  quiz.value = await $fetch<Quiz>(`/api/quiz/${route.params.id}`);
  if (quiz.value) {
    questions.value = await $fetch<Question<unknown>[]>(`/api/question?quiz=${quiz.value._id}`);
    userAnswers.value = quiz.value.answers ?? Array.from({ length: questions.value.length }, (_, index) => {
      const question = questions.value[index];
      if (['checkbox', 'text'].includes(question.type)) {
        return [];
      }
      return undefined;
    });
    if (ongoing.value) {
      timer = setInterval(() => {
        if (quiz.value) {
          remainingTime.value = Math.floor(quiz.value.totalTimeLimit - (Date.now() - new Date(quiz.value.startTime).getTime()) / 1000)
          if (remainingTime.value <= 0) {
            remainingTime.value = 0;
            clearInterval(timer);
            submit();
          }
        }
      }, 1000);
    }
  }

})

const submit = async () => {
  try {
    await $fetch(`/api/quiz/${route.params.id}`, {
      method: 'PUT',
      body: { answers: userAnswers.value }
    });
    clearInterval(timer);
    navigateTo('/quiz');
  } catch (e: any) {
    ElNotification({
      title: '提交失败',
      message: e.data?.message ?? e.message ?? e,
      type: 'error',
      duration: 0
    })
  }
}

</script>

<template>
  <ElSpace wrap>
    <span>开始时间：{{ dayjs(quiz?.startTime).format('MM-DD HH:mm:ss') }}</span>
    <span>总分：{{ quiz?.totalScore }}分</span>
    <span>剩余时间：{{ remainingTime }}/{{ quiz?.totalTimeLimit }}s</span>
  </ElSpace>
  <ElTabs v-model="currentQuestionIndex">
    <ElTabPane v-for="(question, index) in questions" :key="index" :label="`第${index + 1}题`">
      <ElAlert class="alert" v-if="!ongoing && quiz?.questionScores"
        :title="`本题得分：${quiz.questionScores[index] ?? '未提交'}`"
        :type="quiz.questionScores[index] === question.score ? 'success' : 'error'" :closable="false" />
      <QuestionCard :question="question" v-model="userAnswers[index]" :disabled="!ongoing" :index="index"
        :quiz="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id" />
    </ElTabPane>
    <ElTabPane label="完成">
      <ElButton type="primary" @click="submit" :disabled="!ongoing">提交答案</ElButton>
    </ElTabPane>
  </ElTabs>
</template>

<style scoped>
.alert {
  margin-bottom: 10px;
}
</style>