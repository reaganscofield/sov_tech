import {
  HOME_CATEGORY_BEGIN,
  HOME_CATEGORY_SUCCESS,
  HOME_CATEGORY_FAILURE,
  HOME_CATEGORY_DISMISS_ERROR,
} from './constants';
import axios from 'axios';

export function category(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: HOME_CATEGORY_BEGIN,
    });


    const promise = new Promise((resolve, reject) => {

      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_CATEGORY_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_CATEGORY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissCategoryError() {
  return {
    type: HOME_CATEGORY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CATEGORY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        categoryPending: true,
        categoryError: null,
      };

    case HOME_CATEGORY_SUCCESS:
      // The request is success
      return {
        ...state,
        categoryPending: false,
        categoryError: null,
      };

    case HOME_CATEGORY_FAILURE:
      // The request is failed
      return {
        ...state,
        categoryPending: false,
        categoryError: action.data.error,
      };

    case HOME_CATEGORY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        categoryError: null,
      };

    default:
      return state;
  }
}
