import React, { PropTypes } from 'react'
import { Entity } from 'draft-js'

const HtmlViewer = (props) => {
  const content = Entity.get(props.block.getEntityAt(0)).getData().content
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )
}

HtmlViewer.propTypes = {
  block: PropTypes.object
}

export default HtmlViewer
