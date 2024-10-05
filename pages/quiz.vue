<script lang="ts" setup>
import QuestionCard from '~/components/QuestionCard.vue';
import type { Question } from '~/models/Question';

const { data } = await useFetch<Question[]>('/api/questions');
</script>

<template>
  <QuestionCard v-for="question in data" :key="question._id" :question="question" />
</template>