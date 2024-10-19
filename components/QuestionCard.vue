<script lang="ts" setup>
import { type Question, isRadioQuestion, isCheckboxQuestion, isTextQuestion, isCodeQuestion } from '~/models/Question';

const model = defineModel<any>();
const { question, index, quiz } = defineProps<{
  question: Question<any>;
  disabled?: boolean;
  index: number;
  quiz: string;
}>();

// code question
const lang = ref<string>('cpp');
const token = ref<string>('');
const testcases = ref<string[]>([]);

const judge = async () => {
  if (token.value) {
    const data = await $fetch<{ testcases: { status: number }[] }>('/api/judge', {
      method: 'POST',
      body: {
        token: token.value,
      }
    });
    testcases.value = data.testcases.map(testcase => {
      switch (testcase.status) {
        case 0:
          return 'Pending';
        case 1:
          return 'Accepted';
        case 2:
          return 'Compile Error';
        case 3:
          return 'Compile Timeout';
        case 4:
          return 'Runtime Error';
        case 5:
          return 'Runtime Timelimit Exceeded';
        case 6:
          return 'Memory Limit Exceeded';
        case 7:
          return 'Output Limit Exceeded';
        case 8:
          return 'Wrong Answer';
        default:
          return 'Unknown';
      }
    });
    if (testcases.value.every(testcase => testcase !== 'Pending')) {
      token.value = '';
    }
  } else {
    const data = await $fetch<{ token: string }>('/api/judge', {
      method: 'POST',
      body: {
        code: model.value,
        id: quiz,
        index: index
      }
    })
    token.value = data.token;
  }
}
</script>

<template>
  <div>
    <ElSpace>
      <b>{{ question.title }}</b>
      <ElTag>{{ question.score }}分</ElTag>
    </ElSpace>
    <p>{{ question.description }}</p>
    <div>
      <ElRadioGroup v-if="isRadioQuestion(question)" class="radio-group" v-model="model" :disabled="disabled">
        <ElRadio v-for="(option, index) in question.data.options" :value="index" :key="option" :label="option">{{ option
          }}
        </ElRadio>
      </ElRadioGroup>
      <ElCheckboxGroup v-else-if="isCheckboxQuestion(question)" class="checkbox-group" v-model="model"
        :disabled="disabled">
        <ElCheckbox v-for="(option, index) in question.data.options" :value="index" :key="option" :label="option">{{
          option }}
        </ElCheckbox>
      </ElCheckboxGroup>
      <ElSpace v-else-if="isTextQuestion(question)">
        <ElInput v-for="index in question.data.blankCount" v-model="model[index - 1]" :disabled="disabled" />
      </ElSpace>
      <template v-else-if="isCodeQuestion(question)">
        <div>测试点数据：</div>
        <div>
          <ElButton>提交评测</ElButton>
        </div>
        <div class="editor-head">
          <div>代码编辑器</div>
          <ElSelect v-model="lang" placeholder="Select a language" style="width: 200px;" :disabled="disabled">
            <ElOption label="C++" value="cpp" />
          </ElSelect>
        </div>
        <MonacoEditor class="editor" v-model="model" :lang :options="{ readOnly: disabled }" />
      </template>
      <div v-else>Unsupported Question Type</div>
    </div>
  </div>
</template>

<style scoped>
/* radio question */
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 20px;
}

/* checkbox question */
.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 20px;
}

/* code question */
.editor-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid lightgray;
}

.editor {
  height: 400px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
</style>