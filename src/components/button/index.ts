import { App } from 'vue'
import LzcBtn from './lzc-btn'

LzcBtn.name = 'lzc-btn'

LzcBtn.install = (app: App) => {
  app.component(LzcBtn.name, LzcBtn)
}

export default LzcBtn

