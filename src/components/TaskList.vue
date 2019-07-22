<template>
  <div class="todo-container">
    <header class="current-date">
      <div class="date">
        <span class="day-number">{{ date.dayNum }}</span>
        <div class="month-year-wrapper">
          <span class="month">{{ date.month }}</span>
          <span class="year">{{ date.year }}</span>
        </div>
      </div>
      <div class="today"><span>{{ date.dayName }}</span></div>
    </header>
    <main class="todo-list">
      <ul class="tasks-container">
        <li class="task-container" v-for="(index, task) in tasks" v-bind:class="{ checked: !task.state }" :key="index">
          <p class="task">{{ task.name }}</p>
          <input type="radio" v-on:click="checkTask" />
        </li>
      </ul>
    </main>
<!--    <button class="add-task-btn" v-on:click="addTask">-->
<!--      <span>+</span>-->
<!--    </button>-->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      task: '',
      date: {
        dayNum: '',
        month: '',
        year: '',
        dayName: ''
      }
    }
  },
  mounted: function() {
    this.getCurrentDay()
  },
  methods: {
    getCurrentDay: function() {
      const today = new Date()
      let dayName = moment(today).format('dddd')

      let [ monthDay, year ] = moment().format('ll').split(',')
      let [ month, day ] = monthDay.split(' ')

      month = month.toUpperCase()
      dayName = dayName.toUpperCase()

      this.date.dayNum = day
      this.date.month = month
      this.date.year = year
      this.date.dayName = dayName
    },
    addTask: function() {
      const inputTask = prompt('Add a new task')
      if(inputTask.trim()) {
        var objTask = {
          name: inputTask,
          state: true
        }
        this.tasks.unshift(objTask)
      }
    },
    checkTask: function(e){
      const taskElement = e.target.parentNode
      taskElement.classList.toggle('checked')
    }
  },
  computed: {
  }
}
</script>

<style>
  .todo-container {
    height: calc(100vh - 40px);
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    position: relative;
    padding: 2em;
    width: 100%;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.18);
  }

  ul {
    list-style: none;
  }

  p {
    margin: 0;
  }

  .todo-container {
    background-color: var(--todo-bkg);
  }

  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  header .date {
    display: flex;
    justify-content: space-between;
    width: 22%;
  }

  header .date .day-number {
    font-size: 2em;
    font-weight: bold;
    line-height: 1em;
  }

  header .date .month-year-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: .8em;
  }

  header .date .month-year-wrapper .month {
    font-weight: bold;
  }

  header .today {
    font-weight: 600;
  }

  /*TODO BODY*/
  main.todo-list {
    margin-top: 1em;
  }

  main.todo-list .tasks-container {
    overflow-y: auto;
    max-height: 260px; /*Scroll uando muestra el scroll*/
  }

  main.todo-list .tasks-container li.task-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .7em;
  }

  li.task-container.checked p {
    color: var(--text-unselected-color);
    text-decoration: line-through;
    transition: all 500ms ease-in-out;
  }

  li.task-container.checked input {
    border-color: var(--control-color);
    transition: all 500ms ease-in-out;
  }

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    border: 3px solid var(--text-unselected-color);
    border-radius: 50%;
    cursor: pointer;
    width: 25px;
    height: 25px;
    outline: none;
  }

  button.add-task-btn {
    background-color: var(--control-color);
    border: none;
    border-radius: 50%;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    height: 90px;
    width: 90px;
    position: absolute;
    bottom: -45px;
    left: calc(190px - 45px);
    outline: none;
    transition: 200ms ease-in-out;
  }

  button.add-task-btn span {
    font-size: 3em;
    font-weight: bold;
    color: #46BE8B;
    font-family: none;
  }

  button.add-task-btn:active {
    transform: scale(.9);
  }
</style>