<script lang="ts" setup>
import type { Question } from '~/models/Question';

const route = useRoute()
const { data } = await useFetch<Question<unknown>>(`/api/admin/question/${route.params.id}`)
const text = ref(JSON.stringify(data.value, null, 2))


const updateQuestion = async () => {
  const updateResult = await $fetch(`/api/admin/question/${route.params.id}`, {
    method: 'PUT',
    body: JSON.parse(text.value),
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
    <MonacoEditor class="editor" v-model="text" lang="json" :options="{ theme: 'vs-dark' }" />
  </div>
</template>

<style scoped>
.editor {
  height: 500px;
}
</style>