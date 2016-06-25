import React, { Component, PropTypes } from 'react'
import { Entity, SelectionState, Modifier, EditorState } from 'draft-js'
// import { removeBlock } from 'draft-js-helpers'
import styles from './styles.css'

function removeBlock(editorState, blockKey) {
  const content = editorState.getCurrentContent()
  const block = content.getBlockForKey(blockKey)
  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength(),
  })

  const withoutBlock = Modifier.removeRange(content, targetRange, 'backward')
  const resetBlock = Modifier.setBlockType(
    withoutBlock,
    withoutBlock.getSelectionAfter(),
    'unstyled'
  )

  const newState = EditorState.push(editorState, resetBlock, 'remove-range')
  return EditorState.forceSelection(newState, resetBlock.getSelectionAfter())
}

export default class HtmlEditor extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    blockProps: PropTypes.object,
  };

  state = {
    content: '',
    isEdit: false,
    isHover: false,
  };

  getValue = () => {
    const content = Entity.get(this.props.block.getEntityAt(0)).getData().content
    return content
  };

  startEdit = () => {
    this.props.blockProps.startEdit(this.props.block.getKey())
  };

  finishEdit = () => {
    this.props.blockProps.finishEdit(this.props.block.getKey())
  };

  handleMouseOver = (e) => {
    e.preventDefault()
    if (!this.state.isEdit) {
      this.setState({ isHover: true })
    }
  };

  handleMouseLeave = (e) => {
    e.preventDefault()
    this.setState({ isHover: false })
  };

  handleEdit = (e) => {
    e.preventDefault()
    this.setState({ isEdit: true, isHover: false, content: this.getValue() }, () => {
      this.startEdit()
      this.refs.editor.focus()
    })
  };

  handleCancel = (e) => {
    e.preventDefault()
    this.setState({ isEdit: false }, () => this.finishEdit())
  };

  handleHtmlChange = (e) => {
    this.setState({ content: e.target.value })
  };

  handleSave = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { content: this.state.content })
    this.setState({
      invalidHtml: false,
      isEdit: false,
      content: null,
    }, this.finishEdit)
  };

  handleRemove = () => {
    const { editorState, onChange } = this.props.blockProps
    const newState = removeBlock(editorState, this.props.block.getKey())
    onChange(newState)
  };

  render() {
    let content = null
    if (this.state.isEdit) {
      if (this.state.invalidHtml) {
        content = ''
      } else {
        content = this.state.content
      }
    } else {
      content = this.getValue()
    }

    let editor
    if (this.state.isEdit) {
      editor = (<div id="editor" className={styles.editorWrapper}>
        <textarea ref="editor" rows={5} value={this.state.content} onChange={this.handleHtmlChange} />
        <div className={styles.editorToolbar}>
          <button id="save" onClick={this.handleSave}>Save</button>
          <button id="cancel" onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>)
    }

    const overlay = this.state.isHover
      ? (
      <div className={styles.overlay}>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    )
      : (
      <div>
        <div className={styles.overlay}>
          <span>Html Block</span>
        </div>
      </div>
    )

    return (
      <div
        className={styles.root}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {!this.state.isEdit && overlay}
        {editor}
      </div>
    )
  }
}
