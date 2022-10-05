<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <div class="key" data-key="Q">Q</div>
      <div class="key" data-key="W">W</div>
      <div class="key" data-key="E">E</div>
      <div class="key" data-key="R">R</div>
      <div class="key" data-key="T">T</div>
      <div class="key" data-key="Y">Y</div>
      <div class="key" data-key="U">U</div>
      <div class="key" data-key="I">I</div>
      <div class="key" data-key="O">O</div>
      <div class="key" data-key="P">P</div>
    </div>
    <div class="keyboard-row">
      <div class="key" data-key="A">A</div>
      <div class="key" data-key="S">S</div>
      <div class="key" data-key="D">D</div>
      <div class="key" data-key="F">F</div>
      <div class="key" data-key="G">G</div>
      <div class="key" data-key="H">H</div>
      <div class="key" data-key="J">J</div>
      <div class="key" data-key="K">K</div>
      <div class="key" data-key="L">L</div>
    </div>
    <div class="keyboard-row">
      <div class="key function" data-key="Backspace">⌫</div>
      <div class="key" data-key="Z">Z</div>
      <div class="key" data-key="X">X</div>
      <div class="key" data-key="C">C</div>
      <div class="key" data-key="V">V</div>
      <div class="key" data-key="B">B</div>
      <div class="key" data-key="N">N</div>
      <div class="key" data-key="M">M</div>
      <div class="key function" data-key="Enter">⏎</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';

  onMounted(() => {
    const keys = document.querySelectorAll('[data-key]');
    keys.forEach((k: any) => {
      console.log(typeof k);
    });
  });
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

    .keyboard-row {
        display: flex;
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      .key {
        width: 2rem;
        padding: 10px 0;
        background-color: #5f5f5f;
        border-radius: 0.5rem;
        text-align: center;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 5px;
        }
      }

      .function {
        width: 2.8rem;
      }
    }
  }
</style>