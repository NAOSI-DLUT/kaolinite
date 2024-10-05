<script lang="ts" setup>
const route = useRoute()
const text = ref('')


const updateQuestion = async () => {
  try {
    const updateResult = await $fetch(`/api/admin/question`, {
      method: 'POST',
      body: JSON.parse(text.value),
    })
    alert(JSON.stringify(updateResult, null, 2))
  } catch (e: any) {
    alert(e.data.message ?? e)
  }
}
</script>

<template>
  <div>
    <ElButton type="primary" @click="updateQuestion">保存</ElButton>
    <MonacoEditor class="editor" v-model="text" lang="json" :options="{ theme: 'vs-dark' }" />
  </div>
</template>

<style scoped>
.editor {
  height: 500px;
}
</style>