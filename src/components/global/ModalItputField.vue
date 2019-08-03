<template>
  <transition name="modal">
    <div v-show="isVisible" class="modal-wrapper" @click.self="hideModal">
      <transition name="input">
        <div v-show="isVisible" class="input-container">
          <input v-model="task" @keyup.enter="setTask" class="input-field" ref="input" type="text">
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import modal from '@/mixins/modal'
import { mapActions } from 'vuex'

export default {
  name: 'ModalItputField',
  mixins: [modal],
  updated () {
    this.$refs.input.focus()
  },
  data () {
    return {
      task: ''
    }
  },
  methods: {
    ...mapActions('todos', [
      'addTaskByDate'
    ]),
    setTask () {
      if (this.task) {
        this.addTaskByDate({task: this.task})
        this.hideModal()
      }
    }
  }
}
</script>

<style lang="scss">
  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .input-container {
      max-width: 425px;
      width: 100%;
      height: 50px;
      background-color: #fff;
      box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.18);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      overflow: hidden;
      margin-bottom: 20px;

      @media only screen and (max-width: 425px) {
        margin: 0;
      }

      .input-field {
        outline: none;
        padding: 16px;
        font-size: 16px;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity .5s;
  }
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }
  .input-enter-active,
  .input-leave-active {
    transition: transform .5s;
  }
  .input-enter,
  .input-leave-to {
    transform: translateY(50px);
  }
</style>