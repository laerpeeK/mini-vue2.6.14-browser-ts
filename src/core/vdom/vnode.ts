export default class VNode {
  text?: string
  isComment: boolean

  constructor() {
    this.isComment = false
  }
}

export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}