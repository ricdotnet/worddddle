<template>
  <form ref="word" class="form">
    <Char v-for="n in state.length"
          class="char"
          :class="{ 'char_current': state.currentChild === n - 1 }"
          :index="state.currentChild"
          disabled="true"
    />
  </form>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import Char from './Char.vue';

  type WordLength = 5 | 10;

  const word = ref();

  const props = defineProps<{
    length?: WordLength;
  }>();

  const emit = defineEmits<{
    (event: 'submit-word', word: string): void;
  }>();

  const state = reactive({
    length: props.length ?? 5,
    children: computed(() => word.value.children),
    currentChild: 0,
    forbiddenKeys: ['Backspace', 'Enter', 'Meta', 'Escape', 'Shift', 'Meta', 'Control', 'Alt']
  });

  function addNextChar(key: string) {
    if ( state.currentChild < state.length ) {
      state.children[state.currentChild].value = key;
      state.currentChild++;
    }
  }

  function clearPreviousChar() {
    if ( state.currentChild > 0 && state.currentChild <= state.length ) {
      state.currentChild--;
      state.children[state.currentChild].value = '';
    }
  }

  function submitWord() {
    const tryWord: string = Array.from(word.value.children).reduce((w: string, i: any) => w + i.value, '') as string;
    if (tryWord.length < state.length) return;
    emit('submit-word', tryWord);

    state.currentChild = 0;
    Array.from(state.children).forEach((c: any) => {
      c.value = '';
    });
  }

  defineExpose({ addNextChar, clearPreviousChar, submitWord });
</script>

<style scoped lang="scss">
  .form {
    display: flex;

    .char {
      width: 24px;
      font-size: 24px;
      text-align: center;
      padding: 10px;
      border: none;
      border-radius: 10px;

      &_current {
        outline: solid 2px #535bf2;
      }
    }

    .char:not(:last-of-type) {
      margin-right: 10px;
    }

  }
</style>
