<template>
  <form ref="word" class="form">
    <Char v-for="n in state.length"
          class="char"
          :class="{ 'char_current': state.currentChild === n - 1 }"
          :index="state.currentChild"
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

  // TODO: this can be abstracted
  // addEventListener can be inside an utils file and the cb passed in
  document.addEventListener('keyup', (e) => {
    if ( e.key === 'Enter' && state.currentChild === state.children.length ) {
      const tryWord = Array.from(word.value.children).reduce((w, i: any) => w + i.value, '');
      emit('submit-word', <string>tryWord);

      // reset the word inputs
      state.currentChild = 0;
      Array.from(state.children).forEach((c: any) => {
        c.value = '';
      });

      return;
    }
    if ( e.key === 'Backspace' && state.currentChild > 0 ) {
      state.currentChild--;
      state.children[state.currentChild].value = '';
      return;
    }
    if ( state.currentChild < state.children.length && !state.forbiddenKeys.includes(e.key) ) {
      state.children[state.currentChild].value = e.key.toUpperCase();
      state.currentChild++;
      return;
    }
  });

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
