import { defineComponent, renderSlot } from "vue"
import { useRouter } from "vue-router"
import BackSvg from "~/assets/上一步.svg"

const CommonIndex = defineComponent({
  props: {
    title: String,
    back: Function,
  },
  emits: ["click"],
  setup(props, { slots }) {
    const router = useRouter()
    return () => (
      <div class="h-full w-full" flex="~ col">
        <div
          id="header"
          flex="~ row"
          justify="between"
          position="sticky top-0"
          p="y-10px x-16px"
          bg="#FFFFFF"
          text="black">
          <div flex="~ 1">
            {"header-left" in slots ? (
              renderSlot(slots, "header-left")
            ) : (
              <img
                onClick={() => {
                  props.back ? props.back() : router.back()
                }}
                class="w-10px h-20px my-auto"
                src={BackSvg}
              />
            )}
          </div>
          <div flex="~ grow" text="18px">
            <span class="my-auto mx-auto">{props.title}</span>
          </div>
          <div flex="~ 1 row-reverse">{renderSlot(slots, "header-right")}</div>
        </div>
        <div id="body" flex="~ col grow" bg="#F7F8F9">
          {renderSlot(slots, "content")}
        </div>
        {"footer" in slots && (
          <div id="footer" flex="~ col" class="p-16px" bg="#F7F8F9">
            {" "}
            {renderSlot(slots, "footer")}
          </div>
        )}
      </div>
    )
  },
})

export default CommonIndex
