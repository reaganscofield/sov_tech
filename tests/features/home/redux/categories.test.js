import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_CATEGORIES_BEGIN,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE,
  HOME_CATEGORIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  categories,
  dismissCategoriesError,
  reducer,
} from '../../../../src/features/home/redux/categories';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/categories', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when categories succeeds', () => {
    const store = mockStore({});

    return store.dispatch(categories())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CATEGORIES_SUCCESS);
      });
  });

  it('dispatches failure action when categories fails', () => {
    const store = mockStore({});

    return store.dispatch(categories({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CATEGORIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCategoriesError', () => {
    const expectedAction = {
      type: HOME_CATEGORIES_DISMISS_ERROR,
    };
    expect(dismissCategoriesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_CATEGORIES_BEGIN correctly', () => {
    const prevState = { categoriesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoriesPending).toBe(true);
  });

  it('handles action type HOME_CATEGORIES_SUCCESS correctly', () => {
    const prevState = { categoriesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoriesPending).toBe(false);
  });

  it('handles action type HOME_CATEGORIES_FAILURE correctly', () => {
    const prevState = { categoriesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoriesPending).toBe(false);
    expect(state.categoriesError).toEqual(expect.anything());
  });

  it('handles action type HOME_CATEGORIES_DISMISS_ERROR correctly', () => {
    const prevState = { categoriesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoriesError).toBe(null);
  });
});

