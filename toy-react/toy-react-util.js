// 声明私有方法标识
export const RENDER_TO_DOM = Symbol('render to dom')

/**
 * 替换node
 * @param {*} range
 * @param {*} node
 */
export const replaceContent = (range, node) => {
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()

  range.setStartBefore(node)
  range.setEndAfter(node)
}

/**
 * 获取range
 * @param {*} startNode
 * @param {*} startOffset
 * @param {*} endNode
 * @param {*} endOffset
 * @param {*} deleteContents
 */
export const getRange = (
  startNode,
  startOffset,
  endNode,
  endOffset,
  deleteContents = false
) => {
  const range = document.createRange()
  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)
  if (deleteContents) range.deleteContents()
  return range
}

/**
 * 判断node是否相同
 * @param {*} oldNode
 * @param {*} newNode
 */
export const isSameNode = (oldNode, newNode) => {
  // 判断dom类型
  if (oldNode.type !== newNode.type) return false

  // 判断dom属性
  for (let name in newNode.props) {
    if (newNode.props[name] !== oldNode.props[name]) return false
  }
  if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length)
    return false

  // 文字内容
  if (newNode.type == '#text') {
    if (newNode.content !== oldNode.content) return false
  }

  return true
}

/**
 * _vdom对比
 * @param {*} oldNode 旧的vdom
 * @param {*} newNode 新的vdom
 */
export const diff = (oldNode, newNode) => {
  if (!isSameNode(oldNode, newNode))
    return newNode[RENDER_TO_DOM](oldNode._range)

  newNode._range = oldNode._range
  const newChildren = newNode.vchildren
  const oldChildren = oldNode.vchildren

  if (!newChildren || !newChildren.length) return

  // 结点边缘位置
  let tailRange = oldChildren[oldChildren.length - 1]._range

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i]
    const oldChild = oldChildren[i]

    if (i < oldChildren.length) {
      diff(oldChild, newChild)
    } else {
      const range = getRange(
        tailRange.endContainer,
        tailRange.endOffset,
        tailRange.endContainer,
        tailRange.endOffset
      )
      // 追加newChild后修改tailRange
      newChild[RENDER_TO_DOM](range)
      tailRange = range
    }
  }
}

/**
 * 新旧状态对比替换
 * @param {*} oldState
 * @param {*} newState
 */
export const merge = (oldState, newState) => {
  for (let p in newState) {
    if (oldState[p] === null || typeof oldState[p] !== 'object') {
      oldState[p] = newState[p]
    } else {
      merge(oldState[p], newState[p])
    }
  }
}
