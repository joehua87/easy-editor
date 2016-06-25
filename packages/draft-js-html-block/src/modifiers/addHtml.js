import { Entity, AtomicBlockUtils } from 'draft-js'

export default function addImage(editorState, content) {
  const entityKey = Entity.create('html', 'IMMUTABLE', { content })
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  )
}
