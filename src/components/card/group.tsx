import { defineComponent, PropType, renderSlot } from "vue"

const Card = defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () => (
      <>
        {/*
        @last-not-first: 为最后一个 group 组件添加样式
        */}
        <div
          last-not-first="pt-10px"
          p={props.title ? undefined : "t-10px"}
          {...attrs}>
          {"title" in slots
            ? renderSlot(slots, "title")
            : props.title && (
                <div p="x-16px y-12px" text="14px #999999">
                  <span>{props.title}</span>
                </div>
              )}
          <div bg="white" p="l-16px" text="16px #333333" >
            <div text="16px #333333">{renderSlot(slots, "default")}</div>
          </div>
        </div>
      </>
    )
  },
})

export default Card
