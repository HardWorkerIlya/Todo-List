<template>
  <div class="success-checkmark">
    <div class="check-icon" v-if="state">
      <span class="icon-line line-tip"></span>
      <span class="icon-line line-long"></span>
      <div class="icon-circle"></div>
      <div class="icon-fix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkmark',
  props: {
    state: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .success-checkmark {
    width: 22px;
    height: 22px;
    margin: 0 auto;

    .check-icon {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      box-sizing: content-box;
      border: 2px solid #4CAF50;

      &::before {
        top: -1px;
        left: -2px;
        width: 9px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
      }

      &::after {
        top: -2зч;
        left: 8px;
        width: 17px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: rotate-circle 4.25s ease-in;
      }

      &::before, &::after {
        content: '';
        height: 26px;
        position: absolute;
        background: #FFFFFF;
        transform: rotate(-45deg);
      }

      .icon-line {
        height: 2px;
        background-color: var(--control-color);
        display: block;
        border-radius: 2px;
        position: absolute;
        z-index: 10;

        &.line-tip {
          top: 10px;
          left: 3px;
          width: 8px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        &.line-long {
          top: 9px;
          right: 1px;
          width: 12px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }
      }

      .icon-circle {
        top: -2px;
        left: -2px;
        z-index: 10;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        box-sizing: content-box;
        border: 2px solid rgba(76, 175, 80, .5);
      }

      .icon-fix {
        top: 8px;
        width: 5px;
        left: 26px;
        z-index: 1;
        height: 85px;
        position: absolute;
        transform: rotate(-45deg);
        background-color: #FFFFFF;
      }
    }
  }

  @keyframes rotate-circle {
    0% {
      transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
    }
    100% {
      transform: rotate(-405deg);
    }
  }

  @keyframes icon-line-tip {
    0% {
      width: 0;
      left: -1px;
      top: 5px;
    }
    54% {
      width: 0;
      left: -1px;
      top: 5px;
    }
    70% {
      width: 14px;
      left: -2px;
      top: 8px;
    }
    84% {
      width: 8px;
      left: 3px;
      top: 10px;
    }
    100% {
      width: 8px;
      left: 3px;
      top: 10px;
    }
  }

  @keyframes icon-line-long {
    0% {
      width: 0;
      right: 10px;
      top: 12px;
    }
    65% {
      width: 0;
      right: 11px;
      top: 11px;
    }
    /*84% {*/
    /*  width: 5px;*/
    /*  right: 7px;*/
    /*  top: 11px;*/
    /*}*/
    100% {
      width: 12px;
      right: 1px;
      top: 9px;
    }
  }
</style>