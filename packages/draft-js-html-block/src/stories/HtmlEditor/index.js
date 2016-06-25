import React from 'react'
import HtmlEditor from '../components/HtmlEditor'
import { storiesOf } from '@kadira/storybook'

// Pass props into component

storiesOf('Table Editor', module)
  .add('Normal', () => <HtmlEditor />)
