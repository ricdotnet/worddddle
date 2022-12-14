<template>
  <div class="title">Worddddle</div>
  <div class="container">
    <div v-for="(triedWord, index) of state.tries" :key="index" class="word">
      <Try :word="state.word" :triedWord="triedWord"/>
    </div>
    <template v-if="state.hasWon">
      Congratulations :D
    </template>
    <template v-else-if="state.tries.length === 5">
      You have no more tries :( <br>
      The word was {{ state.word }}
    </template>
    <template v-else>
      <WordInput ref="wordInput" :length="5" @submitWord="onSubmitWord"/>
    </template>
  </div>
  <Keyboard @key-press="onKeyPress" :used="state.used"/>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive, ref } from 'vue';
  import axios from 'axios';
  import WordInput from './components/WordInput.vue';
  import Try from './components/Try.vue';
  import Keyboard from './components/Keyboard.vue';

  interface IWordInput {
    addNextChar: (key: string) => void;
    clearPreviousChar: () => void;
    submitWord: () => void;
  }

  const wordInput = ref<IWordInput>();

  const state = reactive({
    tries: <string[]>[],
    word: '',
    hasWon: false,
    used: <string[]>[],
  });

  onBeforeMount(async () => {
    const response = await axios.get('https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt');
    const words = response.data.split('\n');
    state.word = words[Math.ceil(Math.random() * words.length)].toUpperCase();
  });

  function onSubmitWord(word: string) {
    state.tries.push(word);

    state.used = [...state.used, ...[...word].filter(c => !state.word.includes(c))];

    if ( word === state.word!.toUpperCase() ) {
      state.hasWon = true;
    }
  }

  function onKeyPress(key: string) {
    if ( key === 'Enter' ) {
      wordInput.value?.submitWord();
      return;
    }

    if ( key === 'Backspace' ) {
      wordInput.value?.clearPreviousChar();
      return;
    }

    wordInput.value?.addNextChar(key);
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 2em;
    line-height: 2em;
    text-align: center;
    margin-bottom: 50px;
    border-bottom: 1px solid #1a1a1a;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .word {
    display: flex;
    margin-bottom: 20px;
  }
</style>
