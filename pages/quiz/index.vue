<script lang="ts" setup>
import dayjs from 'dayjs';
import { type FormInstance } from 'element-plus'
import type { Quiz } from '~/models/Quiz';

const quizzes = ref<Quiz[]>([]);
const formRef = useTemplateRef<FormInstance>('formRef');
const form = reactive({
  uid: '',
  tag: '网络与开源'
})

onMounted(() => {
  form.uid = localStorage.getItem('uid') ?? '';
})

const validateUid = (rule: any, value: string, callback: any) => {
  const uidPattern = /^\d{11}$/;
  if (!uidPattern.test(value)) {
    callback(new Error('学号必须为11位纯数字'));
  } else {
    localStorage.setItem('uid', value);
    callback();
  }
}

const rules = {
  uid: [{ required: true, validator: validateUid, trigger: 'blur' }],
  tag: [{ required: true, message: '请选择赛道', trigger: 'blur' }]
}

const sumbit = async (formRef: FormInstance | null) => {
  await formRef?.validate(async (valid) => {
    if (valid) {
      try {
        const quiz = await $fetch<Quiz>(`/api/quiz`, {
          method: 'POST',
          body: { uid: form.uid, tags: [form.tag] }
        });
        navigateTo(`/quiz/${quiz._id}`);
      } catch (e: any) {
        ElNotification({
          title: '创建测试失败',
          message: e.data?.message ?? e.message ?? e,
          type: 'error',
          duration: 0
        })
      }
    }
  });
}

watch(form, async (value) => {
  if (/^\d{11}$/.test(value.uid)) {
    quizzes.value = await $fetch<Quiz[]>(`/api/quiz?uid=${form.uid}`);
  }
})
</script>

<template>
  <ElForm :model="form" :rules="rules" ref="formRef">
    <ElFormItem>
      <ElAlert title="学号作为您兑换奖品的唯一依据，请务必检查填写无误" show-icon :closable="false" />
    </ElFormItem>
    <ElFormItem label="学号" prop="uid">
      <ElInput v-model="form.uid" placeholder="学号" />
    </ElFormItem>
    <ElFormItem label="赛道" prop="tag">
      <ElRadioGroup v-model="form.tag">
        <ElRadio value="网络与开源" border>
          <ElSpace>
            <span>网络与开源</span>
            <ElTag>萌新首选</ElTag>
          </ElSpace>
        </ElRadio>
        <ElRadio value="硬件" border>硬件</ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="sumbit(formRef)">开始答题</ElButton>
    </ElFormItem>
  </ElForm>
  <p>历史答题记录</p>
  <ElTable :data="quizzes">
    <ElTableColumn prop="startTime" label="开始时间">
      <template #default="{ row }">
        {{ dayjs(row.startTime).format('MM-DD HH:mm:ss') }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="score" label="得分">
      <template #default="{ row }">
        {{ row.score ?? 'NaN' }}/{{ row.totalScore }}
      </template>
    </ElTableColumn>
    <ElTableColumn>
      <template #default="{ row }">
        <NuxtLink :to="`/quiz/${row._id}`">
          <template
            v-if="row.answers == null && Date.now() < new Date(row.startTime).getTime() + row.totalTimeLimit * 1000">继续答题</template>
          <template v-else>查看记录</template>
        </NuxtLink>
      </template>
    </ElTableColumn>
  </ElTable>
</template>