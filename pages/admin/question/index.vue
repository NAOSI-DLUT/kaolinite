<script lang="tsx" setup>
import type { Question } from '~/models/Question';

const { data } = await useFetch<Question[]>('/api/admin/question')
</script>

<template>
  <NuxtLink to="/admin/question/new">New Question</NuxtLink>
  <ElTable :data="data ?? []">
    <ElTableColumn prop="title" label="Title">
      <template #default="{ row }">
        <NuxtLink :to="`/admin/question/${row._id}`">{{ row.title }}</NuxtLink>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="type" label="Type" />
    <ElTableColumn prop="tags" label="Tags" />
    <ElTableColumn prop="score" label="score" />
    <ElTableColumn prop="desktopOnly" label="Desktop Only" />
  </ElTable>
</template>