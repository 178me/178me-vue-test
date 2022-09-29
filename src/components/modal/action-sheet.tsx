import {
  defineComponent,
  createVNode,
  Transition,
  render,
  Component,
  PropType,
  h,
  ref,
  onMounted,
} from "vue"
export interface Action {
  icon: string
  title: string
  classStyle: string
  handler: () => void
  component: {
    type: Component
    required: false
  }
}

export interface ActionSheetOptions {
  actionGroup: Array<Action>
}

const actionSheet = defineComponent({
  props: {
    options: Object as PropType<ActionSheetOptions>,
    destory: Function,
  },
  emits: [],
  setup(props) {
    const animateDuration = 300
    const enterClass = () =>
      `animate-fade-in-up animate-duration-${animateDuration}ms`
    const leaveClass = () =>
      `animate-fade-out-down animate-duration-${animateDuration}ms`
    const show = ref(false)
    // 关闭 actionSheet
    function closeActionSheet() {
      show.value = false
      setTimeout(() => {
        props.destory && props.destory()
      }, animateDuration)
    }
    const renderAction = (action: Action) => {
      if (action.component) {
        /* TODO: 如果action有component，那么直接渲染这个组件 */
        return h(action.component)
      } else {
        return (
          <div
            onClick={async () => {
              action.handler && (await action.handler())
              closeActionSheet()
            }}
            /* 第一个选项有一个分隔线 */
            first="mx-16px b-b-1px b-#EBECED"
            last="bg-#F7F8F9"
            class={
              action.classStyle
                ? action.classStyle
                : "flex justify-center items-center text-#333333 text-18px bg-white py-18px"
            }>
            {action.title}
          </div>
        )
      }
    }
    onMounted(() => {
      show.value = true
    })
    return () => {
      return (
        <>
          <div flex="~ col" class="fixed w-full h-full z-50" bg="black/30">
            {/* 占位 */}
            <div
              class="grow"
              onClick={() => {
                closeActionSheet()
              }}></div>
            {/* 真正Action内容 由最外层的div来控制actionSheet整体样式 */}
            <Transition
              enter-active-class={enterClass()}
              leave-active-class={leaveClass()}>
              <div
                v-show={show.value}
                id="actionContent"
                flex="~ col"
                class="bg-white rounded-tl-16px rounded-tr-16px">
                {props.options?.actionGroup.map((action) => {
                  return renderAction(action)
                })}
              </div>
            </Transition>
          </div>
        </>
      )
    }
  },
})

export interface Action {
  icon: string
  title: string
  classStyle: string
  handler: () => void
  component: {
    type: Component
    required: false
  }
}

class ActionSheet {
  options: ActionSheetOptions
  container: HTMLElement
  actionSheet: Component
  constructor(options: ActionSheetOptions) {
    this.options = options
    this.container = document.createElement("div")
    this.actionSheet = actionSheet
  }

  show() {
    const vm = createVNode(this.actionSheet, {
      options: this.options,
      destory: () => this.destory(),
    })
    render(vm, this.container)
    document.body.insertBefore(this.container, document.body.firstChild)
  }

  destory() {
    document.body.removeChild(this.container)
  }
}

export default ActionSheet
