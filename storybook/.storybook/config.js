import { configure } from '@kadira/storybook';
// import { loadStories } from 'draft-js-html-block/lib/stories'
import loadStories from '../stories'

configure(loadStories, module);
