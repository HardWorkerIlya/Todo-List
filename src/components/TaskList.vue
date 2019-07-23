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
      <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
        <defs>
          <path id="task__line" stroke="var(--text-unselected-color)" d="M22 12.3h168v0.1z"></path>
          <path id="task__check" stroke="var(--text-unselected-color)" d="M12 13l2 2 5-5"></path>
          <circle id="task__box" cx="15" cy="12.5" r="7"></circle>
        </defs>
      </svg>

      <ul class="tasks-container">
        <li class="task" v-for="(task, index) in tasks" :class="{ checked: !task.state }" :key="index">
          <div class="task__check-place" @click="checkTask($event, index)" />
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="task__icon">
            <use xlink:href="#task__line" class="task__line"></use>
            <use xlink:href="#task__box" class="task__box"></use>
            <use xlink:href="#task__check" class="task__check"></use>
            <use xlink:href="#task__circle" class="task__circle"></use>
          </svg>
          <div class="task__text">{{ task.name }}</div>
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
  data () {
    return {
      tasks: [
        {
          name: '123',
          state: true
        },
        {
          name: '456',
          state: false
        }
      ],
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
    checkTask (e, index) {
      const taskElement = e.target.parentNode
      taskElement.classList.toggle('checked')
      this.tasks[index].state = !this.tasks[index].state
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
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
    background-color: var(--todo-bkg);

    ul {
      list-style: none;
    }

    p {
      margin: 0;
    }

    .current-date {
      align-items: center;
      display: flex;
      justify-content: space-between;

      .date {
        display: flex;
        justify-content: space-between;
        width: 22%;

        .day-number {
          font-size: 2em;
          font-weight: bold;
          line-height: 1em;
        }

        .month-year-wrapper {
          align-items: center;
          display: flex;
          flex-direction: column;
          font-size: .8em;

          .month {
            font-weight: bold;
          }
        }
      }

      .today {
        font-weight: 600;
      }
    }

    .todo-list {
      margin-top: 1em;

      .tasks-container {
        /*overflow-y: auto;*/
        /*max-height: 260px; !*Scroll uando muestra el scroll*!*/

        .task {
          position: relative;
          padding: .7em;

          .task__check-place {
            position: absolute;
            left: 8px;
            top: 7px;
            width: 27px;
            height: 27px;
            cursor: pointer;
            z-index: 10;
          }

          .task__text {
            transition: all .4s linear .4s;
            padding-left: 36px;
            line-height: 25px;
          }

          .task__icon {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            margin: auto;

            fill: none;
            stroke: #27FDC7;
            stroke-width: 1;
            stroke-linejoin: round;
            stroke-linecap: round;

            .task__box {
              stroke-width: 2;
            }
          }

          .task__line,
          .task__box,
          .task__check {
            transition: stroke-dashoffset .8s cubic-bezier(.9,.0,.5,1);
          }

          .task__box {
            stroke-dasharray: 56.1053, 56.1053; stroke-dashoffset: 0;
            transition-delay: 0.8 * 0.2;
          }
          .task__check {
            stroke: #27FDC7;
            stroke-dasharray: 9.8995, 9.8995; stroke-dashoffset: 9.8995;
            transition-duration: 0.8 * 0.4;
          }
          .task__line {
            stroke-dasharray: 168, 1684;
            stroke-dashoffset: 168;
          }

          &.checked {
            .task__text { transition-delay: 0s; color: var(--text-unselected-color); }
            .task__icon {
              .task__box { stroke-dashoffset: 56.1053; transition-delay: 0s; }
              .task__line { stroke-dashoffset: -8; }
              .task__check { stroke-dashoffset: 0; transition-delay: 0.8 * 0.6; }
            }
          }
        }
      }
    }
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