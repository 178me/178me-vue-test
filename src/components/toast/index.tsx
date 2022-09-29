import { defineComponent, createVNode, render, Component } from "vue"
const toast = defineComponent({
  props: {
    title: String,
    icon: String,
    duration: Number,
  },
  setup(props) {
    const icon = () => {
      return (
        props.icon && (
          <img
            src={props.icon}
            class="w-35px h-35px mx-auto rounded-full animate-spin"
            animate="spin"
          />
        )
      )
    }
    return () => {
      return (
        <>
          <div class="fixed w-full h-full z-50 pointer-events-none" flex="~">
            <div class="mx-auto my-auto">
              <div
                flex="~ col"
                class="space-y-4px rounded-8px pointer-events-auto"
                p="20px"
                bg="black/80">
                {icon()}
                <span text="16px white mx-auto">{props.title}</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  },
})
export interface ToastProps {
  title: string
  icon: string
  duration: number
}
export interface ToastReturn {
  destory: () => void
  show: () => void
}

class Toast {
  options: ToastProps
  container: HTMLElement
  toast: Component
  animateDuration: number
  displaying: boolean
  constructor(options: ToastProps) {
    this.options = options
    this.container = document.createElement("div")
    this.toast = toast
    this.animateDuration = 300
    this.displaying = false
  }
  show() {
    const vm = createVNode(toast, this.options)
    render(vm, this.container)
    // 添加淡入动画和动画时间
    this.container.classList.add("animate-fade-in")
    this.container.classList.add(`animate-duration-${this.animateDuration}ms`)

    document.body.insertBefore(this.container, document.body.firstChild)
    this.displaying = true
    // 根据 duration 自动删除 toast
    setTimeout(() => {
      this.destory()
    }, this.options.duration)
  }

  destory() {
    // 判断是否显示中 防止无效移除
    if (this.displaying) {
      // 移除节点前的操作
      // 替换为淡出动画
      this.container.classList.replace("animate-fade-in", "animate-fade-out")
      // 动画完成之后移除元素
      setTimeout(() => {
        document.body.removeChild(this.container)
        this.displaying = false
      }, this.animateDuration - 10)
    }
  }
}

export default Toast
