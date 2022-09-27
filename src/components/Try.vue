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
    chars: new Set(props.word),
  });

  // onBeforeMount(() => {
  //   props.triedWord.split('').forEach((char: string, index: number) => {
  //     isPresent(char, index);
  //   });
  // });


  function isCorrect(char: string, index: number) {
    return char === props.word.charAt(index);
  }

  function isPresent(char: string, index: number) {
    const isPresent = !isCorrect(char, index) && props.word.includes(char);
    if ( !isPresent && !isCorrect(char, index) ) {
      // should I block?
    }

    if ( !state.chars.has(char) ) return;

    if ( isPresent ) {
      state.chars.delete(char);
    }

    return isPresent;
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
