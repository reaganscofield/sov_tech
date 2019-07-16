import initialState from './initialState';
import { reducer as categoriesReducer } from './categories';
import { reducer as categoryReducer } from './category';

const reducers = [
  categoriesReducer,
  categoryReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
