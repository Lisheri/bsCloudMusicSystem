import {
  Input,
  Dialog,
  Button,
  Loading,
  Carousel,
  CarouselItem,
  Table,
  TableColumn,
  Popover,
  Pagination,
  InputNumber,
  Collapse,
  CollapseItem,
  Checkbox,
  Form,
  FormItem,
  Notification,
  Message,
} from "element-ui"

import Notifications from "vue-notification"

import VueLazyload from "vue-lazyload"
import Meta from 'vue-meta'
import * as utils from "./index"
import { EMPTY_IMG } from "./dom"

export default {
  install(Vue) {
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })

    Vue.prototype.$ELEMENT = { size: "small" }
    Vue.prototype.$utils = utils

    Vue.use(Input)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Pagination)
    Vue.use(Loading)
    Vue.use(Dialog)
    Vue.use(Button)
    Vue.use(InputNumber)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Checkbox)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Notification)
    // Vue.use(Notifications)
    Vue.prototype.$message = Message
    Vue.prototype.$notify = Notification

    Vue.use(Meta)

    Vue.use(VueLazyload, {
      loading: EMPTY_IMG,
      error: EMPTY_IMG,
    })
  },
}
