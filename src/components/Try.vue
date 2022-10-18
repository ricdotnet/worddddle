<template>
  <div v-for="(char, index) in triedWord" :key="index"
       class="char"
       :class="{ isCorrect: isCorrect(char, index), isPresent: isPresent(char, index) }">
    {{ char }}
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';

  const props = defineProps<{
    triedWord: string;
    word: string;
  }>();

  const state = reactive({
    marked: [0],
  });

  onBeforeMount(() => {
    const chars: string[] = [];

    // do not question me on this please
    state.marked.pop();

    props.triedWord.split('').forEach((char: string, index: number) => {
      if (!chars.includes(char) && props.word.split('').includes(char)) {
        chars.push(char);
        state.marked.push(index);
      }
    });
  });


  function isCorrect(char: string, index: number) {
    return char === props.word.charAt(index);
  }

  function isPresent(char: string, index: number) {
    if (isCorrect(char, index)) return;
    return state.marked.includes(index) && !isCorrect(char, index);
  }
</script>

<style scoped lang="scss">
  .char {
    width: 24px;
    font-size: 24px;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: #1a1a1a;
  }

  .char:not(:last-of-type) {
    margin-right: 10px;
  }

  .isCorrect {
    background-color: green;
  }

  .isPresent {
    background-color: orange;
  }
</style>
