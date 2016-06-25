import { configure } from '@kadira/storybook';
// import 'todomvc-app-css/index.css'

function loadStories() {
  require('../src/containers/stories');
}

configure(loadStories, module);
