<script lang="ts" setup>
import type { ChoiceData, Question } from '~/models/Question';
import { ref } from 'vue';

const { question } = defineProps<{
  question: Question
}>();

const isChoiceData = ref(question.type === 'choice');
</script>

<template>
  <div>
    <h3>{{ question.title }}</h3>
    <p>{{ question.description }}</p>
    <div v-if="question.type == 'choice'">
      <ElRadioGroup>
        <ElRadio v-for="option in (question.data as ChoiceData).options" :key="option" :label="option">{{ option }}
        </ElRadio>
      </ElRadioGroup>
    </div>
    <div v-else-if="question.type == 'text'">
      <ElInput />
    </div>
    <div v-else-if="question.type == 'code'">
      <MonacoEditor class="editor" lang="cpp" :options="{ theme: 'vs-dark' }" />
    </div>
  </div>
</template>

<style scoped>
.editor {
  height: 400px;
}
</style>