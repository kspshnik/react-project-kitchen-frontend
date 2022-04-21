import article from './reducers/article.ts';
import articleList from './reducers/articleList.ts';
import auth from './reducers/auth.ts';
import { combineReducers } from 'redux';
import common from './reducers/common.ts';
import editor from './reducers/editor.ts';
import home from './reducers/home.ts';
import profile from './reducers/profile.ts';
import settings from './reducers/settings.ts';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  articleList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer
});
