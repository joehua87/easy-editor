import React from 'react'
import { EditorState, convertFromRaw } from 'draft-js'
import HtmlEditor, { __RewireAPI__ as RewireApi } from 'draft-js-html-block/lib/components/HtmlEditor'
import { storiesOf, action } from '@kadira/storybook'
import 'draft-js-html-block/lib/styles.css'

if (RewireApi) {
  RewireApi.__set__('removeBlock', action('remove block'))
}

const rawContent = require('./rawContent.json')
const contentState = convertFromRaw(rawContent)

// Pass props into component

const block = contentState.getBlockMap().get('5cree')
const blockProps = {
  startEdit: action('start edit'),
  finishEdit: action('finish edit'),
  editorState: EditorState.createWithContent(contentState),
  onChange: action('editorState changed'),
}

storiesOf('Html Editor', module)
  .add('Normal', () => <HtmlEditor block={block} blockProps={blockProps} />)
