<template>
  <div class="keyboard" @click="onKeyBoardClick">
    <div class="keyboard-row">
      <div class="key " :class="{ used: used.includes('Q') }" data-key="Q">Q</div>
      <div class="key " :class="{ used: used.includes('W') }" data-key="W">W</div>
      <div class="key " :class="{ used: used.includes('E') }" data-key="E">E</div>
      <div class="key " :class="{ used: used.includes('R') }" data-key="R">R</div>
      <div class="key " :class="{ used: used.includes('T') }" data-key="T">T</div>
      <div class="key " :class="{ used: used.includes('Y') }" data-key="Y">Y</div>
      <div class="key " :class="{ used: used.includes('U') }" data-key="U">U</div>
      <div class="key " :class="{ used: used.includes('I') }" data-key="I">I</div>
      <div class="key " :class="{ used: used.includes('O') }" data-key="O">O</div>
      <div class="key " :class="{ used: used.includes('P') }" data-key="P">P</div>
    </div>
    <div class="keyboard-row">
      <div class="key " :class="{ used: used.includes('A') }" data-key="A">A</div>
      <div class="key " :class="{ used: used.includes('S') }" data-key="S">S</div>
      <div class="key " :class="{ used: used.includes('D') }" data-key="D">D</div>
      <div class="key " :class="{ used: used.includes('F') }" data-key="F">F</div>
      <div class="key " :class="{ used: used.includes('G') }" data-key="G">G</div>
      <div class="key " :class="{ used: used.includes('H') }" data-key="H">H</div>
      <div class="key " :class="{ used: used.includes('J') }" data-key="J">J</div>
      <div class="key " :class="{ used: used.includes('K') }" data-key="K">K</div>
      <div class="key " :class="{ used: used.includes('L') }" data-key="L">L</div>
    </div>
    <div class="keyboard-row">
      <div class="key function" data-key="Backspace">⌫</div>
      <div class="key " :class="{ used: used.includes('Z') }" data-key="Z">Z</div>
      <div class="key " :class="{ used: used.includes('X') }" data-key="X">X</div>
      <div class="key " :class="{ used: used.includes('C') }" data-key="C">C</div>
      <div class="key " :class="{ used: used.includes('V') }" data-key="V">V</div>
      <div class="key " :class="{ used: used.includes('B') }" data-key="B">B</div>
      <div class="key " :class="{ used: used.includes('N') }" data-key="N">N</div>
      <div class="key " :class="{ used: used.includes('M') }" data-key="M">M</div>
      <div class="key function" data-key="Enter">⏎</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    used: string[],
  }>();

  const emit = defineEmits<{
    (event: 'key-press', key: string): void;
  }>();

  function onKeyBoardClick(e: Event) {
    if ( e.target ) {
      // @ts-ignore
      const key = e.target.getAttribute('data-key');
      if ( !key ) return;
      if ( props.used.includes(key) ) return;

      emit('key-press', key);
    }
  }
</script>

<style lang="scss" scoped>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    gap: 0.3em;

    .keyboard-row {
      display: flex;
      gap: 0.3em;

      .key {
        width: 2rem;
        padding: 10px 0;
        background-color: #4f4f4f;
        border-radius: 0.5rem;
        text-align: center;
        cursor: pointer;
        font-weight: bold;

        &:hover {
          background-color: #3a3a3a;
        }
      }

      .used, .used:hover {
        background-color: #1a1a1a;
        color: #2a2a2a;
        cursor: default;
      }

      .function {
        width: 2.8rem;
      }
    }
  }
</style>
