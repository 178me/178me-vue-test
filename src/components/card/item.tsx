import { defineComponent, PropType, renderSlot } from "vue"
import { isRef } from "vue"
import type { Ref } from "vue"
import JoinSvg from "~/assets/设置路径.svg"

export interface CardContent {
  icon: string
  title: string
  label: Ref<string>
  click: () => void
}
const Item = defineComponent({
  props: {
    content: Object as PropType<CardContent>,
  },
  setup(props, { attrs, slots }) {
    // item左边默认元素
    const itemLeft = () => (
      <>
        {props.content?.icon && (
          <img
            class="my-auto h-16px w-16px fill-black "
            src={props.content?.icon}
          />
        )}
        <span class="my-auto">{props.content?.title}</span>
      </>
    )
    // item右边默认元素
    const itemRight = () => (
      <span text="12px #999999" class="my-auto truncate max-w-32">
        {/* 兼容string类型  */}
        {isRef(props.content?.label)
          ? props.content?.label?.value
          : props.content?.label}
      </span>
    )
    return () => (
      <div b="b-1px #EBECED" p="y-16px r-16px" last="border-b-none">
        <div flex="~ row" justify="between" items="center">
          <div flex="~ row grow" class="space-x-16px">
            {slots["left"] ? renderSlot(slots, "left") : itemLeft()}
          </div>
          <div flex="~" class="space-x-10px">
            {slots["right"] ? renderSlot(slots, "right") : itemRight()}
            {attrs["onClick"] && <img src={JoinSvg} class="my-auto" />}
          </div>
        </div>
      </div>
    )
  },
})

export default Item
