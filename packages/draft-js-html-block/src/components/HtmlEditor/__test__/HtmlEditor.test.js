import React from 'react'
import { Entity, convertFromRaw } from 'draft-js'
import { mount } from 'enzyme'
import HtmlEditor from '../HtmlEditor'
import sinon from 'sinon'
import { expect } from 'chai'

const rawContent = require('./rawContent.json')
const originalHtml = '<div>Hello World</div>'

const blockProps = {
  startEdit: sinon.spy(),
  finishEdit: sinon.spy(),
}

describe('HtmlEditor Component', () => {
  let block

  beforeEach(() => {
    const contentState = convertFromRaw(rawContent)
    block = contentState.getBlockMap().get('5cree')
  })

  it('render correctly', () => {
    const wrapper = mount(<HtmlEditor block={block} blockProps={blockProps} />)

    // Have display html
    const html = wrapper.find('#html')
    expect(html).to.have.prop('onClick')
    expect(html).to.have.prop('dangerouslySetInnerHTML')

    // Have not display editor
    expect(wrapper.find('#editor')).to.have.length(0)
  })

  it('edit - save (valid)', () => {
    const newHtml = '<div>New Text</div>'

    const wrapper = mount(<HtmlEditor block={block} blockProps={blockProps} />)

    // Click on html text
    wrapper.find('#html').simulate('click')
    expect(wrapper.find('#editor')).to.have.length(1)

    // Simulate set html
    wrapper.setState({ html: newHtml })

    // Simulate click save button
    wrapper.find('#save').simulate('click')
    expect(wrapper.find('#editor')).to.have.length(0)

    // Assert that html is changed
    const data = Entity.get(block.getEntityAt(0)).getData()
    expect(data.html).to.equal(newHtml)

    wrapper.unmount()
  })

  it('edit - save (invalid)', () => {
    // TODO Prevent save when html is not valid
  })

  it('edit - cancel', () => {
    const newHtml = '<div>New Text</div>'

    const wrapper = mount(<HtmlEditor block={block} blockProps={blockProps} />)

    // Click on html text
    wrapper.find('#html').simulate('click')
    expect(wrapper.find('#editor')).to.have.length(1)

    // Simulate set html
    wrapper.setState({ html: newHtml })

    // Simulate click cancel button
    wrapper.find('#cancel').simulate('click')
    expect(wrapper.find('#editor')).to.have.length(0)

    // Assert that html is changed
    const data = Entity.get(block.getEntityAt(0)).getData()
    expect(data.html).to.equal(originalHtml)

    wrapper.unmount()
  })
})
