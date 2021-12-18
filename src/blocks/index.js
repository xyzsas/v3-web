import { defineAsyncComponent } from 'vue'
import loadingComponent from './Loading.vue'
import errorComponent from './Error.vue'

const blocks = {
  HTML: {
    name: '段落文本',
    icon: '/blocks/HTML.svg',
    block: () => import('./HTML.vue'),
    editable: () => import('./HTMLEditable.vue'),
    template: { html: '<h1>欢迎使用学生事务系统</h1><p>这是一个段落文本组件，可以用于显示文字等。</p><p>您可以直接修改该组件上的文字，内容会在<b>光标离开该组件时</b>更新和保存。</p><p>该组件支持HTML和Markdown语法。</p>' }
  }
}

for (const k in blocks) {
  const b = blocks[k]
  b.block = defineAsyncComponent({ loader: b.block, errorComponent, loadingComponent })
  if (b.panel) b.panel = defineAsyncComponent({ loader: b.panel, errorComponent, loadingComponent })
  if (b.editable) b.editable = defineAsyncComponent({ loader: b.editable, errorComponent, loadingComponent })
}

export default blocks
