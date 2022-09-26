<template>
  <div v-for="(triedWord, index) of state.tries" :key="index" class="word">
    <Try :word="state.word" :triedWord="triedWord"/>
  </div>
  <template v-if="state.hasWon">
    Congratulations :D
  </template>
  <template v-else-if="state.tries.length === 5">
    You have no more tries :(
  </template>
  <template v-else>
    <Word :length="5" @submitWord="onSubmitWord"/>
  </template>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive } from 'vue';
  import Word from './components/WordInput.vue';
  import Try from './components/Try.vue';
  import axios from 'axios';

  const state = reactive({
    tries: <string[]>[],
    word: inject<string>('word'),
    hasWon: false,
  });

  onBeforeMount(async () => {
    const response = await axios.get('https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt');
    const words = response.data.split('\n');
    state.word = words[Math.ceil(Math.random() * words.length)];
  })

  function onSubmitWord(word: string) {
    state.tries.push(word);
    if ( word === state.word!.toUpperCase() ) {
      state.hasWon = true;
    }
  }
</script>

<style scoped lang="scss">
  .word {
    display: flex;
    margin-bottom: 20px;
  }
</style>
