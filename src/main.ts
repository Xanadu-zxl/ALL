import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/basis.scss'
import countTo from 'vue3-count-to'
import { Icon, Popup, Picker, Tab, Tabs, Pagination } from 'vant'
import * as echarts from 'echarts/core'

import {
    BarChart,
    PieChart,
    LineChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent,
    GridComponent
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'
echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, DataZoomComponent, GridComponent, BarChart, PieChart, LineChart, CanvasRenderer]
)

createApp(App).use(countTo).use(Pagination).use(store).use(router).use(Icon).use(Tab).use(Tabs).use(Popup).use(Picker).mount('#app')
