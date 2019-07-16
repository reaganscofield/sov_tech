import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_CATEGORY_BEGIN,
  HOME_CATEGORY_SUCCESS,
  HOME_CATEGORY_FAILURE,
  HOME_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  category,
  dismissCategoryError,
  reducer,
} from '../../../../src/features/home/redux/category';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/category', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when category succeeds', () => {
    const store = mockStore({});

    return store.dispatch(category())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when category fails', () => {
    const store = mockStore({});

    return store.dispatch(category({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCategoryError', () => {
    const expectedAction = {
      type: HOME_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissCategoryError()).toEqual(expectedAction);
  });

  it('handles action type HOME_CATEGORY_BEGIN correctly', () => {
    const prevState = { categoryPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoryPending).toBe(true);
  });

  it('handles action type HOME_CATEGORY_SUCCESS correctly', () => {
    const prevState = { categoryPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoryPending).toBe(false);
  });

  it('handles action type HOME_CATEGORY_FAILURE correctly', () => {
    const prevState = { categoryPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoryPending).toBe(false);
    expect(state.categoryError).toEqual(expect.anything());
  });

  it('handles action type HOME_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { categoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.categoryError).toBe(null);
  });
});

