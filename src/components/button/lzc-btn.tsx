import { defineComponent } from "vue"

const Button = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <button
        w="100%"
        bg="#2EC1CC"
        p="12px"
        un-disabled="opacity-45"
        rounded="22px"
        text="white 14px center"
        justify="center"
        flex="~">
        {props.title}
      </button>
    )
  },
})

export default Button
