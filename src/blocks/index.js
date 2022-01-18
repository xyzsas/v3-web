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
  },
  input: {
    name: '输入框',
    icon: '/blocks/input.svg',
    block: () => import('./Input.vue'),
    panel: () => import('./InputPanel.vue'),
    template: { title: '输入框标题', placeholder: '提示文本', optional: false},
    data: (v, d) => d
  },
  select: {
    name: '下拉框',
    icon: '/blocks/select.svg',
    block: () => import('./Select.vue'),
    panel: () => import('./SelectPanel.vue'),
    template: { title: '下拉框标题', options: [{ '#': 1, ':': '选项1' }, { '#': 2, ':': '选项2' }] },
    data: (v, d) => { for (const o of v.options) if (o['#'] == d) return o[':'] }
  }
}

for (const k in blocks) {
  const b = blocks[k]
  b.block = defineAsyncComponent({ loader: b.block, errorComponent, loadingComponent })
  if (b.panel) b.panel = defineAsyncComponent({ loader: b.panel, errorComponent, loadingComponent })
  if (b.editable) b.editable = defineAsyncComponent({ loader: b.editable, errorComponent, loadingComponent })
}

export default blocks
