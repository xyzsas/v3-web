import { defineAsyncComponent } from 'vue'
import loadingComponent from './Loading.vue'
import errorComponent from './Error.vue'

const blocks = {
  markdown: () => import('./Markdown.vue')
}

const _blocks = {}
for (const b in blocks) _blocks[b] = defineAsyncComponent({ loader: blocks[b], errorComponent, loadingComponent })

export default _blocks
