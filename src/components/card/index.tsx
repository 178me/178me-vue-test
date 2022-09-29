import { defineComponent, PropType, isRef, render } from "vue"
import type { Ref } from "vue"
import JoinSvg from "~/assets/设置路径.svg"

export interface CardContent {
  icon: string
  title: string
  label: Ref<string>
  click: () => void
}
const CardItem = defineComponent({
  props: {
    content: Object as PropType<CardContent>,
  },
  setup(props) {
    return () => (
      <>
        <div
          flex="~ row"
          p="y-16px r-16px"
          class="justify-between"
          onClick={() => {
            props.content?.click && props.content?.click()
          }}>
          {" "}
          <div flex="~" class="space-x-16px">
            {props.content?.icon && (
              <img
                class="my-auto h-20px w-20px fill-black"
                src={props.content?.icon}
              />
            )}
            <span class="my-auto">{props.content?.title}</span>
          </div>
          <div flex="~" class="space-x-10px">
            <span text="12px #999999" class="my-auto">
              {isRef(props.content?.label)
                ? props.content?.label.value
                : props.content?.label}
            </span>
            {props.content?.click && <img src={JoinSvg} class="my-auto" />}
          </div>
        </div>
      </>
    )
  },
})
const Card = defineComponent({
  props: {
    roundedp: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    contentGroup: {
      type: Array as PropType<Array<CardContent>>,
    },
  },
  setup(props) {
    return () => (
      <>
        <div
          p="l-16px"
          bg="white"
          text="16px #333333"
          class={props.roundedp && "rounded-12px"}>
          {props.contentGroup?.map((it, i) => {
            return (
              <>
                <CardItem content={it} />
                {i + 1 !== props.contentGroup?.length && (
                  <div class="h-1px" bg="#EBECED" />
                )}
              </>
            )
          })}
        </div>
      </>
    )
  },
})

export default Card
