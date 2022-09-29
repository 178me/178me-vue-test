import { computed, defineComponent, onMounted, ref, watch } from "vue"
import ClearBtnSvg from "~/assets/我的/设置/删除.svg"
const Input = defineComponent({
  props: {
    // 清除按钮
    clearable: {
      type: Boolean,
      default: false,
    },
    // 自动聚焦
    autofocus: {
      type: Boolean,
      default: false,
    },
    // v-model绑定的值
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  // 该选项为true 属性会透传到组件的根节点
  inheritAttrs: false,
  setup(props, ctx) {
    // 访问dom对象
    const inputRef = ref()
    // 绑定输入值
    const input = ref(props.modelValue)
    // 监听父组件传过来的modelValue
    watch(
      () => props.modelValue,
      () => {
        input.value = props.modelValue
      }
    )
    // 控制清除按钮是否显示
    const showClearBtn = computed<boolean>(() => {
      return input.value?.length > 0
    })
    // 点击清除按钮事件处理
    function hdlClickClearBtn() {
      ctx.emit("update:modelValue", "")
      inputFocus()
    }
    // 输入框聚焦
    function inputFocus() {
      inputRef.value.focus()
    }
    onMounted(() => {
      props.autofocus && inputFocus()
    })
    return () => (
      <div flex="~ row grow">
        <input
          p="y-13px"
          b="b-1px #EBECED"
          text="16px #333333"
          grow="~"
          focus-visible="outline-none"
          un-placeholder="#C5C6C7"
          ref={inputRef}
          v-model={input.value}
          onUpdate:modelValue={(value: String) =>
            ctx.emit("update:modelValue", value)
          }
          {...ctx.attrs}
        />
        {props.clearable && (
          <img
            v-show={showClearBtn.value}
            onClick={hdlClickClearBtn}
            src={ClearBtnSvg}
            m="y-auto x-10px"
            alt="清除按钮"
          />
        )}
      </div>
    )
  },
})

export default Input
