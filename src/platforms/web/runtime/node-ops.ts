import { namespaceMap } from '@/platforms/web/util/element'
import VNode from '@/core/vdom/vnode'

/**
 * 返回标签名
 * @param node 
 * @returns 
 */
export function tagName(node: Element): string {
  return node.tagName
}

/**
 * 返回节点的父节点
 * @param node 
 * @returns 
 */
export function parentNode(node: Node): ParentNode | null {
  return node.parentNode
}

/**
 * 返回其父节点的 childNodes 列表中紧跟在其后面的节点
 * @param node 
 * @returns 
 */
export function nextSibling(node: Node): ChildNode | null {
  return node.nextSibling
}

/**
 * 创建一个具有指定命名空间URL和限定名称的元素
 * @param namespace 
 * @param tagName 
 * @returns 
 */
export function createElementNS(namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

/**
 * 创建一个由标签名称 tagName 指定的 HTML 元素
 * @param tagName 
 * @param vnode 
 * @returns 
 */
export function createElement(tagName: string, vnode: VNode) {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (
    vnode.data &&
    vnode.data.attrs &&
    vnode.data.attrs.multiple !== undefined
  ) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

/**
 * 
 * @param node 
 * @param scopeId 
 */
export function setStyleScope(node: Element, scopeId: string) {
  node.setAttribute(scopeId, '')
}

/**
 * 创建一个新的文本节点。这个方法可以用来转义 HTML 字符
 * @param text 
 * @returns 
 */
export function createTextNode(text: string): Text {
  return document.createTextNode(text)
}

/**
 * 创建并返回一个注释节点
 * @param text 
 * @returns 
 */
export function createComment(text: string): Comment {
  return document.createComment(text)
}

/**
 * 在参考节点之前插入一个拥有指定父节点的子节点
 * @param parentNode 
 * @param newNode 
 * @param referenceNode 
 */
export function insertBefore(
  parentNode: Node,
  newNode: Node,
  referenceNode: Node
) {
  parentNode.insertBefore(newNode, referenceNode)
}

/**
 * 从 DOM 中删除一个子节点
 * @param node 
 * @param child 
 */
export function removeChild(node: Node, child: Node) {
  node.removeChild(child)
}

/**
 * 将一个节点附加到指定父节点的子节点列表的末尾处
 * @param node 
 * @param child 
 */
export function appendChild(node: Node, child: Node) {
  node.appendChild(child)
}

/**
 * 替换一个节点及其后代的文本内容。
 * @param node 
 * @param text 
 */
export function setTextContent(node: Node, text: string) {
  node.textContent = text
}

