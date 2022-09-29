import { defineComponent } from "vue"

const Tip = defineComponent({
  props: {
    info: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div p="x-16px y-14px" text="14px #757575">
        <span>{props.info}</span>
      </div>
    )
  },
})

export default Tip
