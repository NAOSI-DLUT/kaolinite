<script lang="ts" setup>
import { type Question, isRadioQuestion, isCheckboxQuestion, isTextQuestion, isCodeQuestion } from '~/models/Question';

const model = defineModel<any>();
const { question } = defineProps<{
  question: Question<any>;
  disabled?: boolean;
}>();

// code question
const lang = ref<string>('cpp');
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
      <ElInput v-else-if="isTextQuestion(question)" v-model="model" :disabled="disabled" />
      <template v-else-if="isCodeQuestion(question)">
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