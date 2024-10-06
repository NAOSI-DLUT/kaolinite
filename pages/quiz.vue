<script lang="ts" setup>
import QuestionCard from '~/components/QuestionCard.vue';
import { type Question } from '~/models/Question';

const { data } = await useFetch<Question<unknown>[]>('/api/questions');
const userAnswer = ref<any[]>(Array(data.value?.length));
</script>

<template>
  {{ userAnswer }}
  <template v-for="(question, index) in data">
    <QuestionCard :question="question" v-model="userAnswer[index]" />
  </template>
</template>