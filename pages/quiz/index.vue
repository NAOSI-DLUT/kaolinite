<script lang="ts" setup>
import type { Quiz } from '~/models/Quiz';

const quizzes = ref<Quiz[]>([]);
const uid = ref('');
const tag = ref('');

const requestQuiz = async () => {
  const quiz = await $fetch(`/api/quiz`, {
    method: 'POST',
    body: { uid: uid.value }
  })
}
</script>

<template>
  <ElForm>
    <ElFormItem>
      <ElAlert title="学号作为您兑换奖品的唯一依据，请务必检查填写无误" show-icon :closable="false" />
    </ElFormItem>
    <ElFormItem label="学号">
      <ElInput v-model="uid" placeholder="学号" />
    </ElFormItem>
    <ElFormItem label="赛道">
      <ElRadioGroup v-model="tag">
        <ElRadio value="tag1" border>
          <ElSpace>
            <span>网络与开源</span>
            <ElTag>萌新首选</ElTag>
          </ElSpace>
        </ElRadio>
        <ElRadio value="tag2" border>硬件</ElRadio>
        <ElRadio value="tag3" border>算法</ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="requestQuiz">开始答题</ElButton>
    </ElFormItem>
  </ElForm>
  <p>历史答题记录</p>
  <ElTable :data="quizzes">
    <ElTableColumn prop="score" label="得分">
      <template #default="{ row }">
        {{ row.score }}/{{ row.totalScore }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="startTime" label="开始时间" />
    <ElTableColumn>
      <template #default="{ row }">
        <ElButton type="primary" @click="() => navigateTo(`/quiz/${row._id}`)">继续答题</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>