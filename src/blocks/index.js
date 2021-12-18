import { defineAsyncComponent } from 'vue'
import loadingComponent from './Loading.vue'
import errorComponent from './Error.vue'

const blocks = {
  markdown: {
    name: 'Markdown',
    block: () => import('./Markdown.vue'),
    template: { md: '### 欢迎使用学生事务系统 \n\n 这是一个Markdown组件，可以用于显示段落文字等' }
  }
}

for (const k in blocks) {
  const b = blocks[k]
  b.block = defineAsyncComponent({ loader: b.block, errorComponent, loadingComponent })
  if (b.panel) b.panel = defineAsyncComponent({ loader: b.panel, errorComponent, loadingComponent })
}

export default blocks
