import { defineComponent, ref, watch } from "vue"

const Toggle = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "toggle"],
  setup(props, ctx) {
    const checked = ref(props.modelValue)
    // 监听父组件传过来的modelValue
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue
      }
    )
    return () => (
      <label
        onClick={() => ctx.emit("toggle", checked.value)}
        flex="inline">
        <div relative="~">
          <input
            class="sr-only peer"
            type="checkbox"
            v-model={checked.value}
            onUpdate:modelValue={(value: Boolean) =>
              ctx.emit("update:modelValue", value)
            }
          />
          <div
            w="46px"
            h="28px"
            bg="#E5E6E7"
            rounded="14px"
            peer-checked="bg-#2ec1cc"></div>
          <div
            w="24px"
            h="24px"
            bg="white"
            rounded="full"
            position="absolute left-2px top-2px"
            transition="~"
            peer-checked="translate-x-75%"></div>
        </div>
      </label>
    )
  },
})

export default Toggle
