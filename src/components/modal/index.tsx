import { defineComponent, Teleport, Transition, renderSlot } from "vue"

const modal = defineComponent({
  props: {
    w: {
      type: String,
    },
    h: {
      type: String,
    },
    show: Boolean,
  },
  emits: [],
  setup(props, { slots }) {
    return () => (
      <Teleport to="#modal">
        <Transition
          enter-active-class="animate-fade-in animate-duration-300ms"
          leave-active-class="animate-fade-out animate-duration-300ms">
          <div
            v-show={props.show}
            class="fixed h-screen w-screen"
            flex="~"
            bg="black/30">
            <div
              class="rounded-10px"
              bg="white"
              m="x-auto y-auto"
              h={props.h}
              w={props.w}>
              {renderSlot(slots, "content")}
            </div>
          </div>
        </Transition>
      </Teleport>
    )
  },
})

export default modal
