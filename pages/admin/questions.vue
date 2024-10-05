<script lang="ts" setup>
import type { Question } from '~/models/Question';

const { data } = await useFetch<Question[]>('/api/admin/question')
</script>

<template>
  <div>
    <Question v-for="question in data" :key="question._id" :question="question" />
  </div>
</template>