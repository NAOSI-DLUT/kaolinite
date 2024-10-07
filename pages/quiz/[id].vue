<script lang="ts" setup>
import type { Question } from '~/models/Question';

const route = useRoute();
const { data } = await useFetch<Question<unknown>[]>(`/api/quiz/${route.params.id}`)
const userAnswer = ref<any[]>(Array(data.value?.length));

</script>

<template>
  {{ userAnswer }}
  <template v-for="(question, index) in data">
    <QuestionCard :question="question" v-model="userAnswer[index]" />
  </template>
</template>