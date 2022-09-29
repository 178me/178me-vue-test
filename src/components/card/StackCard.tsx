import { defineComponent, PropType, renderSlot } from "vue"
export interface StackCardItemProp {
  label: String
  tips: String
}
const StackCard = defineComponent({
  props: {
    item: Object as PropType<StackCardItemProp>,
  },
  setup(props, { slots }) {
    return () => (
      <>
        <div flex="~ col">
          <div
            id="tips"
            bg="#F7F8F9"
            text="14px #999999"
            class={(props.item.tips ? "p-16px" : "h-10px") + " w-full"}>
            <span>{props.item.tips}</span>
          </div>
          <div
            flex="~ row"
            p="y-16px x-14px"
            text="16px #333333"
            font="medium"
            bg="white"
            class={(props.item.label && "justify-between items-center") + " w-full"}>
            <span id="label">{props.item.label}</span>
            <div id="content" flex="~" items-center>{renderSlot(slots, "content")}</div>
          </div>
        </div>
      </>
    )
  },
})

export default StackCard
