import { App } from "vue"
import LzcBtn from "./button"
import Btn from "./button/lzc-btn"
import "@unocss/reset/tailwind.css"
import "uno.css"
//按需引入
const components = [LzcBtn]

//全局引入
const install = (app: App) => {
  components.map((item) => {
    app.component(item.name, item)
  })
}

export default {
  install,
  Btn,
}
