import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('todos', [
      'isInputVisible'
    ]),
    isVisible: {
      get () {
        return this.isInputVisible
      },
      set (v) {
        this.SET_INPUT_VISIBILITY(v)
      }
    }
  },
  methods: {
    ...mapMutations('todos', [
      'SET_INPUT_VISIBILITY'
    ]),
    hideModal () {
      this.isVisible = false
    },
    showModal () {
      this.isVisible = true
    }
  }
}
