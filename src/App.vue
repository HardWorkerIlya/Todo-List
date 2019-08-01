<template>
  <div id="app">
    <task-list />
    <input-field />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import InputField from '@/components/global/ModalItputField.vue'

export default {
  name: 'app',
  components: {
    TaskList,
    InputField
  }
}
</script>

<style>
  :root {
    --body-bkg: #F0EFE9;
    --todo-bkg: #FFFFFF;
    --text-color: #5F6271;
    --text-unselected-color: #d7d7dc;
    --control-color: #50E3A4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--body-bkg);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: var(--text-color);
  }

  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 425px;
    width: 100%;
    min-height: 100vh;
  }
</style>
