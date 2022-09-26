<template>
  <div v-for="(char, index) in triedWord" :key="index"
       class="char"
       :class="{ isCorrect: isCorrect(char, index), isPresent: (state.firstPresent.char === char && state.firstPresent.index === index) }">
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
    firstPresent: {
      char: '',
      index: -1,
    },
  });

  onBeforeMount(() => {
    props.triedWord.split('').forEach((char: string, index: number) => {
      isPresent(char, index);
    });
  });


  function isCorrect(char: string, index: number) {
    return char.toLowerCase() === props.word.charAt(index).toLowerCase();
  }

  function isPresent(char: string, index: number) {
    const isPresent = !isCorrect(char, index) && props.word.includes(char.toLowerCase());
    if ( !isPresent && !isCorrect(char, index) ) {
      // should I block?
    }

    if ( state.firstPresent.char !== '' ) return;

    if ( isPresent ) {
      state.firstPresent = {
        char: char,
        index: index,
      };
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
