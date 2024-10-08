<script lang="ts" setup>
import type { Question } from '~/models/Question';

const route = useRoute()
const questionJsonText = ref('')

onMounted(async () => {
  try {
    const question = await $fetch(`/api/admin/question/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    questionJsonText.value = JSON.stringify(question, null, 2)
  } catch {
    localStorage.removeItem('token')
    navigateTo('/login')
  }
})

const updateQuestion = async () => {
  const updateResult = await $fetch(`/api/admin/question/${route.params.id}`, {
    method: 'PUT',
    body: JSON.parse(questionJsonText.value),
  })
  alert(JSON.stringify(updateResult, null, 2))
}

const deleteQuestion = async () => {
  const deleteResult = await $fetch(`/api/admin/question/${route.params.id}`, {
    method: 'DELETE',
  })
  alert(JSON.stringify(deleteResult, null, 2))
}
</script>

<template>
  <div>
    <ElButton type="primary" @click="updateQuestion">保存</ElButton>
    <ElButton type="danger" @click="deleteQuestion">删除</ElButton>
    <MonacoEditor class="editor" v-model="questionJsonText" lang="json" :options="{ theme: 'vs-dark' }" />
  </div>
</template>

<style scoped>
.editor {
  height: 500px;
}
</style>