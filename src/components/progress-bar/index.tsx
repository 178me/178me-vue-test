import { defineComponent, PropType, computed } from "vue"
import { calcPercentage } from "~/utils/index"
/*
   仅需的状态: 最大值，当前值
   callback: 开始, 暂停，完成
 */

const ProgressBar = defineComponent({
  props: {
    total: {
      type: Number,
    },
    complete: {
      type: Number,
    },
    startCBK: Function,
    pauseCBK: Function,
    finishCBK: Function,
    errorCBK: Function,
    totalBarClass: {
      type: String,
      default: "rounded-22px h-2px bg-#EDEFF2 w-full",
    },
    completeBarClass: {
      type: String,
      default: "rounded-22px h-full bg-#2EC1CC",
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  expose: ["progressPercentage"],
  setup(props, ctx) {
    const calcProgressValue = computed(() => {
      let progressVal = calcPercentage(props.complete, props.total)
      return progressVal <= 100 ? progressVal : 0
    })
    return () => (
      <>
        <div
          v-show={props.visible}
          id="totalBar"
          flex="~ row"
          class={props.totalBarClass}>
          <div
            id="completeBar"
            class={props.completeBarClass}
            style={`width: ${calcProgressValue.value}%;`}></div>
        </div>
      </>
    )
  },
})

export default ProgressBar
