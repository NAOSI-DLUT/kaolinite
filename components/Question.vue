<script lang="ts" setup>
import type { Question } from '~/models/Question';

const { question } = defineProps<{
  question: Question
}>()
</script>

<template>
  <div>{{ question._id }}</div>
</template>