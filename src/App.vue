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
      <Word :length="5" @submitWord="onSubmitWord"/>
    </template>
    {{ state.word }}
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import Word from './components/WordInput.vue';
  import Try from './components/Try.vue';
  import axios from 'axios';

  const state = reactive({
    tries: <string[]>[],
    word: '',
    hasWon: false,
  });

  onBeforeMount(async () => {
    const response = await axios.get('https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt');
    const words = response.data.split('\n');
    state.word = words[Math.ceil(Math.random() * words.length)].toUpperCase();
  });

  function onSubmitWord(word: string) {
    state.tries.push(word);
    if ( word === state.word!.toUpperCase() ) {
      state.hasWon = true;
    }
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
